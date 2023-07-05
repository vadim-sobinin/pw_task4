import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import { useFonts } from 'expo-font';
import Spinner from '../../../ui/Spinner';

const NoFavorites = ({children}: {children: any}) => {
  // const [fontsLoaded] = useFonts({
  //   Nokwy: require('../../../../assets/fonts/Nokwy.otf'),
  // });

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>UPS</Text>
      </View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default NoFavorites;

const styles = StyleSheet.create({
  container: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {},
  title: {
    fontSize: 55,
    fontFamily: 'Nokwy',
    paddingTop: 13,
    paddingRight: 20,
    paddingBottom: 13,
    paddingLeft: 20,
    backgroundColor: '#87B71F',
    transform: [{rotate: '-3.22deg'}],
    color: '#fff',
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    width: 210,
    textAlign: 'center',
    lineHeight: 20,
    color: '#131313',
  },
});
