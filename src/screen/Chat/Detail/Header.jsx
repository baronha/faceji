import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar, Badge, ButtonIcon, Dot, Layout, Row, Text } from 'component';
import { color, fontSize, iconSize, space } from 'theme';
import { useSafeArea, useTheme } from 'hook';
import moment from 'moment';
import { navigator } from 'service';
import { Route } from 'screen';
import { ArrowLeft } from 'iconoir-react-native';

const HeaderChat = ({ data }) => {
  const theme = useTheme();
  const { top } = useSafeArea();

  const onBack = () => {
    navigator.goBack();
  };

  const goSetting = () => {
    navigator.navigate(Route.ChatSetting);
  };

  return (
    <Layout style={[style.container, { paddingTop: top + space.s }]}>
      <Row style={style.row}>
        <ButtonIcon onPress={onBack}>
          <ArrowLeft />
        </ButtonIcon>
        <TouchableOpacity
          activeOpacity={1}
          onPress={goSetting}
          style={style.infoView}
        >
          <Text numberOfLines={1} style={style.name}>
            Alex
          </Text>
          <Row alignItems="center">
            <Text size="s" fontWeight="500" style={style.statusText}>
              online
            </Text>
          </Row>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={style.avatarView}
          onPress={goSetting}
        >
          <Avatar
            style={style.avatar}
            source={
              'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80'
            }
          />
        </TouchableOpacity>
        {/* <Avatar /> */}
      </Row>
    </Layout>
  );
};

export default HeaderChat;

const AVATAR_SIZE = iconSize.s + space.xs * 2;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: space.m,
    paddingBottom: space.s,
    // position: 'absolute',
    // right: 0,
    // left: 0,
    // top: 0,
    // backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    // backgroundColor: '#ffffff92',
  },
  infoView: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: fontSize.l,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  statusText: {
    color: color.success,
  },
});
