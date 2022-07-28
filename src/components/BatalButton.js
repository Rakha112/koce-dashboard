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

const Button = ({submit, text}) => {
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{scale: scaleValue.value}]};
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableWithoutFeedback
        style={styles.button}
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
    width: 80,
    height: 50,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#F83E3E',
  },
  button: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F83E3E',
  },
});
