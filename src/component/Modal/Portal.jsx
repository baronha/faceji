import React from 'react';
import { View, StyleSheet } from 'react-native';
import { space } from 'theme';

const Portal = ({ modal: { getParam, ...props } }) => {
  const children = getParam('children');

  return <View style={style.container}>{children}</View>;
};

export default Portal;

const style = StyleSheet.create({
  container: {
    width: space.width,
    height: space.height,
  },
});
