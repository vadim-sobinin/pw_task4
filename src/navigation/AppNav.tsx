import React, {useContext, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import AuthStack from './AuthStack';
import Spinner from '../ui/Spinner';
import {MyDrawer} from './NewNavigation';

const AppNav = () => {
  // @ts-ignore
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <MyDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
