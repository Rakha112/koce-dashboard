/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ActivityIndicator, View} from 'react-native';
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

const Switch = ({status, loading, switchHandleAPI}) => {
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

  return (
    <View style={{flexDirection: 'row'}}>
      {loading ? <ActivityIndicator size={'small'} color={'#FFA901'} /> : <></>}

      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <TouchableWithoutFeedback
          disabled={loading ? true : false}
          onPress={() => {
            setAktif(!aktif);
            switchHandleAPI();
          }}>
          <Animated.View style={[styles.circle, customSpringStyles]} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
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
    marginLeft: 10,
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
