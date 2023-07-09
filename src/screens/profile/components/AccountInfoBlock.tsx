import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomInput from '../../../ui/CustomInput';

import {formInputsType} from '../ProfileScreen';
import {Control} from 'react-hook-form';
import {Colors, useTheme} from '@rneui/themed';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const PHONE_REGEX = /^\+\d+$/;

const AccountInfoBlock = ({control}: {control: Control<formInputsType>}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);
  return (
    <View style={styles.formBlock}>
      <Text style={styles.infoBlockTitle}>Account Info</Text>
      <CustomInput
        name={'email'}
        placeholder={'Enter your email'}
        control={control}
        rules={{
          required: 'Please, fill your email',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
        label="Email"
      />

      <CustomInput
        name={'phone'}
        placeholder={'Enter your phone number'}
        control={control}
        rules={{
          pattern: {
            value: PHONE_REGEX,
            message: 'Please enter your email in +7123456789 format',
          },
        }}
        label="Phone number"
      />

      <CustomInput
        name={'country'}
        placeholder={'Enter your country'}
        control={control}
        label="Country"
      />
    </View>
  );
};

export default AccountInfoBlock;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    infoBlockTitle: {
      color: colors.black,
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 16,
    },

    formBlock: {
      marginTop: 32,
    },
  });
