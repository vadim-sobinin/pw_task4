import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import {Control, FieldValues, UseFormWatch} from 'react-hook-form';
import CustomInput from '../../../ui/CustomInput';

type RegisterFormProps = {
  control: Control;
  watch: UseFormWatch<FieldValues>;
};

const RegisterForm = ({control, watch}: RegisterFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Join us</Text>
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

        <CustomInput
          control={control}
          placeholder="Confirm your password"
          name="confirmPassword"
          label="Confirm password"
          rules={{
            required: {value: true, message: 'Confirm password is required!'},
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
            },
          }}
          secureTextEntry={!confirmPasswordVisible}
          rightIcon={
            confirmPasswordVisible ? (
              <Icon
                name="eye-outline"
                type="ionicon"
                color="#9B9B9B"
                onPress={() => setConfirmPasswordVisible(false)}
              />
            ) : (
              <Icon
                name="eye-off-outline"
                type="ionicon"
                color="#9B9B9B"
                onPress={() => setConfirmPasswordVisible(true)}
              />
            )
          }
        />
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  label: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  input: {},
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
