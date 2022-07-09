import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const OrderSekarang = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>OrderSekarang</Text>
    </SafeAreaView>
  );
};

export default OrderSekarang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
