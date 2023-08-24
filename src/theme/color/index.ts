export * from './light';
export * from './dark';
export * from './dracula';
export * from './monokai';

import { light } from './light';

export const variantColor = {
  // success
  success: '#55C502',
  successColor: {
    300: '#E7F7DC',
    400: '#77D135',
    600: '#52BD02',
    700: '#4BAD02',
  },

  // gray
  gray: '#ACAEAF',
  grayColor: {
    300: '#F5F5F5',
    400: '#E2E3E4',
    600: '#777777',
    700: '#464849',
    800: '#3C3C3C',
  },

  // warning
  warning: '#FFC60F',
  warningColor: {
    300: '#FFF7DD',
    400: '#FFD13E',
    600: '#F5BE0D',
    700: '#E0AE0D',
    800: '#C17D2B',
  },

  // danger
  danger: '#FF4242',
  dangerColor: {
    300: '#FFE5E5',
    400: '#FF6868',
    600: '#F53F3F',
    700: '#E03A39',
  },

  //info
  info: '#CB7AFF',
  infoColor: {
    300: '#F8ECFF',
    400: '#D595FF',
    600: '#C376F5',
    700: '#B36BE0',
  },
  transparent: '#00000000',
  white: '#ffffff',
  black: '#000000',
};

export let color = {
  ...light,
  ...variantColor,
};

export default color;
