import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { space } from 'theme';
import { Text } from 'component/Text';
import { FullWindowOverlay } from 'react-native-screens';
import { env } from 'common';
import { useTheme } from 'hook';

const BottomSheet = ({ modal }) => {
  const { closeModal, getParam, addListener } = modal;
  const snapPoints = getParam('snapPoints');
  const props = getParam('props');
  const Content = getParam('content', <View />);
  const title = getParam('title');
  const textProps = getParam('textProps');
  const specialKnob = getParam('specialKnob', false);
  const callback = getParam('callback');
  const theme = useTheme();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  const bottomSheetProps =
    Array.isArray(snapPoints) && snapPoints.length
      ? { snapPoints }
      : {
          snapPoints: animatedSnapPoints,
          handleHeight: animatedHandleHeight,
          contentHeight: animatedContentHeight,
        };

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const backdropComponent = React.useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const handleClose = useCallback(closingAction => {
    console.log(`Modal by: ${closingAction.type} • ${closingAction.origin}`);
  }, []);

  // useEffect(() => {
  //   const listener = addListener('onClose', handleClose);
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);

  const onClose = () => {
    closeModal('BottomSheet', () => {
      callback?.();
    });
  };

  return (
    <WrapForIos>
      <View style={style.container}>
        <RNBottomSheet
          {...bottomSheetProps}
          backdropComponent={backdropComponent}
          enablePanDownToClose
          enableHandlePanningGesture
          backgroundStyle={[
            style.background(theme),
            specialKnob ? style.backdropSpecialKnob : {},
          ]}
          handleComponent={() =>
            props?.handleComponent?.() ?? (
              <>
                <View style={style.knob(theme)} />
                <View
                  style={[style.header, specialKnob ? style.specialKnob : {}]}
                >
                  {title ? (
                    <Text
                      style={style.title}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      fontWeight="900"
                      size="2xl"
                      {...textProps}
                    >
                      {title}
                    </Text>
                  ) : null}
                </View>
              </>
            )
          }
          onClose={onClose}
          {...props}
        >
          <BottomSheetView style={style.content} onLayout={handleContentLayout}>
            {Content}
          </BottomSheetView>
        </RNBottomSheet>
      </View>
    </WrapForIos>
  );
};

const WrapForIos = ({ children }) => {
  if (env.IS_IOS) {
    return (
      <FullWindowOverlay style={StyleSheet.absoluteFill}>
        {children}
      </FullWindowOverlay>
    );
  }

  return children;
};

export default BottomSheet;

const KNOB_HEIGHT = space.width / 9.6;

const style = StyleSheet.create({
  container: {
    height: space.height,
    width: space.width,
    //
  },
  content: {
    // backgroundColor: color.white,
    flex: 1,
  },
  header: {
    // paddingHorizontal: space.m,
    justifyContent: 'center',
    padding: space.m,
  },
  title: {
    // paddingHorizontal: space.m,
  },
  knob: color => ({
    height: space['2xs'],
    width: '15%',
    backgroundColor: color.backgroundColor[400],
    alignSelf: 'center',
    borderRadius: space.width,
    marginTop: space.m,
  }),
  specialKnob: {
    // marginTop: -KNOB_HEIGHT,
  },
  backdropSpecialKnob: {
    marginTop: KNOB_HEIGHT - 1,
    borderRadius: 0,
  },
  background: color => ({
    backgroundColor: color.background,
  }),
});
