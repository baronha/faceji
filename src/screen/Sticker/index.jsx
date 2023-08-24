import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  AnimatedList,
  ButtonIcon,
  Container,
  Row,
  TabBar,
  Text,
} from 'component';
import { STICKER_PACK } from 'common';
import { SceneMap, TabView } from 'react-native-tab-view';
import { space } from 'theme';
import { useSafeArea, useTheme } from 'hook';
import { Cancel } from 'iconoir-react-native';

import TrendingTab from './TrendingTab';
import MineTab from './MineTab';

const routes = [
  {
    key: 'trending',
    title: 'Trending',
  },
  {
    key: 'mine',
    title: 'My Sticker',
  },
];

const renderScene = SceneMap({
  trending: TrendingTab,
  mine: MineTab,
});

const Sticker = () => {
  const { top } = useSafeArea();
  const { backgroundColor } = useTheme();
  const [data, setData] = [STICKER_PACK];
  const [index, setIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    return <View />;
  };

  const renderScreen = () => {
    //
  };

  return (
    <Container style={{ paddingTop: top }}>
      <TabView
        lazy
        renderTabBar={props => (
          <Row
            style={[style.tabContainer, { borderColor: backgroundColor[300] }]}
          >
            <TabBar {...props} style={style.tabbar} />
            <ButtonIcon style={style.close}>
              <Cancel />
            </ButtonIcon>
          </Row>
        )}
        onIndexChange={setIndex}
        renderScene={renderScene}
        navigationState={{ index, routes }}
      />
    </Container>
  );
};

export default Sticker;

const style = StyleSheet.create({
  container: {
    //
  },
  tabContainer: {
    borderBottomWidth: 1,
    position: 'relative',
    paddingVertical: space.m,
  },
  tabbar: {
    flex: 1,
    // backgroundColor: 'red',
  },
  close: {
    position: 'absolute',
    right: space.m,
    zIndex: 1,
  },
});
