/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TambahIcon from '../assets/svg/TambahIcon.svg';
import BackIcon from '../assets/svg/BackIcon.svg';
import DoneIcon from '../assets/svg/DoneIcon.svg';
import DeleteIcon from '../assets/svg/DeleteIcon.svg';
import TambahPolosIcon from '../assets/svg/TambahPolosIcon.svg';
import Switch from '../components/Switch';
const VariasiPage = ({route}) => {
  const navigation = useNavigation();
  // State
  const {nama} = route.params;
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const [variasi, setVariasi] = useState([]);
  const [currentVariasi, setCurrentVariasi] = useState('');
  const [currentVariasiId, setCurrentVariasiId] = useState();
  const [tambah, setTambah] = useState('');
  const [opsi, setOpsi] = useState('');
  const [maksPilihan, setMaksPilihan] = useState('');
  const [tambahHarga, setTambahHarga] = useState();
  // ref
  const bottomSheetRef = useRef(null);
  const bottomSheetOpsiRef = useRef(null);
  useEffect(() => {
    if (update) {
      setUpdate(false);
    } else {
      axios
        .get('http://192.168.161.156:3001/variasi', {
          params: {
            produk: nama,
          },
        })
        .then(res => {
          setVariasi(res.data.data);
          setLoading(false);
        });
    }
  }, [nama, update]);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  // Swipe component pada Variasi
  const renderRightActions = (progress, dragX, variasi2, variasiId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0.6, 0, 0, 1],
    });
    return (
      <View style={{flexDirection: 'row'}}>
        {/* Tombol untuk tambah Opsi */}
        <Animated.View
          style={{
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{scale: trans}],
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setCurrentVariasi(variasi2);
              setCurrentVariasiId(variasiId);
              bottomSheetOpsiRef.current.expand();
            }}>
            <TambahPolosIcon width={14} height={14} fill={'black'} />
          </TouchableWithoutFeedback>
        </Animated.View>
        {/* Tombol untuk Delete Opsi */}
        <Animated.View
          style={{
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{scale: trans}],
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (nama.length !== 0) {
                axios
                  .delete('http://192.168.161.156:3001/variasi/delete', {
                    params: {
                      variasi: variasi2,
                      produk: nama,
                    },
                  })
                  .then(() => {
                    setUpdate(true);
                    Toast.show({
                      type: 'sukses',
                      text1: 'Berhasil Menghapus Variasi',
                      visibilityTime: 2000,
                    });
                  })
                  .catch(() => {
                    Toast.show({
                      type: 'gagal',
                      text1: 'Gagal Menghapus Variasi',
                      visibilityTime: 2000,
                    });
                  });
              }
            }}>
            <DeleteIcon width={14} height={14} fill={'black'} />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  };
  // flatlist component
  const flatlistComponent = ({item, index}) => {
    // console.log(JSON.parse(item.OpsiVariasi));
    return (
      <View>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(
              progress,
              dragX,
              item.NamaVariasi,
              item.VariasiId,
            )
          }>
          <View style={styles.componentContainer}>
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 16}}>
              {item.NamaVariasi} ( Maks. Pilihan {item.MaxPilihan} )
            </Text>
          </View>
        </Swipeable>
        {JSON.parse(item.OpsiVariasi) !== null ? (
          // jika opsiVariasi ada maka akan merender componen ini
          JSON.parse(item.OpsiVariasi).map((v, i) => {
            const switchHandleAPI = () => {
              // jika statusnya on atau aktif atau 1
              if (v.Status === 1) {
                // update status menjadi 0 atau off
                setTimeout(() => {
                  axios
                    .put('http://192.168.161.156:3001/opsi/status', {
                      status: 0,
                      variasiId: item.VariasiId,
                      opsi: v.Opsi,
                    })
                    .then(res => {
                      // set update menjadi true untuk mengupdate data
                      setUpdate(true);
                      if (!update) {
                        Toast.show({
                          type: 'gagal',
                          text1: `${v.Opsi} OFF`,
                          visibilityTime: 2000,
                        });
                      }
                    });
                }, 2000);
                // jika statusnya off atau p
              } else if (v.Status === 0) {
                // update status menjadi on atau 1
                axios
                  .put('http://192.168.161.156:3001/opsi/status', {
                    status: 1,
                    variasiId: item.VariasiId,
                    opsi: v.Opsi,
                  })
                  .then(res => {
                    // set update menjadi true untuk mengupdate data
                    setUpdate(true);
                    // jika data sudah terupdate maka switch loading off
                    if (!update) {
                      Toast.show({
                        type: 'sukses',
                        text1: `${v.Opsi} ON`,
                        visibilityTime: 2000,
                      });
                    }
                  });
              }
            };
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  marginVertical: 1,
                  backgroundColor: 'white',
                }}
                key={i}>
                <View>
                  <Text style={{fontFamily: 'Inter-Regular', fontSize: 16}}>
                    {v.Opsi}
                  </Text>
                  <Text style={{fontFamily: 'Inter-Regular', fontSize: 12}}>
                    Tambah Harga Rp. {v.Harga}
                  </Text>
                </View>
                <Switch status={v.Status} switchHandleAPI={switchHandleAPI} />
              </View>
            );
          })
        ) : (
          // Jika OpsiVariasi Null tidak merender apa apa
          <></>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View style={{marginLeft: 5}}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon width={24} height={24} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.texHeaderStyle}>{nama}</Text>
        <View style={{marginRight: 10}}>
          <TouchableWithoutFeedback
            onPress={() => {
              bottomSheetRef.current.expand();
            }}>
            <TambahIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {loading ? (
        // jika loading maka akan menampilkan activityindicator atau loading
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#FFA901'} />
        </View>
      ) : variasi.length === 0 ? (
        // jika tidak loading maka akan menunjukka menu kosong jika menu.length = 0
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
            Variasi Kosong
          </Text>
        </View>
      ) : (
        // jika tidak loading maka akan menunjukka flatlist jika menu.length lebih dari 0
        <FlatList data={variasi} renderItem={flatlistComponent} />
      )}
      {/* BottomSheet untuk tambah Variasi */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={['90%', '90%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.texHeaderStyle}>Tambah Variasi Baru</Text>
          <TouchableWithoutFeedback
            style={{marginRight: 10}}
            onPress={() => {
              if (tambah !== '') {
                axios
                  .post('http://192.168.161.156:3001/variasi/tambah', {
                    variasi: tambah,
                    maks: maksPilihan,
                    produk: nama,
                  })
                  .then(() => {
                    Toast.show({
                      type: 'sukses',
                      text1: 'Berhasil Menambah Kategori',
                      visibilityTime: 2000,
                    });
                    setTambah('');
                    setMaksPilihan('');
                    setUpdate(true);
                    bottomSheetRef.current.close();
                  })
                  .catch(err => {
                    if (err.response.status === 409) {
                      Toast.show({
                        type: 'gagal',
                        text1: 'Kategori Sudah Ada',
                        visibilityTime: 2000,
                      });
                    }
                  });
              } else {
                Toast.show({
                  type: 'warning',
                  text1: 'Form tidak boleh kosong',
                  visibilityTime: 2000,
                });
              }
            }}>
            <DoneIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.textInputStyle}>Nama Variasi</Text>
          <TextInput
            value={tambah}
            style={styles.inputStyle}
            placeholder="Masukkan Nama Variasi"
            placeholderTextColor={'grey'}
            onChangeText={e => {
              setTambah(e);
            }}
          />
        </View>
        <View>
          <Text style={styles.textInputStyle}>Maksimal Pilihan</Text>
          <TextInput
            value={maksPilihan}
            style={styles.inputStyle}
            placeholder="Masukkan Maksimal Pilihan (angka)"
            placeholderTextColor={'grey'}
            keyboardType={'number-pad'}
            onChangeText={e => {
              setMaksPilihan(e);
            }}
          />
        </View>
      </BottomSheet>
      {/* BottomSheet untuk tambah opsi variasi */}
      <BottomSheet
        ref={bottomSheetOpsiRef}
        index={-1}
        enablePanDownToClose
        snapPoints={['90%', '90%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.texHeaderStyle}>
            Tambah Opsi {currentVariasi}
          </Text>
          <TouchableWithoutFeedback
            style={{marginRight: 10}}
            onPress={() => {
              if (opsi !== '' && tambahHarga !== '') {
                axios
                  .post('http://192.168.161.156:3001/opsi/tambah', {
                    opsi: opsi,
                    variasiId: currentVariasiId,
                    tambahHarga: tambahHarga,
                  })
                  .then(() => {
                    Toast.show({
                      type: 'sukses',
                      text1: 'Berhasil Menambah Opsi',
                      visibilityTime: 2000,
                    });
                    setOpsi('');
                    setTambahHarga();
                    setUpdate(true);
                    bottomSheetOpsiRef.current.close();
                  })
                  .catch(err => {
                    if (err.response.status === 409) {
                      Toast.show({
                        type: 'gagal',
                        text1: 'Opsi Sudah Ada',
                        visibilityTime: 2000,
                      });
                    }
                  });
              } else {
                Toast.show({
                  type: 'warning',
                  text1: 'Form tidak boleh kosong',
                  visibilityTime: 2000,
                });
              }
            }}>
            <DoneIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.textInputStyle}>Nama Opsi</Text>
          <TextInput
            value={opsi}
            style={styles.inputStyle}
            placeholder="Masukkan Nama Variasi"
            placeholderTextColor={'grey'}
            onChangeText={e => {
              setOpsi(e);
            }}
          />
        </View>
        <View>
          <Text style={styles.textInputStyle}>Tambahan Harga</Text>
          <TextInput
            value={tambahHarga}
            style={styles.inputStyle}
            placeholder="Masukkan Maksimal Pilihan (angka)"
            placeholderTextColor={'grey'}
            keyboardType={'number-pad'}
            onChangeText={e => {
              setTambahHarga(e);
            }}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default VariasiPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  texHeaderStyle: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  headerBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  inputStyle: {
    color: 'black',
    height: 40,
    marginHorizontal: 10,
    paddingLeft: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  textInputStyle: {
    marginLeft: 20,
    marginVertical: 10,
    fontFamily: 'Inter-SemiBold',
    color: 'black',
    fontSize: 16,
  },
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    backgroundColor: 'white',
  },
});
