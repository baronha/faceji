import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import { useFlipper } from '@react-navigation/devtools';
import { Route } from 'screen';
import { navigator } from 'service';
import { NavigationBar } from 'component';
import Home from 'screen/Home';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export const ApplicationNavigator = () => {
  // useFlipper(navigator.ref);

  return (
    <NavigationContainer ref={navigator.ref}>
      <Navigator screenOptions={{ header: () => null }}>
        <Screen
          name={Route.Home}
          component={Home}
          options={{
            animation: 'fade',
            gestureEnabled: false,
            headerShown: false,
          }}
        />

        <Group
          screenOptions={{
            header: props => <NavigationBar {...props} />,
          }}
        />

        <Group
          screenOptions={{
            animation: 'slide_from_bottom',
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
