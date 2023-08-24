import { MMKV } from 'react-native-mmkv';
// import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';

export const MMKVStorage = new MMKV();

// if (__DEV__) {
//   initializeMMKVFlipper({ default: Storage });
// }

const set = (key: string, value: any) => {
  MMKVStorage.set(
    key,
    typeof value === 'string' ? value : JSON.stringify(value),
  );
};

const get = (key: string) => {
  if (MMKVStorage.contains(key)) {
    const value = MMKVStorage.getString(key);
    if (!value) {
      return false;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return false;
};

export default {
  get,
  set,
};
