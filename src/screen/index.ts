import { lazy } from 'react';

import Profile from './Profile';
import People from './People';
import Chat from './Chat/Home';
import ChatDetail from './Chat/Detail';

const Setting = lazy(() => import('./Setting'));
const ChatSetting = lazy(() => import('./Chat/Setting'));
const Search = lazy(() => import('./Search'));
const Sticker = lazy(() => import('./Sticker'));
const LanguagePicker = lazy(() => import('./Setting/LanguagePicker'));
const Invite = lazy(() => import('./Invite'));

// name for route also use for i18next translation

export const Route = {
  Chat: {
    name: 'Chat',
    component: Chat,
    options: { title: 'Chat' },
  },
  ChatDetail: {
    name: 'ChatDetail',
    component: ChatDetail,
  },
  ChatSetting: {
    name: 'ChatSetting',
    component: ChatSetting,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
    options: { title: 'Profile' },
  },
  Contact: {
    name: 'People',
    component: People,
    options: { tabBarIcon: 'user', title: 'People' },
  },
  Setting: {
    name: 'Setting',
    component: Setting,
  },
  LanguagePicker: {
    name: 'Language',
    component: LanguagePicker,
  },
  Search: {
    name: 'Search',
    component: Search,
  },
  Sticker: {
    name: 'Sticker',
    component: Sticker,
  },
  Invite: {
    name: 'Invite friend',
    component: Invite,
    options: {
      level: '300',
    },
  },
  Main: {
    name: 'Main',
  },
};
