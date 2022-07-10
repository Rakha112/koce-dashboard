/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TambahIcon from '../assets/svg/TambahIcon.svg';
import BackIcon from '../assets/svg/BackIcon.svg';
import DoneIcon from '../assets/svg/DoneIcon.svg';
const ProdukPage = ({route}) => {
  const navigation = useNavigation();
  const {kategori} = route.params;
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [update, setUpdate] = useState(true);
  const bottomSheetRef = useRef(null);

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
    <SafeAreaView style={styles.container}>
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'Inter-Bold', color: 'black'}}>
          Menu Kosong
        </Text>
      </View>
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
              console.log('ORESSSS');
            }}>
            <DoneIcon width={30} height={30} fill={'black'} />
          </TouchableWithoutFeedback>
        </View>
        <KeyboardAwareScrollView>
          <View style={{marginHorizontal: 10}}>
            <View style={styles.fotoContainer}>
              <TouchableWithoutFeedback
                style={styles.fotoButton}
                onPress={() => {
                  console.log('AAA');
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
});
