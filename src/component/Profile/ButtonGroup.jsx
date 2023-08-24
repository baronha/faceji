import { StyleSheet } from 'react-native';
import React from 'react';
import { Row } from 'component/Layout';
import { Button } from 'component/Button';
import { color, iconSize, space } from 'theme';
import { ButtonIcon } from 'component/ButtonIcon';
import { ShareIos } from 'iconoir-react-native';
import { useTranslation } from 'react-i18next';

export const ButtonGroup = ({ mine }) => {
  const { t } = useTranslation('common');

  const onShare = () => {
    //
  };

  const onTapCTA = () => {
    if (mine) {
      // return navigator.push(Route)
    }
  };

  return (
    <Row style={style.container}>
      <Button style={style.cta} onPress={onTapCTA}>
        {t(mine ? 'Edit information' : 'Follow')}
      </Button>
      <ButtonIcon style={style.button} onPress={onShare}>
        <ShareIos color={color.black} width={iconSize.l} height={iconSize.l} />
      </ButtonIcon>
    </Row>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: space.m,
    // justifyContent: 'center',
  },
  cta: {
    flex: 1,
    marginRight: space.s,
    paddingHorizontal: space['2xl'],
  },
  button: {
    //
    borderWidth: 0,
    backgroundColor: color.white + '64',
    // padding: space.s,
    // height: '100%',
    // flexShrink: 1,
    // aspectRatio: 1,
  },
});
