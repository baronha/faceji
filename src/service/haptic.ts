import HapticFeedback, {
  type HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

export const Haptic = (
  type: keyof typeof HapticFeedbackTypes = 'keyboardPress',
) => HapticFeedback.trigger(type, options);
