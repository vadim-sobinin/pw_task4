import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';
import {useMutation} from '@apollo/client';
import {SING_UP} from '../../apollo/requests';
import {RegData} from '../../@types/types';
import {KeyboardShift} from '../../components/KeyboardShift';
import {useForm} from 'react-hook-form';
import {errorType} from '../login/components/LoginForm';
import {useTheme} from '@rneui/themed';

const RegisterScreen = ({navigation}: {navigation: any}) => {
  const {control, handleSubmit, setError, watch} = useForm();

  const {theme} = useTheme();
  const colors = theme.colors;

  const [signUp] = useMutation(SING_UP, {
    onCompleted(data: RegData) {
      if (data.userSignUp.problem) {
        setError('email', {
          type: 'custom',
          message: data.userSignUp.problem.message,
        });
      } else {
        navigation.navigate('SuccessReg', {data: data});
      }
    },
    onError(apolloError) {
      // @ts-ignore
      const errorsArr: errorType[] =
        apolloError.graphQLErrors[0].extensions.errors;
      console.log(errorsArr);
      errorsArr.forEach(field => {
        field.errors.forEach(error => {
          setError(field.field, {type: 'custom', message: error});
        });
      });
    },
  });

  const createUser = (data: any) => {
    const variables = {
      input: {
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
      },
    };

    signUp({
      variables: variables,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardShift>
        <View style={styles.container}>
          <RegisterForm control={control} watch={watch} />
          <Footer navigation={navigation} onPress={handleSubmit(createUser)} />
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
