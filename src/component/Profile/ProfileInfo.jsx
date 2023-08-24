import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'component/Text';
import { Avatar } from 'component/Avatar';
import { fontSize, space } from 'theme';
import { useTheme } from 'hook';
import { useTranslation } from 'react-i18next';
import { Image } from 'component/Image';
import LinearGradient from 'react-native-linear-gradient';
import { easeGradient } from 'react-native-easing-gradient';

import { ButtonGroup } from './ButtonGroup';

const { colors, locations } = easeGradient({
  colorStops: {
    0: {
      color: '#00000000',
    },
    1: {
      color: 'rgba(0,0,0,.75)',
    },
  },
});

export const ProfileInfo = ({ data, mine }) => {
  const { primary, backgroundColor } = useTheme();
  const { t } = useTranslation('common');
  const bio = data?.bio;
  const avatar = data?.avatar;

  const openAvatar = () => {
    //
  };

  const editBio = () => {
    //
  };

  return (
    <View style={style.container}>
      <Image source={avatar} style={style.image} />
      <LinearGradient
        colors={colors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={locations}
        style={StyleSheet.absoluteFill}
      />
      <View style={style.info}>
        <Text numberOfLines={1} style={style.userName}>
          @{data?.username}
        </Text>
        <Text numberOfLines={2} style={style.name}>
          {data?.name}
        </Text>
        <View style={style.bioView}>
          {bio ? (
            <Text numberOfLines={2} style={style.bio}>
              {bio}
            </Text>
          ) : null}
          {mine ? (
            <Text onPress={editBio} style={style.editBio}>
              {t('Edit Bio')}
            </Text>
          ) : null}
        </View>
        <ButtonGroup mine data={data} />
      </View>
      {/* <TouchableOpacity
        activeOpacity={1}
        onPress={openAvatar}
        style={[style.avatarView, { borderColor: primary }]}
      >
        <Avatar size="xl" source={avatar} style={style.avatar} />
      </TouchableOpacity>
    
      <ButtonGroup mine data={data} /> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',

    // padding: space.m,
    // paddingTop: 0,
  },
  image: {
    flex: 1,
  },
  avatarView: {
    borderWidth: 2,
    padding: 3,
    borderRadius: space.width,
    alignSelf: 'center',
    borderStyle: 'dashed',
  },
  avatar: {},
  info: {
    marginTop: space.s,
    position: 'absolute',
    bottom: 0,
    padding: space.m,
    //
  },
  name: {
    // textAlign: 'center',
    fontSize: fontSize['2xl'],
    fontWeight: '900',
    color: '#fff',
  },
  userName: {
    // textAlign: 'center',
    color: 'rgba(255,255,255,.7)',
    marginTop: space['3xs'],
  },
  bioView: {
    marginTop: space.s,
  },
  bio: {
    color: '#ffffff',
  },
  editBio: {
    fontWeight: 'bold',
    marginTop: space['3xs'],
    color: '#ffffff',
  },
});
