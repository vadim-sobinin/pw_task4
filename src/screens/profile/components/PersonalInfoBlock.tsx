import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomInput from '../../../ui/CustomInput';
import {Control} from 'react-hook-form';
import {formInputsType} from '../ProfileScreen';
import {Colors, useTheme} from '@rneui/themed';

const PersonalInfoBlock = ({control}: {control: Control<formInputsType>}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  return (
    <View style={styles.formBlock}>
      <Text style={styles.infoBlockTitle}>Personal Info</Text>

      <CustomInput
        name={'firstName'}
        placeholder={'Enter your first name'}
        control={control}
        label="First name"
      />

      <CustomInput
        name={'lastName'}
        placeholder={'Enter your last name'}
        control={control}
        label="Last name"
      />

      <CustomInput
        name={'surname'}
        placeholder={'Enter your surname name'}
        control={control}
        label="Surname"
      />
    </View>
  );
};

export default PersonalInfoBlock;

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
