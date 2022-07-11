/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import axios from 'axios';
import Toast from 'react-native-toast-message';
const Switch = ({status, nama, kategori}) => {
  // value buat animasi switch
  const switchTranslate = useSharedValue(status === 1 ? 21 : 0);
  // state buat aktifasi switch
  const [aktif, setAktif] = useState(status === 1 ? true : false);
  // value buat animasi backgroud
  const progress = useDerivedValue(() => {
    return withTiming(aktif ? 21 : 0);
  });
  useEffect(() => {
    if (aktif) {
      switchTranslate.value = 21;
    } else {
      switchTranslate.value = 0;
    }
  }, [aktif, switchTranslate]);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      ['#F2F5F7', '#FFA901'],
    );

    return {
      backgroundColor,
    };
  });

  const switchHandle = () => {
    setAktif(!aktif);
    if (aktif) {
      axios
        .put('http://192.168.181.51:3001/menu/status', {
          status: 0,
          nama: nama,
          kategori: kategori,
        })
        .then(res => {
          Toast.show({
            type: 'gagal',
            text1: `${nama} OFF`,
            visibilityTime: 2000,
          });
        });
    } else {
      axios
        .put('http://192.168.181.51:3001/menu/status', {
          status: 1,
          nama: nama,
          kategori: kategori,
        })
        .then(res => {
          Toast.show({
            type: 'sukses',
            text1: `${nama} ON`,
            visibilityTime: 2000,
          });
        });
    }
  };

  return (
    <Animated.View style={[styles.container, backgroundColorStyle]}>
      <TouchableWithoutFeedback
        onPress={() => {
          switchHandle();
        }}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 36.5,
    justifyContent: 'center',
    backgroundColor: '#F2F5F7',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    margin: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
