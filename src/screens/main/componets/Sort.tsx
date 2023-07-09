import {StyleSheet} from 'react-native';
import React from 'react';
import {ButtonGroup, Colors, useTheme} from '@rneui/themed';

const Sort = ({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);
  return (
    <ButtonGroup
      buttons={['New', 'Top']}
      selectedIndex={selectedIndex}
      onPress={value => {
        setSelectedIndex(value);
      }}
      containerStyle={styles.container}
      buttonContainerStyle={styles.buttonContainerStyle}
      buttonStyle={styles.button}
      selectedButtonStyle={styles.selectedButton}
      textStyle={styles.text}
      selectedTextStyle={styles.selectedText}
    />
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    selectedButton: {
      backgroundColor: colors.primary,
    },
    selectedText: {color: colors.white},
    text: {
      color: colors.black,
      fontSize: 18,
    },
    button: {backgroundColor: colors.grey0},
    container: {
      marginTop: 20,
      marginBottom: 20,
      marginRight: 16,
      marginLeft: 16,
      borderRadius: 16,
      borderColor: colors.grey0,
      height: 50,
    },
    buttonContainerStyle: {
      // paddingLeft: 10,
      // borderRadius: 16,
      // backgroundColor: '#ffff',
    },
  });

export default Sort;
