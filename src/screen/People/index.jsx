import React from 'react';
import {
  ButtonIcon,
  Container,
  Grow,
  Image,
  Input,
  Layout,
  List,
  MainNavigationBar,
  Row,
  Text,
} from 'component';
import { MasonryFlashList } from '@shopify/flash-list';
import { PEOPLE_DATA } from 'common';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { color, iconSize, space } from 'theme';
import { useTranslation } from 'react-i18next';
import { useSafeArea, useTheme } from 'hook';
import { AddUser, ArrowRight, Search } from 'iconoir-react-native';

import PeopleItem from './PeopleItem';
import { navigator } from 'service';
import { Route } from 'screen';

const People = () => {
  const { paddingBottom } = useSafeArea();
  const { t } = useTranslation('common');
  const { backgroundColor, primary, buttonText } = useTheme();

  const renderItem = ({ item, index }) => {
    return (
      <PeopleItem
        index={index}
        data={item}
        key={`people-${item?.id ?? index}`}
      />
    );
  };

  const ListHeaderComponent = () => {
    const onInvite = () => {
      navigator.navigate(Route.Invite);
    };
    return (
      <>
        <Layout
          style={[
            style.header,
            {
              borderBottomColor: backgroundColor[300],
            },
          ]}
        >
          <Input Icon={Search} placeholder={t('Search')} />
        </Layout>
        <TouchableOpacity
          onPress={onInvite}
          activeOpacity={0.9}
          style={style.invite}
        >
          <Row>
            <View style={[style.buttonInvite, { borderColor: primary }]}>
              <ButtonIcon disabled style={{ backgroundColor: primary }}>
                <AddUser
                  color={buttonText}
                  width={iconSize.s}
                  height={iconSize.s}
                />
              </ButtonIcon>
            </View>
            <Grow style={style.grow}>
              <Text fontWeight="bold">{t('Invite friend')}</Text>
              <Text size="s" type="muted" style={style.inviteSub}>
                {t('Invite by QR Code or share link')}
              </Text>
            </Grow>
            <ArrowRight />
          </Row>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Container>
      <MainNavigationBar title={t('People')} />
      <List
        ListHeaderComponent={ListHeaderComponent}
        data={PEOPLE_DATA}
        renderItem={renderItem}
        estimatedItemSize={200}
        itemKey="id"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom, paddingVertical: space.xs }}
      />
    </Container>
  );
};

export default People;

const style = StyleSheet.create({
  container: {
    //
  },
  item: {
    flex: 1 / 3,
    aspectRatio: 1 / 2,
    justifyContent: 'flex-end',
    padding: space.s,
    // marginHorizontal: space['3xs'],
  },
  avatar: {
    ...StyleSheet.absoluteFill,
  },
  name: {
    fontWeight: 'bold',
  },
  header: {
    paddingHorizontal: space.m,
    paddingBottom: space.s,
    borderBottomWidth: 1,
  },
  invite: {
    paddingHorizontal: space.m,
    paddingVertical: space.s,
  },
  grow: {
    paddingHorizontal: space.s,
  },
  inviteSub: {
    marginTop: space['3xs'],
  },
  buttonInvite: {
    borderWidth: 1,
    padding: 2,
    borderRadius: space.width,
  },
});
