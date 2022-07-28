/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import OrderComp from '../components/OrderComp';
import {io} from 'socket.io-client';
const OrderSekarang = () => {
  const [data, setData] = useState();
  const [refreshing, setRefrehsing] = useState(false);
  useEffect(() => {
    const socket = io('https://server-koce.herokuapp.com', {
      transports: ['websocket'],
    });
    socket.on('checkout', () => {
      axios
        .get('https://server-koce.herokuapp.com/checkout/data')
        .then(res => {
          setData(res.data.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    });
  }, []);

  useEffect(() => {
    axios
      .get('https://server-koce.herokuapp.com/checkout/data')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);
  const handleRefresh = () => {
    setRefrehsing(true);
    axios
      .get('https://server-koce.herokuapp.com/checkout/data')
      .then(res => {
        setData(res.data.data);
        setRefrehsing(false);
      })
      .catch(err => {
        console.log(err.response);
        setRefrehsing(false);
      });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh()}
            refreshing={refreshing}
            colors={['#FFA901']}
            tintColor={'#FFA901'}
          />
        }>
        {data === undefined ? (
          <ActivityIndicator size={'large'} color={'#FFA901'} />
        ) : data.length > 0 ? (
          <OrderComp data={data} />
        ) : (
          <View style={styles.kosongContainer}>
            <Text style={styles.text}>Belum Ada Order</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSekarang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  kosongContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 20,
  },
});
