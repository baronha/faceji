import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { space } from 'theme';

export const useSafeArea = () => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingTop = space.m + top;
  const paddingBottom = space.m + bottom;
  return {
    top,
    bottom,
    paddingTop,
    paddingBottom,
  };
};
