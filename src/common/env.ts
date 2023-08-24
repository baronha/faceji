import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// TODO: Add AppId

const ANDROID_APP_ID = 'com.catchap.app';
const IOS_APP_ID = 'IOS_ID';

const APP_STORE_LINK = `itms-apps://apps.apple.com/app/id${IOS_APP_ID}`;
const PLAY_STORE_LINK = `market://details?id=${ANDROID_APP_ID}`;

export const env = {
  MODE: 'Config.MODE',
  IS_IOS: Platform.OS === 'ios',
  IS_ANDROID: Platform.OS === 'android',
  IS_WINDOW: Platform.OS === 'windows',
  IS_MACOS: Platform.OS === 'macos',
  OS_VERSION: DeviceInfo.getSystemVersion(),
  GOOGLE_SIGN_IN_WEB_CLIENT_ID: ' Config.GOOGLE_SIGN_IN_WEB_CLIENT_ID',
  IOS_CLIENT_ID: ' Config.IOS_CLIENT_ID',
  FACEBOOK_ID: 'Config.FACEBOOK_ID',
  WEB_URL: "https://chatchik.com/", 
  // SOCKET_URL: 'http://localhost:8800',
  SOCKET_URL: 'Config.SOCKET_URL',
  // SENTRY_DSN: 'https://9a24a80cd7dd41babb8f77debdedfca5@sentry.tiktik.to/4',
  SENTRY_DSN: 'Config.SENTRY_DSN',
  STORE_LINK: Platform.select({
    ios: APP_STORE_LINK,
    android: PLAY_STORE_LINK,
  }),
  USER_AGENT: `CatChap - [${DeviceInfo.getReadableVersion()}] - ${DeviceInfo.getModel()}`,
};
