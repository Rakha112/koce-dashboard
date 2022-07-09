import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const OrderSelesai = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>OrderSelesai</Text>
    </SafeAreaView>
  );
};

export default OrderSelesai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
