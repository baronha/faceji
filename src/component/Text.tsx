import React, { forwardRef, LegacyRef } from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import type { Type } from 'common';
import { fontSize } from 'theme';
import { useTheme } from 'hook';

export type SizeType = keyof typeof fontSize;
export type FontFamily = 'Manrope' | 'Inter';

type TextType = Type | 'muted' | 'white';

export interface TextProps extends RNTextProps {
  size?: SizeType;
  fontFamily?: FontFamily;
  fontWeight?: TextStyle['fontWeight'];
  type?: TextType;
  color?: string;
  textAlign?: TextStyle['textAlign'];
}

export const Text = forwardRef((props: TextProps, ref?: LegacyRef<any>) => {
  const {
    fontWeight,
    type = 'normal',
    textAlign,
    children,
    size = 'm',
  } = props;

  const color = useTextStyle(type);

  const textSize = fontSize[size];

  return (
    <RNText
      {...props}
      style={[
        style.container,
        {
          fontSize: textSize,
          textAlign,
          fontWeight,
          color: props?.color ?? color,
        },
        props.style,
      ]}
      ref={ref}
    >
      {children}
    </RNText>
  );
});

const useTextStyle = (type: TextType) => {
  const color = useTheme();
  // let color = color.
  let colorStyle = color.text;

  if (type === 'normal' || !type) {
    colorStyle = color.text;
  } else {
    switch (type) {
      case 'muted':
        colorStyle = color.muted;
        break;
      default:
        colorStyle = color?.[type];
        break;
    }
  }

  return colorStyle;
};

Text.displayName = 'Text';

Text.defaultProps = {
  size: 'm',
  fontWeight: 'normal',
  type: 'normal',
  textAlign: undefined,
};

const style = StyleSheet.create({
  container: {
    fontSize: fontSize.m,
    fontFamily: 'Manrope',
    // fontWeight: 'bold'
  },
  normalText: {},
});
