import React, { FC, ReactNode, useCallback } from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { ButtonIcon, Text } from 'component';
import { color, fontSize, space } from 'theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'iconoir-react-native';
import { navigator } from 'service';

const AnimatedText = Animated.createAnimatedComponent(Text);

const POSITION = space['2xl'];

export interface NavigationBarProps {
  scrollY?: any;
  title?: string;
  opacity?: any;
  onBack?: ((event: GestureResponderEvent) => void) | undefined;
  positionBack?: 'left' | 'right';
  BackIcon: any;
  componentRight: ReactNode;
  navBackgroundColor: string;
  paddingTop?: number;
}

export const NavigationBar = (props: NavigationBarProps) => {
  const {
    scrollY,
    title,
    opacity: opacityProps,
    onBack = () => navigator.goBack(),
    positionBack = 'left',
    componentRight,
    BackIcon = ArrowLeft,
    navBackgroundColor = color.background,
    paddingTop,
  } = props;

  const renderBackButton = useCallback(() => {
    return (
      <ButtonIcon
        style={{
          alignSelf: positionBack === 'right' ? 'flex-end' : 'flex-start',
        }}
        onPress={onBack}
      >
        <BackIcon />
      </ButtonIcon>
    );
  }, [positionBack]);

  const animatedViewStyles = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(scrollY.value, [0, POSITION], [0, 0.2], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, POSITION],
      [navBackgroundColor, color.background],
    );

    return {
      shadowOpacity,
      backgroundColor,
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    const opacity =
      opacityProps ||
      interpolate(scrollY.value, [0, POSITION], [0, 1], {
        extrapolateRight: Extrapolation.CLAMP,
      });
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[style.container, animatedViewStyles, { paddingTop }]}
    >
      <View style={style.side}>
        {positionBack === 'left' ? renderBackButton() : null}
      </View>
      <View style={style.titleView}>
        <AnimatedText
          numberOfLines={1}
          style={[style.title, animatedTextStyles]}
        >
          {title}
        </AnimatedText>
      </View>
      <View style={style.side}>
        {componentRight
          ? componentRight
          : positionBack === 'right'
          ? renderBackButton()
          : null}
      </View>
    </Animated.View>
  );
};

export default NavigationBar;

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingVertical: space.s,
    paddingHorizontal: space.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleView: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: fontSize.xl,
    textAlign: 'center',
  },
  side: {
    flex: 1.5,
  },
});
