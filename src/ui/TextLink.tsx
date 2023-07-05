import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

const TextLink = ({
  children,
  onPress,
}: {
  children: any;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {borderBottomColor: pressed ? '#75C537' : '#B8DE64'},
        styles.underlineWrapper,
      ]}>
      {({pressed}) => (
        <Text
          style={[
            pressed ? {color: '#75C537'} : {color: '#B8DE64'},
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
