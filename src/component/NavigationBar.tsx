import { StyleSheet, View, type ViewProps } from 'react-native';
import { fontSize, space } from 'theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Xmark } from 'iconoir-react-native';
import {
  NativeStackNavigationOptions,
  type NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text } from 'component';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { ButtonIcon } from './ButtonIcon';
import { Layout, LayoutProps, Row } from './Layout';

interface Option extends NativeStackNavigationOptions {
  subTitle?: string;
  hideTitle?: boolean;
  level?: LayoutProps['level'];
}

export interface NavigationBarProps extends ViewProps, NativeStackHeaderProps {
  subTitle?: string;
  options: Option;
}

export const NavigationBar: FC<NavigationBarProps> = props => {
  const { route, options, navigation } = props;
  const subTitle = options?.subTitle;
  const isModal = options?.animation === 'slide_from_bottom';
  const hideTitle = options?.hideTitle;
  const level = options?.level;

  const { t } = useTranslation('common');

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Layout level={level} style={style.container}>
      <SafeAreaView edges={['top']}>
        <Row style={style.row}>
          <View style={style.item}>
            {isModal ? null : (
              <ButtonIcon onPress={onBack}>
                <ArrowLeft />
              </ButtonIcon>
            )}
          </View>
          <View style={style.titleView}>
            {hideTitle ? null : (
              <Text style={style.title} numberOfLines={1} adjustsFontSizeToFit>
                {t(route.name)}
              </Text>
            )}
            {subTitle ? (
              <Text type="muted" style={style.subTitle}>
                {subTitle}
              </Text>
            ) : null}
          </View>
          <View style={[style.item, { alignItems: 'flex-end' }]}>
            {isModal ? (
              <ButtonIcon onPress={onBack}>
                <Xmark />
              </ButtonIcon>
            ) : null}
          </View>
        </Row>
      </SafeAreaView>
    </Layout>
  );
};

const style = StyleSheet.create({
  container: {
    padding: space.m,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleView: {},
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: space['3xs'],
  },
});
