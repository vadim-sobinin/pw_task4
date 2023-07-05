import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';

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
            {borderColor: '#DEDEDE', backgroundColor: '#DEDEDE'},
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

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 16,

    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonIcon: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#696969',
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
    backgroundColor: '#618909',
    borderRadius: 50,
    borderColor: 'white',
  },
  radioButtonTextContainer: {
    flex: 5,

    justifyContent: 'center',
    paddingLeft: 0,
  },
  radioButtonText: {
    fontSize: 16,
    color: '#131313',
  },
});
