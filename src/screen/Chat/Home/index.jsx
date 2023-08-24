import React, { useRef, useState } from 'react';
import { Container, Input, List, MainNavigationBar, Text } from 'component';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { color, space } from 'theme';
import { Search } from 'iconoir-react-native';
import { useTranslation } from 'react-i18next';
import { navigator } from 'service';
import { Route } from 'screen';
import { CHAT_MOCKUP } from 'common';
import { useSafeArea } from 'hook';

import ChatItem, { CHAT_ITEM_HEIGHT } from './ChatItem';

const Chat = () => {
  const listRef = useRef();
  const { t } = useTranslation('common');

  const { paddingBottom } = useSafeArea();

  const goSearch = () => {
    navigator.push(Route.Search);
  };

  const renderItem = ({ item }) => {
    return <ChatItem data={item} />;
  };

  return (
    <Container style={style.container}>
      <MainNavigationBar title="Chat" />
      <List
        ref={listRef}
        estimatedItemSize={CHAT_ITEM_HEIGHT}
        itemHeight={CHAT_ITEM_HEIGHT}
        ListHeaderComponent={
          <TouchableOpacity
            style={style.input}
            activeOpacity={1}
            onPress={goSearch}
          >
            <Input editable={false} Icon={Search} placeholder={t('Search')} />
          </TouchableOpacity>
        }
        data={CHAT_MOCKUP}
        contentContainerStyle={{ paddingBottom }}
        renderItem={renderItem}
        itemKey="id"
        style={{ flex: 1 }}
      />
    </Container>
  );
};

export default Chat;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: space.m,
    marginBottom: space.s,
  },
});
