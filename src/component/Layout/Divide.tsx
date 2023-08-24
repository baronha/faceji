import { useTheme } from 'hook';
import React, { type FC, forwardRef, LegacyRef } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export interface DivideProps extends ViewProps {
  level?: '300' | '400' | '600' | '700' | '800';
}

export const Divide: FC<DivideProps> = props => {
  const { level } = props;
  const { backgroundColor: color } = useTheme();
  const backgroundColor = level ? color?.[level] : color[300];

  return (
    <View
      {...props}
      style={[style.container, { backgroundColor }, props.style]}
    />
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    borderRadius: 4,
  },
});
