import React from 'react';
import {
  ButtonIcon,
  Container,
  Grow,
  ProfileInfo,
  Row,
  StatusBar,
  Text,
} from 'component';
import { USER_DATA } from 'common';
import { useSafeArea, useUser } from 'hook';
import { StyleSheet, View } from 'react-native';
import { Emitter } from 'service';
import { color, iconSize, space } from 'theme';
import { Menu as MenuIcon } from 'iconoir-react-native';

const Profile = () => {
  const { top, bottom } = useSafeArea();
  const paddingBottom = bottom + TABBAR_HEIGHT;
  const [user] = useUser();

  const goSetting = () => {
    Emitter.emit('menu', true);
  };

  return (
    <Container
      style={[style.container, { paddingTop: top || space.m, paddingBottom }]}
    >
      <StatusBar barStyle="light-content" />
      <View style={[style.content, {}]}>
        <ProfileInfo data={user} mine />
        <Row style={style.header}>
          <View />
          <ButtonIcon style={style.settingButton} onPress={goSetting}>
            <MenuIcon color={color.black} />
          </ButtonIcon>
        </Row>
      </View>
    </Container>
  );
};

export default Profile;

const TABBAR_HEIGHT = iconSize['4xl'] + space['3xs'] * 2 + space.m * 2;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  settingButton: {
    marginLeft: space.s,
    alignSelf: 'flex-end',
    backgroundColor: color.white + '64',
    borderWidth: 0,
  },
  header: {
    paddingHorizontal: space.m,
    justifyContent: 'space-between',
    position: 'absolute',
    right: 0,
    left: 0,
    top: space.m,
  },
  content: {
    backgroundColor: 'pink',
    marginHorizontal: space['2xs'],
    flex: 1,
    borderRadius: space['xl'],
    overflow: 'hidden',
  },
});
