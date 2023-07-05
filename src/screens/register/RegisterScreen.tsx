import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';
import {useMutation} from '@apollo/client';
import {SING_UP} from '../../apollo/requests';
import {AuthContext} from '../../context/AuthContext';
import {RegData} from '../../@types/types';
import {KeyboardShift} from '../../components/KeyboardShift';

const RegisterScreen = ({navigation}: {navigation: any}) => {
  // @ts-ignore
  const {register} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  const [signUp] = useMutation(SING_UP, {
    onCompleted(data: RegData) {
      if (data.userSignUp.problem) {
        setError(data.userSignUp.problem.message);
      } else {
      }
      register(data);
    },
    onError(error) {
      console.log('error:', error.stack);
    },
  });

  const variables = {
    input: {
      email,
      password,
      passwordConfirm: confirmPassword,
    },
  };
  const createUser = () => {
    signUp({
      variables: variables,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardShift>
        <View style={styles.container}>
          <RegisterForm
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <Footer navigation={navigation} onPress={createUser} />
          {/* <SuccessReg /> */}
        </View>
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    display: 'flex',
    gap: 60,
    justifyContent: 'flex-end',
    paddingBottom: 42,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
