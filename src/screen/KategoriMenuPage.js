/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import TambahIcon from '../assets/svg/TambahIcon.svg';
import ArrowIcon from '../assets/svg/ArrowIcon.svg';
import DoneIcon from '../assets/svg/DoneIcon.svg';
import DeleteIcon from '../assets/svg/DeleteIcon.svg';
import SettingIcon from '../assets/svg/SettingIcon.svg';
import Toast from 'react-native-toast-message';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from '@react-navigation/native';

const KategoriMenuPage = () => {
  const navigation = useNavigation();
  const [kategori, setKategori] = useState([]);
  const [kategoriBaru, setKategoriBaru] = useState('');
  const [editKategori, setEditKategori] = useState('');
  const [tambah, setTambah] = useState('');
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef(null);
  const bottomSheetEditRef = useRef(null);
  useEffect(() => {
    if (update) {
      setUpdate(false);
    } else {
      axios
        .get('https://server-koce.herokuapp.com/kategori/')
        .then(res => {
          setKategori(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.log({err});
        });
    }
  }, [update]);

  // swipe component for delete
  const renderRightActions = (progress, dragX, props) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0.6, 0, 0, 1],
    });
    return (
      <View style={{flexDirection: 'row'}}>
        <Animated.View
          style={{
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{scale: trans}],
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setEditKategori(props);
              bottomSheetEditRef.current.expand();
            }}>
            <SettingIcon width={14} height={14} fill={'black'} />
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View
          style={{
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{scale: trans}],
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert(
                `Delete Kategori ${props}`,
                'Apakah anda yakin akan menghapus Kategori ini dan seluruh data di dalamnya ?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      if (kategori.length !== 0) {
                        axios
                          .delete(
                            'https://server-koce.herokuapp.com/kategori/delete',
                            {
                              params: {
                                kategori: props,
                              },
                            },
                          )
                          .then(() => {
                            setUpdate(true);
                            Toast.show({
                              type: 'sukses',
                              text1: 'Berhasil Menghapus Kategori',
                              visibilityTime: 2000,
                            });
                          })
                          .catch(() => {
                            Toast.show({
                              type: 'gagal',
                              text1: 'Gagal Menghapus Kategori',
                              visibilityTime: 2000,
                            });
                          });
                      }
                    },
                  },
                ],
              );
            }}>
            <DeleteIcon width={14} height={14} fill={'black'} />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  };
  // flatlist render componenets
  const renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item.NamaKategori)
        }>
        <TouchableWithoutFeedback
          style={styles.componentContainer}
          onPress={() => {
            navigation.navigate('Produk', {kategori: item.NamaKategori});
          }}>
          <Text style={{fontFamily: 'Inter-Regular', fontSize: 16}}>
            {item.NamaKategori}
          </Text>
          <ArrowIcon width={14} height={14} fill={'black'} />
        </TouchableWithoutFeedback>
      </Swipeable>
    );
  };

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

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'top']}>
      <View style={styles.header}>
        <Text style={styles.texHeaderStyle}>Kategori Menu</Text>
        <View style={styles.iconPlusStyle}>
          <TouchableWithoutFeedback
            onPress={() => {
              bottomSheetRef.current.expand();
            }}>
            <TambahIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {
        // jika loading maka akan menampilkan ActivityIndicator
        loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={'#FFA901'} />
          </View>
        ) : kategori.length === 0 ? (
          // jika kategori kosong maka akan menampilkan text Kosong
          // jika ada kategori maka menampilkan flatlist
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
              Kategori Kosong
            </Text>
          </View>
        ) : (
          <FlatList data={kategori} renderItem={renderItem} />
        )
      }
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
              if (tambah !== '') {
                axios
                  .post('https://server-koce.herokuapp.com/kategori/tambah', {
                    kategori: tambah,
                  })
                  .then(() => {
                    Toast.show({
                      type: 'sukses',
                      text1: 'Berhasil Menambah Kategori',
                      visibilityTime: 2000,
                    });
                    setTambah('');
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
        <TextInput
          value={tambah}
          style={styles.searchStyle}
          placeholder="Masukkan Nama Kategori"
          placeholderTextColor={'grey'}
          onChangeText={e => {
            setTambah(e);
          }}
        />
      </BottomSheet>
      {/* Bottom sheet untuk edit */}
      <BottomSheet
        ref={bottomSheetEditRef}
        index={-1}
        enablePanDownToClose
        snapPoints={['90%', '90%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.texHeaderStyle}>
            Edit Kategori {editKategori}
          </Text>
          <TouchableWithoutFeedback
            style={{marginRight: 10}}
            onPress={() => {
              if (kategoriBaru !== '') {
                axios
                  .put('https://server-koce.herokuapp.com/kategori/edit', {
                    kategori: editKategori,
                    kategoriBaru: kategoriBaru,
                  })
                  .then(() => {
                    Toast.show({
                      type: 'sukses',
                      text1: 'Berhasil Merubah Kategori',
                      visibilityTime: 2000,
                    });
                    setTambah('');
                    setUpdate(true);
                    bottomSheetEditRef.current.close();
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
        <TextInput
          value={kategoriBaru}
          style={styles.searchStyle}
          placeholder="Masukkan Nama Kategori"
          placeholderTextColor={'grey'}
          onChangeText={e => {
            setKategoriBaru(e);
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default KategoriMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  iconPlusStyle: {
    marginRight: 10,
  },
  searchStyle: {
    color: 'black',
    height: 40,
    marginHorizontal: 10,
    paddingLeft: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  headerBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
});
