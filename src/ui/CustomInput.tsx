import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Controller, RegisterOptions} from 'react-hook-form';
import {Input} from '@rneui/themed';

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
};

const CustomInput = ({
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  label,
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
          />

          {error && (
            <Text style={{color: '#C2534C'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#9B9B9B',
    fontSize: 14,
    marginLeft: -10,
  },
  // input: {
  //   color: '#131313',
  //   fontSize: 16,
  //   paddingBottom: 16,
  //   paddingTop: 12,
  //   borderBottomWidth: 1.5,
  //   borderStyle: 'solid',
  // },
});
