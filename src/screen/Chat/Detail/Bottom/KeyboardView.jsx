import { useSafeArea } from 'hook';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);
  useKeyboardHandler({
    onMove: e => {
      'worklet';

      progress.value = e.progress;
      height.value = e.height;
    },
    onInteractive: e => {
      'worklet';

      progress.value = e.progress;
      height.value = e.height;
    },
  });

  return { height, progress };
};

const KeyboardView = () => {
  const { height } = useKeyboardAnimation();
  const { bottom } = useSafeArea();

  const keyboardStyle = useAnimatedStyle(() => ({
    height: height.value <= bottom ? bottom : height.value,
  }));

  return (
    <Animated.View style={[style.container, keyboardStyle]}></Animated.View>
  );
};

export default KeyboardView;

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // height: 200,
    //
  },
});
