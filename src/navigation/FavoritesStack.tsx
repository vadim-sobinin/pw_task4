import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FullPost from '../screens/main/componets/FullPost';

import Favorites from '../screens/main/componets/Favorites';

const Stack = createNativeStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Favorites} />
      <Stack.Screen name="FullCard" component={FullPost} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
