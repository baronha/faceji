import BottomSheet from './BottomSheet';
import {
  createModalStack,
  ModalProvider as RNModalProvider,
  type ModalStackConfig,
  type ModalOptions,
} from 'react-native-modalfy';
import { BottomSheetProps } from '@gorhom/bottom-sheet';
import { ReactElement } from 'react';
import Portal from './Portal';
import { space } from 'theme';

interface BottomSheet {
  snapPoints?: Array<number | string>;
  props?: BottomSheetProps;
  specialKnob?: boolean;
  content?: ReactElement;
}

export interface ModalList {
  BottomSheet: BottomSheet;
  Portal: any;

  // ModalA: Modal<'ModalA'>;
  // ModalB: Modal<'ModalB'>;
  // ModalC: Modal<'ModalC'>;
}

export type ModalName = Exclude<keyof ModalList, 'Modal'>;

const modalConfig: ModalStackConfig = {
  BottomSheet: {
    modal: BottomSheet,
    position: 'bottom',
    backdropOpacity: 0,
    // transitionOptions: null,
    animateOutConfig: {
      duration: 500,
    },
    animateInConfig: {
      duration: 0,
    },
    backdropAnimationDuration: 500,
    // backdropAnimationDuration: 1,
    // disableFlingGesture: true,
  },
  Portal: {
    modal: Portal,
    backdropOpacity: 0,
    transitionOptions: () => null,
    animateOutConfig: {
      duration: 100,
    },
    animateInConfig: {
      duration: 0,
    },
    backdropAnimationDuration: 100,
  },
};

const defaultConfig: ModalOptions = {
  animateInConfig: {
    duration: 500,
  },
  animateOutConfig: {
    duration: 500,
  },
  backdropOpacity: 0.5,
  transitionOptions: animatedValue => ({
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [space.height, 0, space.height],
        }),
      },
      // {
      //   scale: animatedValue.interpolate({
      //     inputRange: [0, 1, 2],
      //     outputRange: [0, 1, 0.9],
      //   }),
      // },
    ],
  }),
};

const stack = createModalStack(modalConfig, defaultConfig);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return <RNModalProvider stack={stack}>{children}</RNModalProvider>;
};
