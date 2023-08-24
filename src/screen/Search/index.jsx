import React, { useState } from 'react';
import { Container } from 'component';
import { useTranslation } from 'react-i18next';
import { space } from 'theme';
import { ScrollView, StyleSheet } from 'react-native';
import { navigator } from 'service';
import { useSafeArea } from 'hook';

import SearchBar from './SearchBar';
import SuggestSearch from './SuggestSearch';

//TODO: Search Result

const Search = () => {
  const { t } = useTranslation('common');
  const { paddingTop } = useSafeArea();
  const [keyword, setKeyword] = useState('');

  const isEmpty = keyword?.trim() !== '';

  const goBack = () => {
    navigator.goBack();
  };

  const onSearch = () => {};

  return (
    <Container>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      {!isEmpty ? (
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        >
          <SuggestSearch setKeyword={setKeyword} />
        </ScrollView>
      ) : null}
    </Container>
  );
};

export default Search;

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
  },
});
