import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrowIcon from '../assets/svg/ArrowIcon.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const OrderComp = ({data, submit}) => {
  const navigation = useNavigation();
  const handleDetailedPage = value => {
    navigation.navigate('Detail', {data: value});
  };
  return (
    <View>
      {/* Mapping Data dari API */}
      {data.map((value, index) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              handleDetailedPage(value);
            }}
            key={index}>
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                <View style={styles.pembeliContainer}>
                  <View style={styles.idOrderContainer}>
                    <Text style={styles.idOrder}>#{value.Checkout_id}</Text>
                  </View>
                  <Text style={styles.textNama}>{value.NamaUser}</Text>
                  <View style={styles.arrowContainer}>
                    <ArrowIcon width={14} height={14} fill={'black'} />
                  </View>
                </View>
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
          </TouchableWithoutFeedback>
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
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  menuContainer: {
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  namaMenuContainer: {flexDirection: 'row', marginBottom: 10},
  text: {fontFamily: 'Inter-Regular', color: 'black'},
  varianContainer: {paddingLeft: 10},
  pembeliContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
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
  arrowContainer: {marginRight: 10},
});
