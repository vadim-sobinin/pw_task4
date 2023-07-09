import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@rneui/themed';

const ButtonComponent = ({
  children,
  disabled = false,
  onPress,
  style,
}: {
  children: any;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? colors.success : colors.grey1,
        },
        styles.button,
        style,
      ]}>
      {({pressed}) => (
        <Text
          style={
            disabled
              ? [{color: colors.grey4}, styles.text]
              : [
                  pressed ? {color: colors.grey1} : {color: colors.primary},
                  styles.text,
                ]
          }>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 21,
    marginTop: 20,
    marginBottom: 50,
    marginRight: 16,
    marginLeft: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    padding: 18,
  },
});
