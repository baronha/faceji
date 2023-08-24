import './language';

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApplicationNavigator } from 'navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Menu, ModalProvider, ThemeProvider } from 'component';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { UIManager } from 'react-native';
import { env } from './common/env';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

if (env.IS_ANDROID && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <KeyboardProvider>
        <ThemeProvider>
          <ModalProvider>
            <ApplicationNavigator />
            <Menu />
            <Init />
          </ModalProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;

const Init = () => {
  return null;
};
