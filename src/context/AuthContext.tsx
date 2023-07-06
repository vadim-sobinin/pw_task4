import React, {ReactNode, createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginData, RegData, User} from '../@types/types';

export const AuthContext = createContext('');

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<null | string>(null);
  const [userInfo, setUserInfo] = useState<null | User>(null);

  const login = (data: LoginData) => {
    setIsLoading(true);
    console.log(data.userSignIn.token);
    setUserToken(data.userSignIn.token);
    AsyncStorage.setItem('userToken', data.userSignIn.token);
    setUserInfo(data.userSignIn.user);
    AsyncStorage.setItem('userInfo', JSON.stringify(data.userSignIn.user));
    setIsLoading(false);
  };

  const update = (data: User) => {
    setUserInfo(data);
    AsyncStorage.setItem('userInfo', JSON.stringify(data));
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const register = (data: RegData) => {
    setIsLoading(true);
    setUserToken(data.userSignUp.token);
    AsyncStorage.setItem('userToken', data.userSignUp.token);
    setUserInfo(data.userSignUp.user);
    AsyncStorage.setItem('userInfo', JSON.stringify(data.userSignUp.user));
    setIsLoading(false);
  };

  const delImage = () => {
    if (userInfo) {
      const newData = {...userInfo};
      newData.avatarUrl = null;
      setUserInfo(newData);
      AsyncStorage.setItem('userInfo', JSON.stringify(newData));
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      console.log(userToken);
      let userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const userInfoParced = await JSON.parse(userInfo);
        setUserInfo(userInfoParced);
      }
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
    // logout();
  }, []);

  return (
    // @ts-ignore
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        register,
        update,
        delImage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
