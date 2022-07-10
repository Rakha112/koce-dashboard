/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, FlatList, View, TextInput} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import TambahIcon from '../assets/svg/TambahIcon.svg';
import ArrowIcon from '../assets/svg/ArrowIcon.svg';
import DoneIcon from '../assets/svg/DoneIcon.svg';
import Toast from 'react-native-toast-message';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
const MenuPage = () => {
  const [kategori, setKategori] = useState([]);
  const [tambah, setTambah] = useState('');
  const [berhasilTambah, setBerhasilTambah] = useState(false);
  const bottomSheetRef = useRef(null);
  useEffect(() => {
    if (berhasilTambah) {
      axios
        .get('http://localhost:3001/kategori/')
        .then(res => {
          if (res.data.data.length !== 0) {
            setKategori(res.data.data);
          }
        })
        .catch(err => {
          console.log({err});
        });
      setBerhasilTambah(false);
    }
  }, [berhasilTambah]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.componentContainer}
        onLongPress={() => {
          console.log('Long Press');
        }}>
        <Text style={{fontFamily: 'Inter-Regular', fontSize: 14}}>
          {item.NamaKategori}
        </Text>
        <ArrowIcon width={14} height={14} fill={'black'} />
      </TouchableOpacity>
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

  if (kategori.length === 0) {
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Inter-Bold'}}>Kategori Kosong</Text>
        </View>
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
                    .post('http://localhost:3001/kategori/tambah', {
                      kategori: tambah,
                    })
                    .then(() => {
                      Toast.show({
                        type: 'sukses',
                        text1: 'Berhasil Menambah Kategori',
                        visibilityTime: 2000,
                      });
                      bottomSheetRef.current.close();
                      setBerhasilTambah(true);
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
            style={styles.searchStyle}
            placeholder="Masukkan Nama Kategori"
            onChangeText={e => {
              setTambah(e);
            }}
          />
        </BottomSheet>
      </SafeAreaView>
    );
  } else {
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
        <FlatList data={kategori} renderItem={renderItem} />
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
                    .post('http://localhost:3001/kategori/tambah', {
                      kategori: tambah,
                    })
                    .then(() => {
                      Toast.show({
                        type: 'sukses',
                        text1: 'Berhasil Menambah Kategori',
                        visibilityTime: 2000,
                      });
                      bottomSheetRef.current.close();
                      setBerhasilTambah(true);
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
            style={styles.searchStyle}
            placeholder="Masukkan Nama Kategori"
            onChangeText={e => {
              setTambah(e);
            }}
          />
        </BottomSheet>
      </SafeAreaView>
    );
  }
};

export default MenuPage;

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
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey',
  },
  header: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  texHeaderStyle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  iconPlusStyle: {
    marginRight: 10,
  },
  searchStyle: {
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
