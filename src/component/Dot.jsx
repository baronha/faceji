import color from 'color';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { space } from 'theme';

export const Dot = ({
  color: backgroundColor = color.primary,
  style: containerStyle,
  size = space.xs,
}) => {
  return (
    <View
      style={[
        style.container,
        { backgroundColor, width: size, height: size },
        containerStyle,
      ]}
    />
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: space.width,
    position: 'absolute',
  },
});
