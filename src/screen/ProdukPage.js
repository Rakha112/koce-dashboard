/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TextInput, Image, FlatList} from 'react-native';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Switch from '../components/Switch';
import TambahIcon from '../assets/svg/TambahIcon.svg';
import BackIcon from '../assets/svg/BackIcon.svg';
import DoneIcon from '../assets/svg/DoneIcon.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ProdukPage = ({route}) => {
  const navigation = useNavigation();
  const {kategori} = route.params;
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [foto, setFoto] = useState('');
  const [update, setUpdate] = useState(true);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const bottomSheetRef = useRef(null);
  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else {
      console.log('AAA');
      axios
        .get('http://192.168.181.51:3001/menu/', {
          params: {
            kategori: kategori,
          },
        })
        .then(res => {
          setMenu(res.data.data);
        });
    }
  }, [kategori, loading]);

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

  const flatlistComponent = ({item}) => {
    // console.log(item);
    return (
      <View style={styles.componentContainer}>
        <Text style={{fontFamily: 'Inter-Regular', fontSize: 16}}>
          {item.NamaProduk}
        </Text>
        <Switch
          status={item.Status}
          nama={item.NamaProduk}
          kategori={kategori}
        />
      </View>
    );
  };
  // menghandle tombol submit
  const submitHandle = () => {
    // jika input pada form kosong
    if (nama === '' || deskripsi === '' || harga === '' || foto === '') {
      Toast.show({
        type: 'warning',
        text1: 'Form tidak boleh kosong',
        visibilityTime: 2000,
      });
    } else {
      // memnuat ref untuk firebase cloud store ke folder images
      const ref = storage().ref(`images/${nama}`);
      // upload gambar ke firebase cloud store
      const task = ref.putFile(foto.toString());
      task.then(() => {
        console.log('Image uploaded to the bucket!');
        // mendapatkan url dari gambar yang telah di upload
        storage()
          .ref(`images/${nama}`)
          .getDownloadURL()
          .then(res => {
            // mennambahkan data menu ke database
            axios
              .post('http://192.168.181.51:3001/menu/tambah', {
                nama: nama,
                kategori: kategori,
                deskripsi: deskripsi,
                harga: harga,
                foto: res,
              })
              .then(() => {
                setLoading(true);
                Toast.show({
                  type: 'sukses',
                  text1: 'Berhasil menambah menu',
                  visibilityTime: 2000,
                });
                bottomSheetRef.current.close();
              });
          });
      });
    }
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
        <Text style={styles.texHeaderStyle}>{kategori}</Text>
        <View style={{marginRight: 10}}>
          <TouchableWithoutFeedback
            onPress={() => {
              bottomSheetRef.current.expand();
            }}>
            <TambahIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {menu.length !== 0 ? (
        <FlatList data={menu} renderItem={flatlistComponent} />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
            Menu Kosong
          </Text>
        </View>
      )}
      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={['90%', '90%']}
        backdropComponent={renderBackdrop}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.texHeaderStyle}>Tambah Menu Baru</Text>
          <TouchableWithoutFeedback
            style={{marginRight: 10}}
            onPress={() => {
              submitHandle();
            }}>
            <DoneIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{paddingBottom: 40}}>
          <View style={{marginHorizontal: 10}}>
            <View style={styles.fotoContainer}>
              {foto === '' ? (
                <TouchableWithoutFeedback
                  style={styles.fotoButton}
                  onPress={() => {
                    launchImageLibrary(
                      {
                        storageOptions: {
                          skipBackup: true,

                          path: 'images',
                        },
                      },
                      res => {
                        console.log('Response = ', res);
                        if (res.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (res.error) {
                          console.log('ImagePicker Error: ', res.error);
                        } else if (res.customButton) {
                          console.log(
                            'User tapped custom button: ',
                            res.customButton,
                          );
                        } else {
                          setFoto(res.assets[0].uri);
                        }
                      },
                    );
                  }}>
                  <TambahIcon width={30} height={30} fill={'black'} />
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Inter-Regular',
                      color: 'black',
                      fontSize: 10,
                    }}>
                    Tambah Foto
                  </Text>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    launchImageLibrary(
                      {
                        storageOptions: {
                          skipBackup: true,

                          path: 'images',
                        },
                      },
                      res => {
                        console.log('Response = ', res);
                        if (res.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (res.error) {
                          console.log('ImagePicker Error: ', res.error);
                        } else if (res.customButton) {
                          console.log(
                            'User tapped custom button: ',
                            res.customButton,
                          );
                        } else {
                          setFoto(res.assets[0].uri);
                        }
                      },
                    );
                  }}>
                  <Image
                    source={{
                      uri: foto,
                    }}
                    style={styles.fotoButton}
                  />
                </TouchableWithoutFeedback>
              )}
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: 'Inter-Regular',
                  color: 'black',
                  fontSize: 14,
                }}>
                Silahkan Upload foto menu anda
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textInputStyle}>Nama Menu</Text>
            <TextInput
              value={nama}
              style={styles.inputStyle}
              placeholder="Masukkan Nama Menu"
              placeholderTextColor={'grey'}
              onChangeText={e => {
                setNama(e);
              }}
            />
          </View>
          <View>
            <Text style={styles.textInputStyle}>Deskripsi</Text>
            <TextInput
              value={deskripsi}
              style={styles.inputStyle}
              placeholder="Masukkan Deskripsi Menu"
              placeholderTextColor={'grey'}
              onChangeText={e => {
                setDeskripsi(e);
              }}
            />
          </View>
          <View>
            <Text style={styles.textInputStyle}>Harga (Rp)</Text>
            <TextInput
              value={harga}
              style={styles.inputStyle}
              placeholder="Masukkan Harga Menu"
              placeholderTextColor={'grey'}
              onChangeText={e => {
                setHarga(e);
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ProdukPage;

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
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor: 'white',
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
  fotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 14,
    borderWidth: 1,
  },
  inputStyle: {
    color: 'black',
    height: 45,
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
});