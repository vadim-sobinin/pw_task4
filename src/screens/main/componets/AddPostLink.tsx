import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Icon, useTheme} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const AddPostLink = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const colors = theme.colors;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CreatePost');
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? colors.success : colors.primary,
        },
        styles.body,
      ]}>
      <Icon name="add-outline" type="ionicon" color={colors.white} size={24} />
    </Pressable>
  );
};

export default AddPostLink;

const styles = StyleSheet.create({
  body: {
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 32,
    right: 16,
  },
});
