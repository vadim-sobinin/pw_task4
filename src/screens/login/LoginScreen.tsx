import {SafeAreaView} from 'react-native';
import React from 'react';
import LoginForm from './components/LoginForm';

import {KeyboardShift} from '../../components/KeyboardShift';
import {useTheme} from '@rneui/themed';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useTheme();
  const colors = theme.colors;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardShift>
        <LoginForm navigation={navigation} />
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default LoginScreen;
