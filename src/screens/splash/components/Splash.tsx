import {View, Alert, Text, StyleSheet} from 'react-native';
import React from 'react';
import ButtonComponent from '../../../ui/Button';
import TextLink from '../../../ui/TextLink';

const Splash = ({navigation}: {navigation: any}) => {
  const pressBtn = () => {
    Alert.alert('Hi');
  };
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Already have an account?</Text>
        <TextLink onPress={() => navigation.navigate('Login')}>Log in</TextLink>
      </View>
      <ButtonComponent
        onPress={() => navigation.navigate('Register')}
        style={styles.button}>
        Create an account
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#303030',
    color: '#B8DE64',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Splash;
