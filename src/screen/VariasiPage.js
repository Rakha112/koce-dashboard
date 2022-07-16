/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import TambahIcon from '../assets/svg/TambahIcon.svg';
import BackIcon from '../assets/svg/BackIcon.svg';
import DoneIcon from '../assets/svg/DoneIcon.svg';
const VariasiPage = ({route}) => {
  const navigation = useNavigation();
  const {nama} = route.params;
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const [variasi, setVariasi] = useState([]);
  const [tambah, setTambah] = useState('');
  const [maksPilihan, setMaksPilihan] = useState('');

  const bottomSheetRef = useRef(null);
  useEffect(() => {
    if (update) {
      setUpdate(false);
    } else {
      axios
        .get('http://192.168.161.202:3001/variasi', {
          params: {
            produk: nama,
          },
        })
        .then(res => {
          console.log(res.data.data);
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
  const flatlistComponent = ({item, index}) => {
    return (
      <View>
        <TouchableWithoutFeedback
          style={styles.componentContainer}
          onPress={() => {
            navigation.navigate('Variasi', {nama: item.NamaProduk});
          }}>
          <Text style={{fontFamily: 'Inter-Regular', fontSize: 16}}>
            {item.NamaVariasi}, ( Maks. Pilihan {item.MaxPilihan} )
          </Text>
        </TouchableWithoutFeedback>
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={['90%', '90%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.texHeaderStyle}>Tambah Kategori Baru</Text>
          <TouchableWithoutFeedback
            style={{marginRight: 10}}
            onPress={() => {
              console.log('press');
              if (tambah !== '') {
                axios
                  .post('http://192.168.161.202:3001/variasi/tambah', {
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
    backgroundColor: 'white',
  },
});
