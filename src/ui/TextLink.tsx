import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@rneui/themed';

const TextLink = ({
  children,
  onPress,
}: {
  children: any;
  onPress?: () => void;
}) => {
  const {theme} = useTheme();
  const colors = theme.colors;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {borderBottomColor: pressed ? colors.success : colors.primary},
        styles.underlineWrapper,
      ]}>
      {({pressed}) => (
        <Text
          style={[
            pressed ? {color: colors.success} : {color: colors.primary},
            styles.link,
          ]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  link: {
    marginBottom: 2,
  },
  underlineWrapper: {
    borderBottomWidth: 1,
    marginLeft: 4,
  },
});
