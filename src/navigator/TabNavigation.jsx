import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { iconSize, space } from 'theme';
import { Avatar, MainNavigationBar, Row, Text } from 'component';
import { useUser, useTheme } from 'hook';
import { Route } from 'screen';
import { Emitter, Haptic, navigator } from 'service';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserIcon } from 'svg';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { USER_DATA } from 'common';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigation = ({ route }) => {
  return (
    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        header: () => null,
      }}
    >
      <Screen {...Route.Chat} />
      <Screen {...Route.Contact} />
      <Screen {...Route.Profile} />
    </Navigator>
  );
};

const BottomTabBar = ({ state, descriptors, navigation, ...props }) => {
  const { bottom: insetBottom } = useSafeAreaInsets();
  const paddingBottom = insetBottom + space.m;
  const color = useTheme();

  const IconTab = useCallback(({ route, isFocused }) => {
    switch (route.name) {
      case Route.Profile.name:
        return <ProfileIcon isFocused={isFocused} color={color} />;
      case Route.Chat.name:
        return (
          <Row
            style={[
              style.chatTab,
              {
                backgroundColor: isFocused ? color.primary : color.gray,
              },
            ]}
          >
            <Text style={style.chatTitle(color)}>Chat</Text>
          </Row>
        );
      default:
        return (
          <View
            style={[
              style.tab,
              {
                backgroundColor: isFocused ? color.primary : color.transparent,
                borderColor: isFocused
                  ? color.primaryColor[600]
                  : color.backgroundColor[600],
              },
            ]}
          >
            <UserIcon
              color={isFocused ? color.buttonText : color.gray}
              width={iconSize.m}
              height={iconSize.m}
            />
          </View>
        );
    }
  }, []);

  return (
    <View style={[style.container, { paddingBottom }]}>
      <Animated.View
        key={'tabbar_row'}
        entering={SlideInDown.duration(500)}
        style={[
          style.row,
          {
            backgroundColor: state.index === 2 ? color.white : color.text,
          },
        ]}
      >
        {state?.routes?.map?.((route, index) => {
          const { options } = descriptors[route.key];
          const tabBarIcon = options.tabBarIcon;
          const isFocused = state.index === index;
          const middleItem = index > 0 && index < state.routes.length - 1;

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          //
          const onPress = () => {
            Haptic();

            Emitter.emit('menu', false);

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigator.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <TouchableOpacity
              key={route.name}
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                style.tabItem(color),
                {
                  paddingHorizontal: middleItem ? space['2xs'] : 0,
                },
              ]}
            >
              {IconTab({ route, isFocused, tabBarIcon })}
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
};

const ProfileIcon = ({ isFocused, color }) => {
  const [user] = useUser();
  // const user = USER_DATA;

  return (
    <View
      style={[
        style.tab,
        {
          borderColor: isFocused ? color.primary : color.backgroundColor[600],
        },
      ]}
    >
      <Avatar size={TAB_ICON_SIZE - 2} source={user.avatar} />
    </View>
  );
};

export default TabNavigation;

const TAB_ICON_SIZE = iconSize['4xl'];

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: space.width,
    padding: space['3xs'],
    position: 'relative',
    alignSelf: 'center',
    flexDirection: 'row',
    // paddingTop: space.s,
  },
  tabItem: color => ({
    justifyContent: 'center',
    alignItems: 'center',
  }),

  chatTab: {
    paddingHorizontal: space.xl,
    // paddingVertical: space.xs,
    borderRadius: space.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
  },
  chatTitle: color => ({
    fontWeight: '900',
    color: color.buttonText,
    flexShrink: 1,
    // height: '100%',
  }),
  tab: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    borderRadius: space.width,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
