import React, { useRef, useState } from 'react';
import { Container, List } from 'component';
import { CHAT_DATA } from 'common';
import { useUser } from 'hook';
import { StyleSheet } from 'react-native';
import { space } from 'theme';

import HeaderChat from './Header';
import Bottom from './Bottom';
import BubbleChat from './BubbleChat';

const ChatDetail = ({ route }) => {
  const { id } = route;
  const listRef = useRef();
  const [userInfo] = useUser();
  const [data, setData] = useState(CHAT_DATA);

  const renderItem = ({ item, index }) => {
    const prevSender = data?.[index - 1]?.sender;
    const senderId = item?.sender?.id;
    const me = senderId && senderId === userInfo?.id;

    return (
      <BubbleChat
        listRef={listRef}
        data={item}
        me={me}
        prevSender={prevSender}
      />
    );
  };

  return (
    <Container>
      <HeaderChat />
      {/* <KeyboardGestureArea interpolator="ios"> */}
      <List
        data={data}
        renderItem={renderItem}
        contentContainerStyle={style.content}
        inverted
        itemHeight={space.width}
        estimatedItemSize={100}
      />

      <Bottom />
      {/* </KeyboardGestureArea> */}
    </Container>
  );
};

export default ChatDetail;

const style = StyleSheet.create({
  content: {
    paddingBottom: space.xl,
  },
});
