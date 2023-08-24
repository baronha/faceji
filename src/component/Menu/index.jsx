import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Animated, {
  FadeIn,
  Layout as LayoutAnimated,
  SlideOutDown,
} from 'react-native-reanimated';
import { Emitter, RNLayoutAnimated, navigator } from 'service';
import { color, fontSize, iconSize, space } from 'theme';
import { openModal, useSafeArea, useTheme } from 'hook';
import { MoonSat, QrCode, Settings, SunLight } from 'iconoir-react-native';
import { LIGHT } from 'common';
import { useTranslation } from 'react-i18next';
import { Route } from 'screen';
import image from 'image';
import { Text } from 'component/Text';
import { Row } from 'component/Layout';
import { Image } from 'component/Image';

import ThemePicker from './ThemePicker';

export const Menu = () => {
  const [visible, setVisible] = useState(false);
  const { paddingBottom, bottom } = useSafeArea();
  const top = -paddingBottom;

  useEffect(() => {
    Emitter.on('menu', value => {
      setVisible(Boolean(value));
    });
    return () => {
      Emitter.off('menu');
    };
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  return visible ? (
    <View
      style={[
        style.container,
        {
          marginTop: top,
          backgroundColor: color.black,
          paddingBottom: bottom,
        },
      ]}
    >
      <MenuContent onClose={onClose} />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={style.overlayView} />
      </TouchableWithoutFeedback>
    </View>
  ) : null;
};

export const MenuContent = ({ onClose }) => {
  const { t, i18n } = useTranslation(['common']);
  const { themeName } = useTheme();

  const goLanguage = () => {
    onClose();
    navigator.push(Route.LanguagePicker);
  };

  const openTheme = () => {
    openModal('BottomSheet', {
      content: <ThemePicker />,
      title: t('Theme'),
    });
  };

  return (
    <View style={style.menu}>
      <Row>
        <Text style={style.title}>Menu</Text>
      </Row>
      <MenuItem IconComp={Settings}>{t('Setting and Privacy')}</MenuItem>
      <MenuItem
        onPress={openTheme}
        IconComp={themeName === LIGHT ? MoonSat : SunLight}
      >
        {t('Theme')}
      </MenuItem>
      <MenuItem
        onPress={goLanguage}
        IconComp={() => (
          <Image style={style.flag} source={image[i18n.language]} />
        )}
      >
        {t('Language')}
      </MenuItem>
      <MenuItem IconComp={QrCode}>QR Code</MenuItem>
      <Text type="muted" style={style.version}>
        ChatChik - v.{DeviceInfo.getVersion()}
      </Text>
    </View>
  );
};

const MenuItem = ({ IconComp, onPress, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={style.menuItem}
      onPress={onPress}
    >
      <Row>
        <View style={style.iconView}>
          <IconComp color={color.white} />
        </View>
        <Text style={style.label}>{children}</Text>
      </Row>
    </TouchableOpacity>
  );
};

const TABBAR_HEIGHT = iconSize['4xl'] + space['2xs'];

const style = StyleSheet.create({
  container: {
    // flex: 1,
  },

  menu: {
    padding: space.m,
    backgroundColor: color.white + '20',
    marginHorizontal: space['2xs'],
    borderRadius: space.xl,
    marginTop: space.m,
  },
  overlayView: {
    position: 'absolute',
    top: -space.height - TABBAR_HEIGHT,
    right: 0,
    left: 0,
    bottom: 0,
    height: space.height,
    width: space.width,
  },

  title: {
    fontSize: fontSize['2xl'],
    fontWeight: '900',
    marginBottom: space['2xs'],
    color: color.white,
    textAlign: 'center',
  },
  menuItem: {
    marginTop: space.s,
  },
  label: {
    // fontWeight: 'bold',
    marginLeft: space.s,
    fontWeight: '600',
    color: color.white,
  },
  iconView: {
    padding: space['2xs'],
    borderRadius: space.xs,
    backgroundColor: color.white + '18',
  },
  version: {
    textAlign: 'center',
    paddingTop: space.s,
    fontWeight: '500',
    fontSize: fontSize.s,
  },
  flag: {
    width: iconSize.s,
    height: iconSize.s,
  },
});
