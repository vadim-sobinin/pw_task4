import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

import Tabs from '../../navigation/Tabs';

const MainScreen = () => {
  // AsyncStorage.getItem('userInfo')
  //   .then((data) => JSON.parse(data))
  //   .then((res) => console.log(res));

  return (
    <SafeAreaView style={styles.container}>
      {/* <Drawer /> */}

      <Tabs />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});
