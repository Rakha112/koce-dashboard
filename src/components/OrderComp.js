import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const OrderComp = ({data}) => {
  return (
    <View>
      {/* Mapping Data dari API */}
      {data.map((value, index) => {
        return (
          <View style={styles.container} key={index}>
            <View style={styles.innerContainer}>
              <Text style={styles.textNama}>{value.NamaUser}</Text>
              {/* Mapping Menu dari data */}
              {JSON.parse(value.Menu).map((val, ind) => {
                return (
                  <View style={styles.menuContainer} key={ind}>
                    <View style={styles.namaMenuContainer}>
                      <Text style={styles.text}>{val.Menu} </Text>
                      <Text style={styles.text}>x {val.Jumlah}</Text>
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
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OrderComp;

const styles = StyleSheet.create({
  container: {borderBottomWidth: 0.6, borderBottomColor: 'grey'},
  innerContainer: {paddingHorizontal: 20},
  textNama: {
    fontFamily: 'Inter-Bold',
    paddingVertical: 10,
    color: 'black',
  },
  menuContainer: {
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  namaMenuContainer: {flexDirection: 'row', marginBottom: 10},
  text: {fontFamily: 'Inter-Regular', color: 'black'},
  varianContainer: {paddingLeft: 10},
});
