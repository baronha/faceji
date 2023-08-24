import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Input, Row, Text } from 'component';
import { useTranslation } from 'react-i18next';
import { space } from 'theme';
import { Search as SearchIcon } from 'iconoir-react-native';
import { navigator, storage } from 'service';
import { useSafeArea, useTheme } from 'hook';
import { STORAGE_KEY } from 'common';

const SearchBar = ({ keyword, setKeyword }) => {
  const { t } = useTranslation('common');
  const { backgroundColor } = useTheme();
  const { paddingTop } = useSafeArea();

  const goBack = () => {
    navigator.goBack();
  };

  const onSearch = () => {
    if (keyword.trim() !== '') {
      const recentStorage = storage.get(STORAGE_KEY.RECENT_SEARCH);
      const recent = Array.isArray(recentStorage) ? recentStorage : [];
      recent.unshift({
        keyword,
      });

      const uniqueSearch = [...new Set(recent.map(o => JSON.stringify(o)))].map(
        s => JSON.parse(s),
      );

      if (uniqueSearch.length > 5) uniqueSearch.length = 5; // set length = 5 for recent
      storage.set(STORAGE_KEY.RECENT_SEARCH, uniqueSearch);
    }
  };

  return (
    <Row
      style={[
        style.header,
        {
          paddingTop,
          borderBottomColor: backgroundColor[300],
        },
      ]}
    >
      <Input
        showClear
        autoFocus
        value={keyword}
        onChangeText={setKeyword}
        style={style.input}
        Icon={SearchIcon}
        placeholder={t('Search')}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={goBack}>
        <Text fontWeight="600">{t('Cancel')}</Text>
      </TouchableOpacity>
    </Row>
  );
};

export default SearchBar;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    marginRight: space.m,
  },
  header: {
    padding: space.m,
    borderBottomWidth: 1,
  },
});
