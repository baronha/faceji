import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { avatarSize, color, space } from 'theme';
import { Image, ImageProps } from 'component/Image';
import { Text } from 'component/Text';
import { Size } from 'common';

interface AvatarProps extends ImageProps {
  size: Size | number;
  Name?: string;
}

export const Avatar = (props: AvatarProps) => {
  const {
    source,
    size: sizeProp = 'm',
    variant,
    style: containerStyle,
    Name = '',
  } = props;

  const [isError, setError] = useState(!source);

  const size =
    typeof sizeProp === 'string'
      ? avatarSize?.[sizeProp] ?? avatarSize.m
      : sizeProp;

  const borderRadius = variant === 'square' ? space.m : size / 2;

  const onError = () => {
    setError(true);
  };

  const EmptyView = () => {
    const FinalName =
      typeof Name === 'string'
        ? Name.split(' ')
            .map(item => {
              return item.split('')[0];
            })
            .splice(0, 3)
            .join('')
        : '';

    const NameLength = Name?.length;
    const backgroundColor = color.gray;

    return (
      <View
        style={[
          style.container,
          style.avatarFake,
          {
            width: size,
            height: size,
            borderRadius,
          },
          containerStyle,
          { backgroundColor },
        ]}
      >
        <Text
          size="4xl"
          style={style.name}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {FinalName}
        </Text>
      </View>
    );
  };

  return isError ? (
    EmptyView()
  ) : (
    <Image
      onError={onError}
      source={source}
      borderRadius={borderRadius}
      resizeMode="cover"
      style={[
        style.container,
        {
          width: size,
          height: size,
          borderRadius,
        },
        containerStyle,
      ]}
    />
  );
};

Avatar.defaultProps = {
  size: 'xl',
  variant: 'circle',
  Name: 'Cat',
};

const style = StyleSheet.create({
  container: {
    backgroundColor: color.grayColor[400],
  },
  avatarFake: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space['2xs'],
  },
  name: {
    fontWeight: '900',
    color: color.background,
    textTransform: 'uppercase',
  },
});
