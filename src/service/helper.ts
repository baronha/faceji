import { LayoutAnimation } from 'react-native';

export const onLayoutAnimated = (ref: any) => {
  // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
  ref.current?.prepareForLayoutAnimationRender();
  // After removing the item, we can start the animation.
  RNLayoutAnimated();
};

export const RNLayoutAnimated = (
  options: {
    callback?: () => void;
    duration?: number;
  } = {},
) => {
  LayoutAnimation.configureNext(
    {
      duration: options?.duration || 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
    () => {
      if (typeof options?.callback === 'function') {
        options?.callback?.();
      }
    },
  );
};
