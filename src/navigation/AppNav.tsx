import React, {useContext, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import AuthStack from './AuthStack';
import Spinner from '../ui/Spinner';
import {MyDrawer} from './NewNavigation';
import DarkTheme from '../themes/DarkTheme';
import DefaultTheme from '../themes/DefaultTheme';
import {ThemeContext} from '../context/ThemeContext';

const AppNav = () => {
  // @ts-ignore
  const {isLoading, userToken} = useContext(AuthContext);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const themeContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
    };
  }, [isDarkTheme]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <ThemeContext.Provider value={themeContext}>
        {userToken !== null ? <MyDrawer /> : <AuthStack />}
      </ThemeContext.Provider>
    </NavigationContainer>
  );
};

export default AppNav;
