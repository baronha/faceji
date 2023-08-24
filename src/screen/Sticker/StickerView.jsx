import { BottomSheetFlatList, BottomSheetFooter } from '@gorhom/bottom-sheet';
import { STICKER_LIST, STICKER_PACK } from 'common';
import {
  Button,
  ButtonIcon,
  Image,
  List,
  Row,
  StickerItem,
  StickerSheet,
  Text,
} from 'component';
import { closeModal, openModal, useSafeArea, useTheme } from 'hook';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { iconSize, space } from 'theme';
import { useTranslation } from 'react-i18next';
import { ShareIos } from 'iconoir-react-native';

const RECENT = 'RECENT';
const RECENT_STICKER = {
  id: RECENT,
  name: 'Recent',
  subTitle: 'Nhãn dán thường dùng',
};

const StickerView = ({ title, subTitle, index }) => {
  const sheetRef = useRef();
  const color = useTheme();
  const { t } = useTranslation(['common']);
  const { paddingBottom } = useSafeArea();
  const [pack, setPack] = useState([]);

  const stickers = STICKER_LIST.find(
    (_, stickerIndex) => stickerIndex === index,
  );

  useEffect(() => {
    setPack([RECENT_STICKER, ...STICKER_PACK]);
  }, []);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const onClose = () => {
    closeModal('Portal');
  };

  const onShowSticker = item => {
    openModal('Portal', {
      children: (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={style.stickerOverlay}>
            <Image source={item} style={style.stickerDetail} />
          </View>
        </TouchableWithoutFeedback>
      ),
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <StickerItem
        style={style.stickerItem}
        source={item}
        index={index}
        row={4}
        onPress={() => onShowSticker(item)}
      />
    );
  };

  return (
    <StickerSheet
      ref={sheetRef}
      enablePanDownToClose
      enableHandlePanningGesture
      index={1}
      footerComponent={
        <Row style={style.bottom}>
          <ButtonIcon style={style.shareButton}>
            <ShareIos color={color.background} />
          </ButtonIcon>
          <Button style={style.button}>{t('Add')}</Button>
        </Row>
      }
      onClose={onClose}
      title={title}
      subTitle={subTitle}
    >
      <List
        Element={BottomSheetFlatList}
        data={stickers}
        renderItem={renderItem}
        numColumns={4}
        style={style.list}
        contentContainerStyle={style.listStyle}
      />
    </StickerSheet>
  );
};

const style = StyleSheet.create({
  bottom: {
    padding: space.m,
  },
  list: {
    flex: 1,
  },
  stickerItem: {
    flex: 1 / 4,
    marginBottom: space.s,
  },
  listStyle: {
    padding: space.m,
  },
  button: {
    flex: 1,
  },
  shareButton: {
    marginRight: space.s,
  },
  stickerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickerDetail: {
    width: space.half_width,
    aspectRatio: 1 / 1,
  },
});

export default StickerView;
