import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar, Badge, Dot, Row, Text } from 'component';
import { avatarSize, fontSize, iconSize, space } from 'theme';
import { useTheme } from 'hook';
import moment from 'moment';
import { navigator } from 'service';
import { Route } from 'screen';
import { useTranslation } from 'react-i18next';

const PeopleItem = ({ data }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { id, avatar, name, online, last_seen } = data;

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
          <Avatar source={avatar} size="s" />
          {online ? (
            <Dot
              style={[style.dot, { borderColor: theme.background }]}
              color={theme.success}
            />
          ) : null}
        </View>
        <View style={style.info}>
          <Text style={style.name}>{name}</Text>
          <Text style={style.time} size="s" type="muted">
            {online
              ? t('online')
              : `${t('Last seen')} ${moment
                  .unix(last_seen)
                  .startOf('hour')
                  .fromNow()}`}
          </Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default PeopleItem;

export const PEOPLE_ITEM_HEIGHT = Math.round(avatarSize.s + space.xs * 2);

const style = StyleSheet.create({
  container: {
    // paddingVertical: space.xs,
    height: PEOPLE_ITEM_HEIGHT,
    paddingHorizontal: space.m,
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: space.s,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
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
    bottom: 0,
    right: 0,
    borderWidth: 1,
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
