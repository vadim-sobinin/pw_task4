import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Controller, RegisterOptions} from 'react-hook-form';
import {Input} from '@rneui/themed';
import {IconNode} from '@rneui/base';

type inputProps = {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label: string;
  rightIcon?: IconNode;
};

const CustomInput = ({
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  label,
  rightIcon,
}: inputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange}, fieldState: {error}}) => (
        <>
          <Input
            placeholder={placeholder}
            placeholderTextColor={error ? '#C2534C' : '#9B9B9B'}
            multiline={multiline}
            inputStyle={{
              color: error ? '#C2534C' : '#131313',
              fontSize: 16,
            }}
            inputContainerStyle={{
              borderBottomWidth: 1.5,
              borderColor: error ? '#C2534C' : value ? '#131313' : '#9B9B9B',
              marginLeft: -10,
              marginRight: -10,
            }}
            onChangeText={onChange}
            value={value}
            label={label}
            labelStyle={{
              color: error ? '#C2534C' : '#9B9B9B',
              fontSize: 14,
              marginLeft: -10,
            }}
            secureTextEntry={secureTextEntry}
            rightIcon={rightIcon}
          />

          {error && <Text style={styles.text}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  text: {
    color: '#C2534C',

    marginTop: -20,
    marginBottom: 15,
  },
});
