import color from 'color';
import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { iconSize, space } from 'theme';

import { Text, TextProps } from './Text';
import { useTheme } from 'hook';
import { Type } from 'common';

export interface BadgeProps extends ViewProps {
  type: Type;
  textProps: TextProps;
}

export const Badge = (props: BadgeProps) => {
  const { children, type = 'primary', textProps } = props;

  const { backgroundColor, textColor } = useStyle(type);

  return (
    <View style={[style.container, props.style, { backgroundColor }]}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          fontWeight="bold"
          {...textProps}
          style={[props.textProps?.style, { color: textColor }]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

const useStyle = (type: Type = 'primary') => {
  const { buttonText, background, ...color } = useTheme();

  let backgroundColor = color?.[type] ?? color.primary;
  let textColor = buttonText;

  if (type !== 'primary') textColor = background;
  return {
    backgroundColor,
    textColor,
  };
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: space['xs'],
    paddingVertical: space['3xs'],
    borderRadius: space.width,
  },
});
