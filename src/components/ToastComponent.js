/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import CentangIcon from '../assets/svg/TickIcon.svg';
import TandaSeruIcon from '../assets/svg/ExclamationIcon.svg';
import WarningIcon from '../assets/svg/WarningIcon.svg';
const ToastComponent = () => {
  const toastConfig = {
    sukses: ({text1}) => (
      <View style={[styles.toastContainer, {backgroundColor: '#EDF7ED'}]}>
        <CentangIcon
          width={30}
          height={30}
          color={'#4caf50'}
          style={styles.icon}
        />
        <Text style={[styles.textToast, {color: '#1e4620'}]}>{text1}</Text>
      </View>
    ),
    gagal: ({text1}) => (
      <View style={[styles.toastContainer, {backgroundColor: '#FDEDED'}]}>
        <TandaSeruIcon
          width={30}
          height={30}
          fill={'#ef5350'}
          style={styles.icon}
        />
        <Text style={[styles.textToast, {color: '#5f2120'}]}>{text1}</Text>
      </View>
    ),
    warning: ({text1}) => (
      <View style={[styles.toastContainer, {backgroundColor: '#FFF4E5'}]}>
        <WarningIcon
          width={30}
          height={30}
          fill={'#ff9800'}
          style={styles.icon}
        />
        <Text style={[styles.textToast, {color: '#663c00'}]}>{text1}</Text>
      </View>
    ),
  };
  return <Toast config={toastConfig} />;
};

export default ToastComponent;

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: '90%',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
    marginHorizontal: 10,
  },
  textToast: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
});
