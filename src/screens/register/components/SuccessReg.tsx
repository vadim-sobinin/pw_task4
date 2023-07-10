import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors, Icon, useTheme} from '@rneui/themed';
import ButtonComponent from '../../../ui/Button';
import {User} from '../../../@types/types';
import {AuthContext} from '../../../context/AuthContext';

const SuccessReg = ({route}: {route: {params: {data: User}}}) => {
  // @ts-ignore
  const {register} = useContext(AuthContext);

  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.congrats}>
        <Text style={styles.congratsText}>CONGRATS</Text>
      </View>
      <View style={styles.textBlock}>
        <Icon
          name="checkmark-circle-outline"
          type="ionicon"
          color={colors.primary}
        />
        <Text style={styles.text}>You have been registered</Text>
      </View>

      <ButtonComponent onPress={() => register(route.params.data)}>
        Continue
      </ButtonComponent>
    </View>
  );
};

export default SuccessReg;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    button: {},
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: colors.white,
    },
    congrats: {
      backgroundColor: colors.primary,
      width: '98%',
      transform: [{rotate: '-3.22deg'}],
    },
    congratsText: {
      color: colors.white,
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
      color: colors.black,
      marginLeft: 6,
      fontSize: 16,
    },
  });
