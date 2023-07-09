import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const AddPostLink = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CreatePost');
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#303030' : '#87B71F',
        },
        styles.body,
      ]}>
      <Icon name="add-outline" type="ionicon" color="#fff" size={24} />
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
