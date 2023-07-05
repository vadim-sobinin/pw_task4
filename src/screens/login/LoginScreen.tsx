import {SafeAreaView} from 'react-native';
import React from 'react';
import LoginForm from './components/LoginForm';

import {KeyboardShift} from '../../components/KeyboardShift';

const LoginScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardShift>
        <LoginForm navigation={navigation} />
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default LoginScreen;
