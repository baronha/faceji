import React, { Ref, forwardRef } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { Text } from 'component/Text';
import { useSafeArea, useTheme } from 'hook';
import { space } from 'theme';

export interface StickerSheetProps extends BottomSheetProps {
  title?: string;
  subTitle?: string;
}

export const StickerSheet = forwardRef(
  (props: StickerSheetProps, ref: Ref<any>) => {
    const { children, title, subTitle } = props;
    const footerComponent = props?.footerComponent;
    const color = useTheme();
    const { bottom } = useSafeArea();
    const backgroundColor = color.backgroundColor.reverse;

    const backdropComponent = React.useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.05}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    const renderFooter = (props: any) => {
      return footerComponent ? (
        <BottomSheetFooter
          {...props}
          bottomInset={bottom}
          style={{
            backgroundColor,
          }}
        >
          {footerComponent}
        </BottomSheetFooter>
      ) : null;
    };

    return (
      <BottomSheet
        ref={ref}
        backdropComponent={backdropComponent}
        enablePanDownToClose
        enableHandlePanningGesture
        index={0}
        {...props}
        footerComponent={renderFooter}
        handleComponent={() => (
          <>
            <View style={style.knob(color)} />
            <View style={style.header}>
              <Text
                style={[
                  style.title,
                  {
                    color: color.background,
                  },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
                fontWeight="900"
                size="2xl"
              >
                {title}
              </Text>
              <Text style={style.subTitle(color)}>{subTitle}</Text>
            </View>
          </>
        )}
        backgroundStyle={[style.background, { backgroundColor }]}
        snapPoints={['45%', '80%']}
      >
        {children}
      </BottomSheet>
    );
  },
);

StickerSheet.displayName = 'StickerSheet';

const style = StyleSheet.create({
  background: {
    borderRadius: space.xl,
  },
  header: {
    alignItems: 'center',
    paddingBottom: space['2xs'],
  },
  subTitle: (color: any) => ({
    marginTop: space['2xs'],
    color: color?.background + '92',
  }),
  knob: (color: any) => ({
    height: space['2xs'],
    width: '15%',
    backgroundColor: color.backgroundColor[600],
    alignSelf: 'center',
    borderRadius: space.width,
    marginTop: space.m,
  }),
  title: {
    textAlign: 'center',
    marginTop: space.m,
  },
});
