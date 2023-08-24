import React, { type FC, forwardRef, LegacyRef } from 'react';
import { View, ViewProps, StyleSheet, type FlexAlignType } from 'react-native';

export interface RowProps extends ViewProps {
  alignItems?: FlexAlignType;
}

export const Row: FC<RowProps> = forwardRef((props, ref?: LegacyRef<any>) => {
  const { children, alignItems = 'center' } = props;

  return (
    <View
      ref={ref}
      {...props}
      style={[style.container, { alignItems }, props.style]}
    >
      {children}
    </View>
  );
});

Row.displayName = 'Row';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
