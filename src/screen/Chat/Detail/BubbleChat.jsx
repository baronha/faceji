import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar, Row, Text } from 'component';
import { avatarSize, space } from 'theme';
import { useTheme, useToggle } from 'hook';
import moment from 'moment';
import { onLayoutAnimated } from 'service';
import Grid from '@baronha/react-native-image-grid';
import { env } from 'common';

const BubbleChat = ({ data, prevSender, me, listRef }) => {
  // const theme = useTheme();
  const sender = data?.sender;
  const senderId = sender?.id;
  const showAvatar = !me && senderId && senderId !== prevSender?.id;
  const media = data?.media;
  const content = data?.content;
  const seen = me && data?.isSeen;
  const time = data?.time;
  const [showTime, toggleShowTime] = useToggle(false);

  const { backgroundColor, containerStyle, marginLeft, textColor } =
    useBubbleStyle(me);

  const onPress = () => {
    toggleShowTime();
    // onLayoutAnimated(listRef);
  };

  const openImage = (item, index) => {};

  return (
    <View style={style.container}>
      <Row style={{ justifyContent: me ? 'flex-end' : 'flex-start' }}>
        {showAvatar ? (
          <Avatar source={sender?.avatar} style={style.avatar} />
        ) : null}

        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={[
            style.bubble,
            { backgroundColor, marginLeft },
            containerStyle,
          ]}
        >
          {media ? (
            <Grid
              dataImage={media}
              width={MAX_WIDTH}
              sourceKey={'url'}
              videoKey={'type'}
              conditionCheckVideo={'video'}
              videoURLKey={'url'}
              containerStyle={style.imageGrid}
              ratioOneImageLandscape={1.5}
              prefixPath={env.IS_ANDROID ? 'file://' : ''}
              onPressImage={openImage}
              // emptyImageSource={images.emptyImage}
            />
          ) : null}
          {content ? (
            <Text style={[style.content, { color: textColor }]}>{content}</Text>
          ) : null}
        </TouchableOpacity>
      </Row>
      {showTime && time ? (
        <Text
          style={[
            style.time,
            {
              textAlign: me ? 'right' : 'left',
              marginLeft,
            },
          ]}
          size="s"
          type="muted"
        >
          {moment.unix(time).startOf('hour').fromNow()}
        </Text>
      ) : null}
    </View>
  );
};

export default BubbleChat;

const useBubbleStyle = me => {
  const {
    primary,
    backgroundColor: backgroundColorTheme,
    text,
    buttonText,
  } = useTheme();
  let textColor = text;
  let backgroundColor = backgroundColorTheme[300];
  let marginLeft = 0;
  const containerStyle = {};

  if (me) {
    textColor = buttonText;
    backgroundColor = primary;
    containerStyle.borderBottomRightRadius = 0;
  } else {
    marginLeft = AVATAR_SIZE + space['3xs'] * 2;
    containerStyle.borderBottomLeftRadius = 0;
  }

  return {
    marginLeft,
    backgroundColor,
    containerStyle,
    textColor,
  };
};

const MAX_WIDTH = (space.width * 65) / 100;
const AVATAR_SIZE = avatarSize['2xs'];

const style = StyleSheet.create({
  container: {
    marginHorizontal: space.xs,
  },
  notMeBubble: {
    marginLeft: AVATAR_SIZE + space['3xs'] * 2,
  },
  bubble: {
    marginTop: space['2xs'],
    maxWidth: MAX_WIDTH,
    borderRadius: space.s,
    overflow: 'hidden',
  },
  content: {
    //
    paddingHorizontal: space.s,
    paddingVertical: space.xs,
    fontWeight: '500',
  },
  time: {
    marginTop: space['3xs'],
  },
  imageGrid: {},
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    position: 'absolute',
    // left: space['3xs'],
    bottom: 0,
  },
});
