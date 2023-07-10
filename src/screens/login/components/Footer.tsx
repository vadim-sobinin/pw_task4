import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import ButtonComponent from '../../../ui/Button';
import TextLink from '../../../ui/TextLink';
import {Colors, useTheme} from '@rneui/themed';

const Footer = ({
  navigation,
  disabled,
  onPress,
}: {
  navigation: any;
  disabled: boolean;
  onPress: () => void;
}) => {
  const {theme} = useTheme();
  const colors = theme.colors;
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>No account?</Text>
        <TextLink onPress={() => navigation.navigate('Register')}>
          Register
        </TextLink>
      </View>
      <ButtonComponent disabled={disabled} onPress={onPress}>
        Continue
      </ButtonComponent>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      flexShrink: 1,
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
      color: colors.black,
    },
  });

export default Footer;
