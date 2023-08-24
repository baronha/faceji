import React from 'react';
import { AnimatedList, Image, Row, Text } from 'component';
import resources from 'language/resources';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { color, fontSize, iconSize, space } from 'theme';
import image from 'image';
import { Check } from 'iconoir-react-native';
import { useMMKVString } from 'react-native-mmkv';
import { STORAGE_KEY } from 'common';
import { Haptic, storage } from 'service';
import { useTranslation } from 'react-i18next';

const LanguagePicker = () => {
  const [localize] = useMMKVString(STORAGE_KEY.LANGUAGE);
  const data = Object.keys(resources);
  const { t, i18n } = useTranslation();

  const renderItem = ({ item }) => {
    const flag = image[item];
    const active = item === localize;
    const subTitle = DATA_STRING?.[item]?.subTitle;
    const title = DATA_STRING?.[item]?.title;

    const onLanguage = () => {
      storage.set(STORAGE_KEY.LANGUAGE, item);
      i18n.changeLanguage(item);
      Haptic();
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={item}
        onPress={onLanguage}
        style={style.item}
      >
        <Row style={style.row}>
          <Image style={style.flag} source={flag} />
          <View style={style.titleView}>
            <Text type={active ? 'normal' : 'muted'} style={style.title}>
              {title}
            </Text>
            {subTitle ? (
              <Text type="muted" style={style.subTitle}>
                {subTitle}
              </Text>
            ) : null}
          </View>
          {active ? (
            <Check
              color={color.primary}
              height={iconSize.l}
              width={iconSize.l}
            />
          ) : null}
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <AnimatedList title={t('Language')} renderItem={renderItem} data={data} />
  );
};

export default LanguagePicker;

const style = StyleSheet.create({
  container: {},
  row: {
    //
  },
  item: {
    // marginBottom: space.m,
    paddingVertical: space.s,
  },
  flag: {
    width: iconSize.l,
    height: iconSize.l,
    borderRadius: space.width,
  },
  titleView: {
    flex: 1,
    paddingHorizontal: space.s,
  },
  title: {
    // paddingHorizontal: space.s,
    fontSize: fontSize.l,
    fontWeight: '600',
  },
  subTitle: {
    marginTop: space['3xs'],
    fontSize: fontSize.s,
  },
});

const DATA_STRING = {
  en: {
    title: 'English',
    subTitle: '',
  },
  fr: {
    title: 'Français',
    subTitle: 'French',
  },
  vi: {
    title: 'Tiếng Việt',
    subTitle: 'Vietnamese',
  },
  kr: {
    title: '한국인',
    subTitle: 'South Korea',
  },
};
