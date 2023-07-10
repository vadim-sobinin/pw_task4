import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '@rneui/base';
import {useTheme} from '@rneui/themed';

const NoFavorites = ({children}: {children: any}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);
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

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
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
      backgroundColor: colors.primary,
      transform: [{rotate: '-3.22deg'}],
      color: colors.white,
      marginBottom: 24,
    },
    text: {
      fontSize: 16,
      width: 210,
      textAlign: 'center',
      lineHeight: 20,
      color: colors.black,
    },
  });
