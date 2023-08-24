import { Layout, Row } from 'component';
import { openModal, useTheme } from 'hook';
import { Attachment, MediaImage } from 'iconoir-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { EmojiIcon, KeyboardIcon, SendIcon } from 'svg';
import { fontSize, iconSize, space } from 'theme';
import Animated, { ZoomIn } from 'react-native-reanimated';

import KeyboardView from './KeyboardView';
import StickerView from './StickerView';

const Bottom = ({ onSend }) => {
  const theme = useTheme();
  const inputRef = useRef();
  const { t } = useTranslation('common');
  const [value, setValue] = useState('');

  const isEmpty = !value || value?.trim?.() === '';

  useEffect(() => {
    //
  }, []);

  const onStickerClose = () => {
    // inputRef?.current?.focus?.();
  };

  const onPress = () => {
    if (isEmpty) {
      openModal('Portal', {
        children: <StickerView key={'stickerView'} onClose={onStickerClose} />,
      });
    } else {
      //
    }
  };

  const onFocus = () => {};

  return (
    <Layout style={style.container}>
      <Row
        alignItems="flex-end"
        style={[
          style.inputView,
          {
            backgroundColor: theme.backgroundColor[300],
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          ref={inputRef}
          selectionColor={theme.primaryColor[600]}
          placeholderTextColor={theme.muted}
          accessibilityHint={theme.primary}
          style={[style.input, { color: theme.text }]}
          onFocus={onFocus}
          multiline
          placeholder={t('Type a Message...')}
        />
        <Row>
          {isEmpty ? (
            <Animated.View entering={ZoomIn} style={style.tool}>
              <TouchableOpacity style={style.toolItem}>
                <Attachment />
              </TouchableOpacity>
              <TouchableOpacity style={style.toolItem}>
                <MediaImage />
              </TouchableOpacity>
            </Animated.View>
          ) : null}
          <TouchableOpacity
            onPress={onPress}
            style={[style.buttonSend, { backgroundColor: theme.primary }]}
          >
            {isEmpty ? (
              <CTAButton Icon={EmojiIcon} iconKey={'emoji'} />
            ) : (
              <CTAButton Icon={SendIcon} iconKey={'send'} />
            )}
          </TouchableOpacity>
        </Row>
      </Row>
      <KeyboardView />
    </Layout>
  );
};

export const CTAButton = ({ Icon, iconKey }) => {
  return (
    <Animated.View key={iconKey} entering={ZoomIn}>
      <Icon
        style={style.sendIcon}
        width={SEND_ICON_SIZE}
        height={SEND_ICON_SIZE}
      />
    </Animated.View>
  );
};

export default Bottom;

const SEND_ICON_SIZE = iconSize.s;
const BUTTON_SIZE = Math.round(SEND_ICON_SIZE + space['2xs'] * 4);

const style = StyleSheet.create({
  container: {
    padding: space.m,
    // position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  inputView: {
    borderRadius: space.xl,
    overflow: 'hidden',
    // paddingHorizontal: space.s,
  },
  input: {
    maxHeight: space.width / 2,
    flex: 1,
    fontWeight: '600',
    fontSize: fontSize.m,
    fontFamily: 'Manrope',
    flexShrink: 1,
    height: '100%',
    alignSelf: 'center',
    // backgroundColor: 'red',
    // paddingVertical: 0,
    paddingTop: BUTTON_SIZE / 3,
    paddingBottom: space.s,
    // paddingTop: space.s,
    paddingHorizontal: space.s,
  },
  buttonSend: {
    marginRight: space['2xs'],
    marginVertical: space['2xs'],
    borderRadius: space.width,
    padding: space['2xs'],
  },
  sendIcon: {
    color: '#000',
  },
  tool: {
    height: BUTTON_SIZE,
    flexDirection: 'row',
  },
  toolItem: {
    // backgroundColor: 'red',
    height: '100%',
    flexShrink: 1,
    justifyContent: 'center',
    paddingRight: space.s,
  },
});
