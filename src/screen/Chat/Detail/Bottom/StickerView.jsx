import { BottomSheetFlatList, BottomSheetFooter } from '@gorhom/bottom-sheet';
import { STICKER_LIST, STICKER_PACK } from 'common';
import { Image, List, Row, StickerItem, StickerSheet, Text } from 'component';
import { closeModal, useSafeArea, useTheme } from 'hook';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { iconSize, space } from 'theme';
import { TabView } from 'react-native-tab-view';
import { AddCircle, Clock } from 'iconoir-react-native';
import { navigator } from 'service';
import { Route } from 'screen';

const RECENT = 'RECENT';
const RECENT_STICKER = {
  id: RECENT,
  name: 'Recent',
  subTitle: 'Recent',
};

const StickerView = ({ onClose: onCallbackClose }) => {
  const sheetRef = useRef();
  const color = useTheme();
  const [index, setIndex] = useState(0);
  const [pack, setPack] = useState([]);
  const [stickers, setStickers] = useState([]);
  const packSelected = pack[index];

  useEffect(() => {
    setPack([RECENT_STICKER, ...STICKER_PACK]);
  }, []);

  // console.log('pack: ', pack);

  const routes = useMemo(() => {
    const array = [];
    for (let i = 0; i < pack.length; i++) {
      const { name, id } = pack[i];
      array.push({
        name,
        id,
        i,
      });
    }
    return array;
  }, [pack]);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const onClose = () => {
    closeModal('Portal');
    onCallbackClose?.();
  };

  const renderScene = scene => {
    const { route } = scene;
    const id = route?.id;

    if (routes?.length > 4 && Math.abs(index - routes.indexOf(route)) > 2) {
      return <View key={id} />;
    }

    return <ListScene key={id} {...scene} />;
  };

  return (
    <StickerSheet
      ref={sheetRef}
      enablePanDownToClose
      enableHandlePanningGesture
      index={0}
      footerComponent={
        <Tabbar
          onSelect={setIndex}
          indexActive={index}
          color={color}
          pack={pack}
        />
      }
      onClose={onClose}
      title={packSelected?.name ?? 'Sticker'}
      subTitle={
        packSelected?.subTitle ??
        `${
          packSelected?.quantity
            ? packSelected?.quantity + ' stickers'
            : '' ?? ''
        }`
      }
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        routes={routes}
        renderTabBar={() => null}
        lazy
        swipeEnabled={true}
      />
    </StickerSheet>
  );
};

const Tabbar = ({ color, indexActive, pack, onSelect, ...props }) => {
  const { bottom } = useSafeArea();

  const renderItem = (item, index) => {
    const { id } = item;
    const image = item?.image;

    const active = index === indexActive;

    return (
      <TouchableOpacity
        key={id}
        onPress={() => onSelect(index)}
        style={[
          style.tabbarItem,
          {
            backgroundColor: active
              ? color.background + '12'
              : color.transparent,
          },
        ]}
      >
        {id === RECENT ? (
          <Clock width="100%" height="100%" color={color.background} />
        ) : (
          <Image source={image} style={style.tabbarIcon} />
        )}
      </TouchableOpacity>
    );
  };

  const goSticker = () => {
    navigator.navigate(Route.Sticker);
    closeModal('Portal');
  };

  return (
    <Row style={style.footer}>
      {pack?.map?.(renderItem)}
      <TouchableOpacity onPress={goSticker} style={style.tabbarItem}>
        <AddCircle width="100%" height="100%" color={color.background} />
      </TouchableOpacity>
    </Row>
  );
};

const ListScene = ({ route }) => {
  const index = route?.i - 1;

  const stickers = STICKER_LIST?.find?.(
    (_, stickerIndex) => stickerIndex === index,
  );

  const renderItem = ({ item, index }) => {
    return (
      <StickerItem
        style={style.stickerItem}
        source={item}
        index={index}
        row={4}
        // onPress={() => onShowSticker(item)}
      />
    );
  };

  //
  return (
    <List
      Element={BottomSheetFlatList}
      data={stickers}
      renderItem={renderItem}
      numColumns={4}
      style={style.list}
      contentContainerStyle={style.listStyle}
    />
  );
};

const ITEM_SIZE = iconSize.m + space['2xs'] * 2;

const style = StyleSheet.create({
  footer: {
    paddingRight: space.s,
    paddingVertical: space.s,
  },
  tabbarItem: {
    padding: space['3xs'],
    borderRadius: space.xs,
    marginLeft: space.s,
    flex: 1 / 8,
  },
  tabbarIcon: {
    width: '100%',
    aspectRatio: 1,
  },
  list: {
    flex: 1,
  },
  stickerItem: {
    marginBottom: space.s,
  },
  listStyle: {
    padding: space.m,
  },
});

export default StickerView;
