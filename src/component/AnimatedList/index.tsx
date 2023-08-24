import React, { FC, forwardRef } from 'react';
import {
  FlatListProps,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { fontSize, iconSize, space } from 'theme';
import { Container, Text } from 'component';
import { useSafeArea } from 'hook';

import { NavigationBar, type NavigationBarProps } from './NavigationBar';
import { List, ListProps } from 'component/List';
import { Ref } from 'react';
import { Cancel } from 'iconoir-react-native';

const AnimatedListView = Animated.createAnimatedComponent(List);
// const AnimatedScrollView = Animated.createAnimatedComponent(
//   KeyboardAwareScrollView,
// );

export interface AnimatedListProps
  extends Omit<ScrollViewProps, 'contentContainerStyle'>,
    ListProps,
    NavigationBarProps {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  TitleComponent?: FC;
  isModal?: boolean;
  subTitle?: string;
}

export const AnimatedList = forwardRef(
  (props: AnimatedListProps, ref: Ref<any>) => {
    const {
      title,
      children,
      containerStyle,
      contentStyle,
      titleStyle,
      isModal,
      subTitleStyle,
      TitleComponent,
      subTitle,
    } = props;
    const { paddingTop: TOP } = useSafeArea();
    const paddingTop = TOP + iconSize.s + space.m + space.s * 2;

    // if (isModal) {
    //   props.positionBack = 'right';
    //   props.BackIcon = Cancel
    // }

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: e => {
        scrollY.value = e.contentOffset.y;
      },
    });
    const Header = () => {
      return TitleComponent ? (
        <TitleComponent />
      ) : title ? (
        <View>
          <Text style={[style.title, titleStyle]}>{title}</Text>
          {subTitle ? (
            <Text type="muted" style={[style.subTitle, subTitleStyle]}>
              {subTitle}
            </Text>
          ) : null}
        </View>
      ) : null;
    };

    const ListHeaderComponent = () => {
      return (
        <>
          {Header()}
          {props?.ListHeaderComponent && props?.ListHeaderComponent}
        </>
      );
    };

    return (
      <Container style={[style.container, containerStyle]}>
        {children ? (
          <Animated.ScrollView
            keyboardShouldPersistTaps="handled"
            {...props}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            ref={ref}
            style={[style.contentStyle, contentStyle]}
            contentContainerStyle={[
              props.contentContainerStyle,
              { paddingTop },
            ]}
          >
            {Header()}
            {children}
          </Animated.ScrollView>
        ) : (
          <AnimatedListView
            {...props}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            style={[style.contentStyle, contentStyle]}
            contentContainerStyle={{
              paddingTop,
              paddingHorizontal: space.m,
              ...(props?.contentContainerStyle ?? {}),
            }}
            ListHeaderComponent={ListHeaderComponent}
            ref={ref}
          />
        )}
        <NavigationBar
          scrollY={scrollY}
          {...props}
          paddingTop={TOP}
          positionBack={isModal ? 'right' : props.positionBack}
          BackIcon={isModal && Cancel}
        />
      </Container>
    );
  },
);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontWeight: '900',
    fontSize: fontSize['3xl'],
    paddingBottom: space.m,
    paddingRight: space.m * 2,
    // paddingVertical: sizes.spaceMd,
  },
  subTitle: {
    marginTop: -space.m,
  },
  contentStyle: {
    paddingHorizontal: space.m,
  },
});
