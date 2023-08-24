import SoundPlayer from 'react-native-sound';

export type SoundList = 'button';

type SoundOption = {
  volume?: number;
};

// Enable playback in silence mode
SoundPlayer.setCategory('Ambient');

const Data = {
  button: new SoundPlayer('button.mp3', SoundPlayer.MAIN_BUNDLE),
};

export const playSound = (type: SoundList, options: SoundOption) => {
  const SoundMode = Data[type];
  const volume = options?.volume ?? 1;

  SoundMode.setVolume(volume);
  SoundMode.stop(() => {
    SoundMode.play();
  });
};

export const Sound = (type: SoundList) => Data[type];
