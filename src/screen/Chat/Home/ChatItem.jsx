import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar, Badge, Dot, Row, Text } from 'component';
import { avatarSize, fontSize, iconSize, space } from 'theme';
import { useTheme } from 'hook';
import moment from 'moment';
import { navigator } from 'service';
import { Route } from 'screen';

const ChatItem = ({ data }) => {
  const theme = useTheme();
  const { id, avatar, name, online, message, unseenCount } = data;

  const content = message?.content;
  const time = message?.time;
  const seen = message?.seen;

  const goChatDetail = () => {
    navigator.push(Route.ChatDetail, {
      id,
    });
  };

  return (
    <TouchableOpacity
      onPress={goChatDetail}
      activeOpacity={0.9}
      style={style.container}
    >
      <Row>
        <View style={style.avatarView}>
          <Avatar source={avatar} size="m" />
          {online ? (
            <Dot
              style={[style.dot, { borderColor: theme.background }]}
              color={theme.success}
            />
          ) : null}
        </View>
        <View style={style.info}>
          <Row>
            <Text style={style.name}>{name}</Text>
            <Text style={style.time} size="s" type="muted">
              {moment.unix(time).startOf('hour').fromNow()}
            </Text>
          </Row>
          <Row alignItems="flex-start" style={style.contentLine}>
            {content ? (
              <Text
                numberOfLines={1}
                type={seen ? 'muted' : 'normal'}
                fontWeight={seen ? '400' : '900'}
                style={style.content}
              >
                {content}
              </Text>
            ) : null}
            <Badge
              type="danger"
              style={[style.badge, { opacity: unseenCount ? 1 : 0 }]}
              textProps={{
                style: style.textBadge,
                numberOfLines: 1,
                adjustsFontSizeToFit: true,
              }}
            >
              {unseenCount >= 10 ? '9+' : unseenCount}
            </Badge>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default ChatItem;

export const CHAT_ITEM_HEIGHT = Math.round(avatarSize.m + space.s * 2);

const style = StyleSheet.create({
  container: {
    // paddingVertical: space.xs,
    height: CHAT_ITEM_HEIGHT,
    paddingHorizontal: space.m,
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: space.s,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    flex: 1,
  },
  time: {
    //
  },
  contentLine: {
    marginTop: space['3xs'],
  },
  content: {
    opacity: 0.9,
    flex: 1,
  },
  dot: {
    bottom: space['3xs'] / 2,
    right: space['3xs'] / 2,
    borderWidth: 1,
    borderColor: '#fff',
    //
  },
  badge: {
    height: iconSize.s,
    width: iconSize.s,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBadge: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: fontSize.s,
    // width:
  },
});
