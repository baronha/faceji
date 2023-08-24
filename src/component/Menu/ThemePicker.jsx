import { STORAGE_KEY } from 'common';
import { Image } from 'component/Image';
import { Row } from 'component/Layout';
import { List } from 'component/List';
import { Text } from 'component/Text';
import { useSafeArea, useTheme } from 'hook';
import image from 'image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { storage } from 'service';
import { space } from 'theme';

const THEME = [
  {
    text: 'Light',
    value: 'light',
  },
  {
    text: 'Dark',
    value: 'dark',
  },
  {
    text: 'Dracula',
    value: 'dracula',
  },
  {
    text: 'Monokai',
    value: 'monokai',
  },
];

const ThemePicker = () => {
  const { themeName, primary, transparent, backgroundColor } = useTheme();
  const { t } = useTranslation(['common']);

  const renderRow = ({ item, index }) => {
    const { text, value } = item;
    const active = themeName === value;

    const chooseTheme = () => {
      storage.set(STORAGE_KEY.THEME, value);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={chooseTheme}
        style={style.item}
        key={index}
      >
        <View
          style={[
            style.imageView,
            {
              borderColor: active ? primary : transparent,
            },
          ]}
        >
          <Image source={image[value]} style={style.image} />
        </View>
        <Text type={active ? 'normal' : 'muted'} style={style.text}>
          {t(text)}
        </Text>
      </TouchableOpacity>
    );
  };

  const { paddingBottom } = useSafeArea();
  return (
    <View style={[style.container, { paddingBottom }]}>
      <List
        Element={FlatList}
        data={THEME}
        itemKey={'value'}
        renderItem={renderRow}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: space.m }}
        style={style.list}
      />
      {/* <Row style={style.row}>
        <View style={{ flex: 1 }}>
          <Text fontWeight="600" style={style.system}>
            {t('Based on System')}
          </Text>
          <Text size="s" type="muted">
            {t('Match appearance to your device')}
          </Text>
        </View>
      </Row> */}
    </View>
  );
};

export default ThemePicker;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: space.m,
  },
  list: {
    marginHorizontal: -space.m,
  },
  system: {
    marginBottom: space['3xs'],
  },
  item: {
    marginLeft: space.m,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: space.s,
    fontWeight: 'bold',
  },
  imageView: {
    overflow: 'hidden',
    padding: space['3xs'],
    borderRadius: space.s,
    borderWidth: 2,
  },
  image: {
    height: space.half_width / 2,
    aspectRatio: 1 / 1,
    borderRadius: space.xs,
  },
  row: {
    paddingTop: space.m,
  },
});
