import React, { type FC, forwardRef, LegacyRef } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export interface GrowProps extends ViewProps {}

export const Grow: FC<GrowProps> = forwardRef((props, ref?: LegacyRef<any>) => {
  const { children } = props;

  return (
    <View ref={ref} {...props} style={[style.container, props.style]}>
      {children}
    </View>
  );
});

Grow.displayName = 'Grow';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
