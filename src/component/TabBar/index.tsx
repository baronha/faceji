import { StyleSheet, View } from 'react-native';
import React, { ReactNode, useCallback } from 'react';
import { Text, Row, Image } from 'component';
import {
  TabBar as RNTabbar,
  type TabBarProps as RNTabbarProps,
  type Route,
} from 'react-native-tab-view';
import { fontSize, iconSize, space } from 'theme';
import { useTheme } from 'hook';

interface TabBarProps extends RNTabbarProps<Route> {
  Icon?: ReactNode;
}

export const TabBar = (props: TabBarProps) => {
  const color = useTheme();
  //   const renderIcon = useCallback(({ Icon, iconType, itemColor, focused }) => {
  //     if (icon && !iconType) {
  //       return (
  //         <Icon
  //           name={icon}
  //           color={itemColor}
  //           variant={focused ? 'bold' : 'bulk'}
  //         />
  //       );
  //     }

  //     if (icon && iconType === ICON_TYPE.IMAGE) {
  //       return <Image source={{ uri: icon }} style={style.imageIcon} />;
  //     }
  //   }, []);

  const renderLabel: any = useCallback(
    ({ route: { title, icon, iconType }, focused }) => {
      const itemColor = focused ? color.background : color.gray;
      const rowColor = focused ? color.text : color.transparent;
      return (
        <Row
          style={[
            style.labelRow,
            {
              backgroundColor: rowColor,
            },
          ]}
        >
          {/* {renderIcon({ title, icon, iconType, focused })} */}
          {title ? (
            <Text
              numberOfLines={1}
              style={[
                style.title,
                {
                  color: itemColor,
                },
              ]}
            >
              {title}
            </Text>
          ) : null}
        </Row>
      );
    },
    [],
  );

  return (
    <RNTabbar
      {...props}
      style={[
        style.container,
        {
          // justifyContent: 'center',
          backgroundColor: color.background,
        },
        props?.style,
      ]}
      // labelStyle={{ flex: 1 }}
      pressColor={color.transparent}
      contentContainerStyle={style.contentStyle}
      tabStyle={[style.tabStyle, props?.tabStyle]}
      renderIndicator={() => null}
      renderLabel={renderLabel}
    />
  );
};

const style = StyleSheet.create({
  container: {
    elevation: 0,
    shadowOpacity: 0,
  },
  contentStyle: {
    shadowOpacity: 0,
    flexDirector: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // paddingLeft: space.xs,
    fontSize: fontSize.m,
    fontWeight: '900',
  },
  labelRow: {
    padding: space['2xs'],
    paddingHorizontal: space.s,
    borderRadius: space.width,
  },
  tabStyle: {
    width: 'auto',
    padding: 0,
    marginHorizontal: space['2xs'],
  },
  indicatorStyle: {},
  imageIcon: {
    width: iconSize.s,
    aspectRatio: 1,
  },
});
