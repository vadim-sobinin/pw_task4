import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {useTheme} from '@rneui/themed';

const Spinner = () => {
  const {theme} = useTheme();
  const colors = theme.colors;
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
