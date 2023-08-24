import React from 'react';
import AnimatedLottieView, {
  AnimatedLottieViewProps,
} from 'lottie-react-native';
import { useRef } from 'react';

export const LottieView = (props: AnimatedLottieViewProps) => {
  const ref = useRef<any>();
  return (
    <AnimatedLottieView
      ref={ref}
      onLayout={() => {
        if (props?.autoPlay) {
          ref.current?.play?.();
        }
      }}
      {...props}
    />
  );
};

LottieView.displayName = 'LottieView';
