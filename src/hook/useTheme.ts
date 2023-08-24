import { createContext, useContext } from 'react';
import { color } from 'theme';

export type ColorType = typeof color;

export interface ThemeValue {}

export const ThemeContext = createContext<ColorType>(color);

export const useTheme = (): ColorType => useContext<ColorType>(ThemeContext);
