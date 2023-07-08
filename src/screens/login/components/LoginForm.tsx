import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Icon} from '@rneui/themed';
import {AuthContext} from '../../../context/AuthContext';
import Footer from './Footer';
import {useMutation} from '@apollo/client';
import {SING_IN} from '../../../apollo/requests';
import {LoginData} from '../../../@types/types';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../ui/CustomInput';

type errorType = {
  errors: string[];
  field: string;
};

const LoginForm = ({navigation}: {navigation: any}) => {
  const {
    control,
    handleSubmit,
    setError,
    // formState: {errors},
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);

  // @ts-ignore
  const {login}: {login: (data: LoginData) => void} = useContext(AuthContext);

  const [loginReq] = useMutation(SING_IN, {
    onCompleted(data: LoginData) {
      if (data.userSignIn.problem) {
        setError('email', {
          type: 'custom',
          message: data.userSignIn.problem.message,
        });
        setError('password', {
          type: 'invalid',
          message: data.userSignIn.problem.message,
        });
      } else {
        login(data);
      }
    },
    onError(apolloError) {
      // @ts-ignore
      const errorsArr: errorType[] =
        apolloError.graphQLErrors[0].extensions.errors;
      errorsArr.forEach(field => {
        field.errors.forEach(error => {
          setError(field.field, {type: 'custom', message: error});
        });
      });
    },
  });

  const authUser = (data: any) => {
    const variables = {
      input: {
        email: data.email,
        password: data.password,
      },
    };
    loginReq({
      variables: variables,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>
            You will be able to fully communicate
          </Text>
        </View>
        <View style={styles.formBlock}>
          <CustomInput
            control={control}
            placeholder="Enter your email"
            name="email"
            label="E-mail"
            rules={{required: {value: true, message: 'E-mail is required!'}}}
          />

          <CustomInput
            control={control}
            placeholder="Enter your password"
            name="password"
            label="Password"
            rules={{required: {value: true, message: 'Password is required!'}}}
            secureTextEntry={!passwordVisible}
            rightIcon={
              passwordVisible ? (
                <Icon
                  name="eye-outline"
                  type="ionicon"
                  color="#9B9B9B"
                  onPress={() => setPasswordVisible(false)}
                />
              ) : (
                <Icon
                  name="eye-off-outline"
                  type="ionicon"
                  color="#9B9B9B"
                  onPress={() => setPasswordVisible(true)}
                />
              )
            }
          />
        </View>
      </View>

      <Footer
        navigation={navigation}
        disabled={false}
        onPress={handleSubmit(authUser)}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 100,
    display: 'flex',
    gap: 124,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',

    paddingBottom: 42,
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    flexGrow: 1,

    display: 'flex',
    justifyContent: 'flex-end',
  },
  titleBlock: {
    marginBottom: 40,
  },
  title: {
    color: '#87B71F',
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    color: '#131313',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 3,
  },
  formBlock: {
    marginBottom: 16,
  },
});
