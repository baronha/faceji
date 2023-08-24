import { fontSize } from 'theme';

export type Size = keyof typeof fontSize;

export type Type =
  | 'primary'
  | 'success'
  | 'gray'
  | 'warning'
  | 'danger'
  | 'info'
  | 'normal';
