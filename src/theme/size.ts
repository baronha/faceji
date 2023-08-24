import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseRatioSize = 400;
const ratio = width / baseRatioSize;

export const space = {
  width,
  height,

  half_width: Math.round(width / 2),
  half_height: Math.round(height / 2),

  '3xs': Math.round(4 * ratio),
  '2xs': Math.round(8 * ratio),
  xs: Math.round(12 * ratio),
  s: Math.round(16 * ratio),
  m: Math.round(24 * ratio),
  l: Math.round(28 * ratio),
  xl: Math.round(32 * ratio),
  '2xl': Math.round(38 * ratio),
  '3xl': Math.round(42 * ratio),
};

export const avatarSize = {
  '2xs': Math.round(24 * ratio),
  xs: Math.round(32 * ratio),
  s: Math.round(40 * ratio),
  m: Math.round(56 * ratio),
  l: Math.round(72 * ratio),
  xl: Math.round(92 * ratio),
  '2xl': Math.round(156 * ratio),
  //   '3xl': Math.round(64 * ratio),
};

export const fontSize = {
  '2xs': Math.round(8 * ratio),
  xs: Math.round(10 * ratio),
  s: Math.round(12 * ratio),
  m: Math.round(14 * ratio),
  l: Math.round(16 * ratio),
  xl: Math.round(20 * ratio),
  '2xl': Math.round(24 * ratio),
  '3xl': Math.round(32 * ratio),
  '4xl': Math.round(36 * ratio),
};

export const iconSize = {
  '2xs': Math.round(12 * ratio),
  xs: Math.round(16 * ratio),
  s: Math.round(20 * ratio),
  m: Math.round(24 * ratio),
  l: Math.round(28 * ratio),
  xl: Math.round(32 * ratio),
  '2xl': Math.round(36 * ratio),
  '3xl': Math.round(40 * ratio),
  '4xl': Math.round(44 * ratio),
  '5xl': Math.round(48 * ratio),
  //   '3xl': Math.round(64 * ratio),
};

export const getGutter = (index: number, spacing: number, row: number = 1) => {
  if (index % row === 0) {
    return { marginRight: spacing };
  }
  if (typeof row === 'number' && row > 2) {
    if ((index + 1) % row === 0) {
      return { marginLeft: spacing };
    }
    return { marginHorizontal: spacing };
  }
};
