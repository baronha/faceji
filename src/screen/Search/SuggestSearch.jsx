import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { STORAGE_KEY } from 'common';
import { Grow, Row, Text } from 'component';
import { useTranslation } from 'react-i18next';
import { space } from 'theme';
import { Cancel } from 'iconoir-react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  Layout as LayoutAnimated,
} from 'react-native-reanimated';

const SuggestSearch = ({ setKeyword }) => {
  const [recentSearch, setRecentSearch] = useMMKVObject(
    STORAGE_KEY.RECENT_SEARCH,
  );
  const { t } = useTranslation('common');

  const renderItem = (item, index) => {
    const { keyword } = item;
    const onDelete = () => {
      const array = recentSearch?.filter(
        item => keyword && keyword !== item?.keyword,
      );
      setRecentSearch(array);
    };

    const onPress = () => {
      setKeyword(keyword);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        key={`recent-search-${index}`}
        style={style.item}
        onPress={onPress}
      >
        <Row>
          <Grow>
            <Text fontWeight="500">{keyword}</Text>
          </Grow>
          <TouchableOpacity onPress={onDelete}>
            <Cancel />
          </TouchableOpacity>
        </Row>
      </TouchableOpacity>
    );
  };

  return Array.isArray(recentSearch) && recentSearch?.length ? (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={style.container}
      layout={LayoutAnimated.easing()}
    >
      <Row>
        <Text style={style.title}>{t('Recent search')}</Text>
        <Text type="muted" style={style.delete}>
          {t('Delete all')}
        </Text>
      </Row>
      {recentSearch.map(renderItem)}
    </Animated.View>
  ) : null;
};

export default SuggestSearch;

const style = StyleSheet.create({
  container: {
    //
    paddingVertical: space.m,
    paddingHorizontal: space.m,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  delete: {},
  item: {
    marginTop: space.s,
  },
});
