import { StyleSheet, type ViewProps } from 'react-native';
import { Layout, Row } from './Layout';
import { fontSize, space } from 'theme';
import { Text } from './Text';
import type { StackHeaderProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useSafeArea } from 'hook';

export interface MainNavigationBarProps extends ViewProps, StackHeaderProps {
  title?: string;
}

export const MainNavigationBar = (props: MainNavigationBarProps) => {
  const { title } = props;

  const { t } = useTranslation<any>('common');
  const { paddingTop } = useSafeArea();

  return (
    <Layout style={[style.container, { paddingTop }]}>
      <Row>
        <Text numberOfLines={1} style={style.title}>
          {t(title)}
        </Text>
      </Row>
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
  title: {
    fontWeight: '900',
    fontSize: fontSize['2xl'],
    flex: 1,
    paddingRight: space.m,
  },
  settingButton: {
    marginLeft: space.s,
  },
});
