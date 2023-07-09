import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import {Colors, useTheme} from '@rneui/themed';

type Props = {
  children: ReactNode;
  isSelected: boolean;
  onPress: (id: string) => void;
  id: string;
};

const CustomRadioButton = ({
  children,
  isSelected = false,
  onPress,
  id,
}: Props) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        onPress(id);
      }}>
      {isSelected ? (
        <View
          style={[
            styles.radioButtonIcon,
            {borderColor: colors.grey1, backgroundColor: colors.grey1},
          ]}>
          <View style={[styles.radioButtonIconInnerIcon]} />
        </View>
      ) : (
        <View style={[styles.radioButtonIcon]} />
      )}
      <View style={[styles.radioButtonTextContainer]}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    mainContainer: {
      marginBottom: 16,

      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioButtonIcon: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.grey4,
      height: 20,
      width: 20,
      borderRadius: 50,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioButtonIconInnerIcon: {
      height: 8,
      width: 8,
      backgroundColor: colors.success,
      borderRadius: 50,
      borderColor: colors.white,
    },
    radioButtonTextContainer: {
      flex: 5,

      justifyContent: 'center',
      paddingLeft: 0,
    },
    radioButtonText: {
      fontSize: 16,
      color: colors.black,
    },
  });
