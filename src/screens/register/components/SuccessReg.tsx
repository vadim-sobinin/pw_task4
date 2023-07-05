import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Icon} from '@rneui/themed';
import ButtonComponent from '../../../ui/Button';

const SuccessReg = () => {
  return (
    <View style={styles.container}>
      <View style={styles.congrats}>
        <Text style={styles.congratsText}>CONGRATS</Text>
      </View>
      <View style={styles.textBlock}>
        <Icon name="checkmark-circle-outline" type="ionicon" color="#87B71F" />
        <Text style={styles.text}>You have been registered</Text>
      </View>

      <ButtonComponent>Continue</ButtonComponent>
    </View>
  );
};

export default SuccessReg;

const styles = StyleSheet.create({
  button: {},
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  congrats: {
    backgroundColor: '#87B71F',
    width: '98%',
    transform: [{rotate: '-3.22deg'}],
  },
  congratsText: {
    color: '#fff',
    fontSize: 55,
    fontFamily: 'Nokwy',
    lineHeight: 54,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  textBlock: {
    marginTop: 20,
    marginBottom: 52,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#131313',
    marginLeft: 6,
    fontSize: 16,
  },
});
