import React from 'react';
import { AnimatedList, Container, Layout, List, Text } from 'component';
import { View, StyleSheet } from 'react-native';
import { STICKER_PACK } from 'common';
import { space } from 'theme';

const Setting = () => {
  // const ListHeaderComponent = () => {
  //   return (
  //     <Layout style={style.header}>
  //       <Text style={style.tite}>kaka</Text>
  //     </Layout>
  //   );
  // };

  const renderItem = ({ item, index }) => {
    return <View />;
  };

  return (
    <Container level="300">
      <List
        // ListHeaderComponent={ListHeaderComponent}
        data={STICKER_PACK}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Setting;

const style = StyleSheet.create({
  container: {
    //
  },
  header: {
    padding: space.m,
    borderRadius: space.s,
    marginHorizontal: space.m,
    marginTop: space.m,
  },
  label: {},
});
