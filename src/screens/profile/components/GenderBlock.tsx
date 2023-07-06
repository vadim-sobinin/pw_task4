import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomRadioButton from '../../../ui/CustomRadioButton';

const GenderBlock = ({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: string | null;
  setSelectedIndex: (id: string) => void;
}) => {
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

const styles = StyleSheet.create({
  infoBlockTitle: {
    color: '#131313',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },

  formBlock: {
    marginTop: 32,
  },
});
