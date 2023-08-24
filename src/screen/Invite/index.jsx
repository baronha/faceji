import React, { useRef, useState } from 'react';
import {
  Avatar,
  ButtonIcon,
  Container,
  Grow,
  Input,
  Layout,
  Row,
  Text,
} from 'component';
import { useTranslation } from 'react-i18next';
import { color, space } from 'theme';
import {
  ArrowRightCircle,
  Cancel,
  ChatLines,
  ScanQrCode,
  Search as SearchIcon,
  ShareIos,
} from 'iconoir-react-native';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { navigator } from 'service';
import { useSafeArea, useTheme, useUser } from 'hook';
import QRCode from 'react-native-qrcode-svg';
import { env } from 'common';
import { Canvas, Rect, SweepGradient, vec } from '@shopify/react-native-skia';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const colors = [
  ['#FB5D84', '#FEB867', '#FD7A6F', '#FB5D84'],
  ['#caefd7', '#f5bfd7', '#abc9e9', '#caefd7'],
  ['#c9def4', '#f5ccd4', '#b8a4c9', '#c9def4'],
  ['#f86ca7', '#f4d444', '#f86ca7'],
  ['#aed1ef', '#f2dfc1', '#f0b9ef', '#aed1ef'],
  ['#f78770', '#ff607b', '#f78770'],
  ['#07c8f9', '#0d41e1', '#07c8f9'],
];

const getRandomColor = () => Math.floor(Math.random() * colors.length);

const Invite = () => {
  const { paddingTop } = useSafeArea();
  const sheetRef = useRef();
  const [userInfo] = useUser();
  const [index, setIndex] = useState(getRandomColor());
  const username = `@${userInfo?.username}`;
  const { t } = useTranslation('common');
  const { text, backgroundColor, background } = useTheme();
  const avatar = userInfo?.avatar;
  const name = userInfo?.name;

  const url = `${env.WEB_URL}${username}`;

  const onShare = () => {
    //
  };

  const onCopy = () => {
    //
  };

  const toggleColor = () => {
    setIndex(getRandomColor());
  };

  return (
    <Container style={style.container}>
      <TouchableWithoutFeedback onPress={toggleColor}>
        <View style={style.canvas}>
          <Canvas style={style.canvas}>
            <Rect x={0} y={0} width={space.width} height={space.height}>
              <SweepGradient
                c={vec(space.half_width, space.width)}
                colors={colors[index]}
              />
            </Rect>
          </Canvas>
        </View>
      </TouchableWithoutFeedback>
      <Row
        style={[
          style.navigation,
          {
            paddingTop,
          },
        ]}
      >
        <TouchableOpacity style={style.toggleColor}></TouchableOpacity>
        <ButtonIcon style={style.buttonBack}>
          <Cancel color={color.black} />
        </ButtonIcon>
      </Row>
      <TouchableOpacity activeOpacity={1} onPress={onShare}>
        <Layout level="300" style={style.QRView}>
          <QRCode size={QR_SIZE} value={url} />
        </Layout>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose={false}
        enableHandlePanningGesture
        swipe
        index={1}
        handleComponent={() => (
          <View
            style={[style.knob, { backgroundColor: backgroundColor[300] }]}
          />
        )}
        backgroundStyle={[style.background, { backgroundColor: background }]}
        snapPoints={['30%', '40%', '80%']}
      >
        <BottomSheetScrollView style={style.scroll}>
          <Row style={style.userView}>
            <Avatar style={style.avatar} source={avatar} size="m" />
            <Grow style={style.grow}>
              <Text fontWeight="bold">{name}</Text>
              <Text onPress={onCopy} type="muted">
                {url}
              </Text>
            </Grow>
          </Row>
          <ButtonOption Icon={ShareIos}>{t('Share link')}</ButtonOption>
          <ButtonOption Icon={ChatLines}>{t('Via SMS')}</ButtonOption>
          <ButtonOption Icon={ScanQrCode}>{t('Scan QR Code')}</ButtonOption>
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
};

const ButtonOption = ({ Icon, children, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={style.button}>
        <Row>
          <Layout level="300" style={style.iconView}>
            <Icon />
          </Layout>
          <Text style={style.buttonTitle}>{children}</Text>
          <ArrowRightCircle />
        </Row>
      </View>
    </TouchableOpacity>
  );
};

export default Invite;

const QR_SIZE = space.width - space.m * 8;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: space.m,
  },
  navigation: {
    paddingBottom: space.l,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBack: {
    backgroundColor: color.white,
    borderWidth: 0,
  },
  QRView: {
    overflow: 'hidden',
    alignSelf: 'center',
    padding: space.m * 2,
    borderRadius: space.xl,
    backgroundColor: color.white,
    marginTop: space.s,
  },
  canvas: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
  },
  userView: {
    marginBottom: space.s,
  },
  grow: {
    paddingLeft: space.s,
  },
  button: {
    paddingVertical: space.s,
    borderRadius: space.width,
  },
  buttonTitle: {
    fontWeight: 'bold',
    flex: 1,
    paddingHorizontal: space.s,
  },
  knob: {
    height: space['2xs'],
    width: '15%',
    backgroundColor: color.backgroundColor[600],
    alignSelf: 'center',
    borderRadius: space.width,
    marginTop: space.m,
  },
  background: {
    borderRadius: space.xl,
  },
  scroll: {
    padding: space.m,
  },
  iconView: {
    padding: space['2xs'],
    borderRadius: space.xs,
  },
});
