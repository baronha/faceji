import { useTheme } from 'hook';
import React, { type FC, forwardRef, LegacyRef } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export interface LayoutProps extends ViewProps {
  level?: '300' | '400' | '600' | '700' | '800';
}

export const Layout: FC<LayoutProps> = forwardRef(
  (props, ref?: LegacyRef<any>) => {
    const { children, level } = props;
    const { background, backgroundColor: color } = useTheme();

    const backgroundColor = level ? color?.[level] : background;

    return (
      <View
        ref={ref}
        {...props}
        style={[style.container, { backgroundColor }, props.style]}
      >
        {children}
      </View>
    );
  },
);

Layout.displayName = 'Layout';

const style = StyleSheet.create({
  container: {},
});
