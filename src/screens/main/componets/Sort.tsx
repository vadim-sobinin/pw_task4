import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { ButtonGroup } from '@rneui/themed';

const Sort = ({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) => {
  return (
    <ButtonGroup
      buttons={['New', 'Top']}
      selectedIndex={selectedIndex}
      onPress={(value) => {
        setSelectedIndex(value);
      }}
      containerStyle={styles.container}
      buttonContainerStyle={styles.buttonContainerStyle}
      buttonStyle={styles.button}
      selectedButtonStyle={styles.selectedButton}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: '#87B71F',
  },
  selectedText: {},
  text: {
    color: '#131313',
    fontSize: 18,
  },
  button: { backgroundColor: '#F4F5F4' },
  container: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 16,
    borderColor: 'rgba(158, 150, 150, 0)',
    height: 50,
  },
  buttonContainerStyle: {
    // paddingLeft: 10,
    // borderRadius: 16,
    // backgroundColor: '#ffff',
  },
});

export default Sort;
