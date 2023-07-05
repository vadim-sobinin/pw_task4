import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FullPost from '../screens/main/componets/FullPost';

import Main from '../screens/main/componets/Main';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="FullCard" component={FullPost} />
    </Stack.Navigator>
  );
};

export default MainStack;
