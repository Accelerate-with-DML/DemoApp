// Screens Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Feed from '../screens/Feed';
import Redirect from '../screens/Redirect';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Redirect" component={Redirect} />
    </Stack.Navigator>
  );
};

export default MainStack;
