import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';
import { Route } from 'screen';
import { navigator } from 'service';
import { NavigationBar } from 'component';

import TabNavigation from './TabNavigation';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export const ApplicationNavigator = () => {
  useFlipper(navigator.ref);

  return (
    <NavigationContainer ref={navigator.ref}>
      <Navigator screenOptions={{ header: () => null }}>
        <Screen
          name={Route.Main.name}
          options={{
            animation: 'fade',
            gestureEnabled: false,
            headerShown: false,
          }}
        >
          {() => <TabNavigation />}
        </Screen>

        <Group
          screenOptions={{
            header: props => <NavigationBar {...props} />,
          }}
        >
          <Screen {...Route.ChatSetting} />
          <Group
            screenOptions={{
              animation: 'slide_from_bottom',
            }}
          ></Group>
        </Group>

        <Group>
          <Screen {...Route.Setting} />
          <Screen {...Route.LanguagePicker} />
          <Screen {...Route.ChatDetail} />
          <Screen {...Route.Search} options={{ animation: 'none' }} />

          <Group
            screenOptions={{
              animation: 'slide_from_bottom',
            }}
          >
            <Screen {...Route.Invite} />
            <Screen {...Route.Sticker} />
          </Group>
        </Group>
      </Navigator>
    </NavigationContainer>
  );
};
