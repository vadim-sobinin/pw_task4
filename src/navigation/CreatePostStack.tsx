import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyPosts from '../screens/main/componets/MyPosts';
import CreatePost from '../screens/main/componets/CreatePost';

const Stack = createNativeStackNavigator();

const CreatePostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MyPosts} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default CreatePostStack;
