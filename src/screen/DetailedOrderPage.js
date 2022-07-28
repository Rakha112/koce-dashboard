/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import BatalButton from '../components/BatalButton';
import FormatNumber from '../components/FormatNumber';
const DetailedOrderPage = ({route}) => {
  const {data} = route.params;
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.pembeliContainer}>
          <View style={styles.idOrderContainer}>
            <Text style={styles.idOrder}>#{data.Checkout_id}</Text>
          </View>
          <Text style={styles.textNama}>{data.NamaUser}</Text>
        </View>
        {JSON.parse(data.Menu).map((val, ind) => {
          return (
            <View style={styles.menuContainer} key={ind}>
              <View style={styles.namaMenuContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.text}>{val.Menu} </Text>
                  <Text style={styles.text}>x {val.Jumlah}</Text>
                </View>
                <Text style={styles.textHarga}>
                  Rp. <FormatNumber value={val.HargaTotal} />
                </Text>
              </View>
              <Text style={styles.text}>Varian :</Text>
              {/* Mapping Varian dari menu */}
              {JSON.parse(val.Variasi).map((v, i) => {
                return (
                  <View style={styles.varianContainer} key={i}>
                    <Text style={styles.text}>{v}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
        <View style={styles.totalContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.textHarga}>
              {' '}
              Rp. <FormatNumber value={data.Harga} />
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Text style={styles.textTotal}>Ongkir</Text>
            <Text style={styles.textHarga}>
              {' '}
              Rp. <FormatNumber value={data.Ongkir} />
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', paddingTop: 20, borderTopWidth: 0.8}}>
            <Text style={styles.textTotal}>Harga Total</Text>
            <Text style={styles.textHarga}>
              {' '}
              Rp. <FormatNumber value={data.HargaTotal} />
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <BatalButton text={'Batal'} />
        <Button text={'Siap'} />
      </View>
    </SafeAreaView>
  );
};

export default DetailedOrderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textNama: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
    marginLeft: 20,
    flex: 1,
  },
  textTotal: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  menuContainer: {
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  namaMenuContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  text: {fontFamily: 'Inter-Regular', color: 'black'},
  textHarga: {fontFamily: 'Inter-Bold', color: 'black', fontSize: 16},
  varianContainer: {paddingLeft: 10},
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  idOrderContainer: {
    backgroundColor: '#FFA901',
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  idOrder: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: 20,
  },
  pembeliContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
  },
  totalContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
  },
});
