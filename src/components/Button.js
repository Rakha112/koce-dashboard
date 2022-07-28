/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const Button = ({submit, text, color}) => {
  const {width} = useWindowDimensions();
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });

  return (
    <Animated.View
      style={[styles.container, animatedStyles, {width: width * 0.7}]}>
      <TouchableWithoutFeedback
        style={[styles.button, {width: width * 0.7}]}
        onPressIn={() => {
          scaleValue.value = withTiming(0.9, {
            duration: 500,
            easing: Easing.out(Easing.exp),
          });
        }}
        onPress={() => {
          console.log('PRESS');
          submit();
        }}
        onPressOut={() => {
          scaleValue.value = withTiming(1, {
            duration: 500,
            easing: Easing.out(Easing.exp),
          });
        }}>
        <Text style={styles.text}>{text}</Text>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'white',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFA901',
  },
});
