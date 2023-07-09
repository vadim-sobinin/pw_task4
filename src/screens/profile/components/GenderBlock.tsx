import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomRadioButton from '../../../ui/CustomRadioButton';
import {Colors, useTheme} from '@rneui/themed';

const GenderBlock = ({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: string | null;
  setSelectedIndex: (id: string) => void;
}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  const onPressRadioButton = (id: string) => {
    setSelectedIndex(id);
  };
  return (
    <View style={styles.formBlock}>
      <Text style={styles.infoBlockTitle}>Gender</Text>
      <CustomRadioButton
        onPress={onPressRadioButton}
        id="MALE"
        isSelected={selectedIndex === 'MALE'}>
        Male
      </CustomRadioButton>
      <CustomRadioButton
        onPress={onPressRadioButton}
        id="FEMALE"
        isSelected={selectedIndex === 'FEMALE'}>
        Female
      </CustomRadioButton>
    </View>
  );
};

export default GenderBlock;

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
