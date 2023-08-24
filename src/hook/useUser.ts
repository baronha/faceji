import { STORAGE_KEY, USER_DATA } from 'common';
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from 'service';

export type UserInfo = {
  avatar?: string;
  bio?: string;
  id?: number | string;
  name?: string;
  username?: string;
};

const { USER } = STORAGE_KEY;

export const User: any = {
  get: (field?: keyof UserInfo): UserInfo | any => {
    const userInfo: UserInfo | any = storage.get(USER) as UserInfo;
    if (field) return userInfo?.[field] ?? null;
    return userInfo || null;
  },
  set: (value: keyof typeof User) => storage.set(USER, value),
  update: (value?: UserInfo | Function) => {
    const userInfo: UserInfo = User.get();

    if (typeof value === 'function') {
      const newData = value(userInfo);
      storage.set(USER, { ...userInfo, ...newData });
      return;
    }

    storage.set(USER, { ...userInfo, ...value });
  },
};

// export const useUser = (): UserInfo => useMMKVObject<UserInfo>(USER);

export const useUser = (): [UserInfo] => [USER_DATA];
