import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {useTheme} from '@rneui/themed';

const Spinner = () => {
  const {theme} = useTheme();
  let colors = {
    white: '#303030',
  };
  if (theme) {
    colors = theme.colors;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Spinner;
