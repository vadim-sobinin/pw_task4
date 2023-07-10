import React, {useContext, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import AuthStack from './AuthStack';
import Spinner from '../ui/Spinner';
import {MyDrawer} from './NewNavigation';
import {StatusBar} from 'react-native';
import {useTheme} from '@rneui/themed';

const AppNav = () => {
  // @ts-ignore
  const {isLoading, userToken} = useContext(AuthContext);
  const {theme} = useTheme();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={theme.mode === 'light' ? '#fff' : '#131313'}
        barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'}
      />
      {userToken !== null ? <MyDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
