import { STORAGE_KEY } from 'common';
import { ColorType, ThemeContext } from 'hook';
import { IconoirProvider } from 'iconoir-react-native';
import { useMMKVString } from 'react-native-mmkv';
import { iconSize, light, variantColor } from 'theme';
import * as color from 'color';
import { StatusBar } from 'react-native';

type ColorNameType = keyof typeof color;
type ThemeProviderProps = {
  children: React.ReactNode;
  customColor?: ColorType;
  themeName?: 'dark' | 'light';
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, customColor } = props;
  let themeName = props?.themeName
    ? props?.themeName
    : customColor
    ? 'custom'
    : useMMKVString(STORAGE_KEY.THEME)?.[0];

  if (!themeName) themeName = 'light';

  const themeColor =
    customColor || (color?.[themeName as ColorNameType] ?? light);

  const value: any = {
    ...variantColor,
    ...themeColor,
    themeName,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        barStyle={themeName === 'light' ? 'dark-content' : 'light-content'}
      />
      <IconoirProvider
        iconProps={{
          color: value?.muted,
          strokeWidth: 1.5,
          width: iconSize.m,
          height: iconSize.m,
        }}
      >
        {children}
      </IconoirProvider>
    </ThemeContext.Provider>
  );
};
