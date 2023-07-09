import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Card from './Card';
import Sort from './Sort';
import {useQuery} from '@apollo/client';
import {GET_POSTS} from '../../../apollo/requests';
import Spinner from '../../../ui/Spinner';
import {AuthContext} from '../../../context/AuthContext';
import {NavigationProps, PostsReqData, User} from '../../../@types/types';
import Header from './Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import useThemeCustom from '../../../hooks/useThemeCustom';

// @ts-ignore
const Main = () => {
  // const {colors} = useThemeCustom();

  // console.log(colors);

  const navigation = useNavigation<NavigationProps>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // @ts-ignore
  const {userToken, userInfo, logout} = useContext<User>(AuthContext);

  const {loading, error, data, refetch} = useQuery<PostsReqData | undefined>(
    GET_POSTS,
    {
      variables: {
        input: {
          type: selectedIndex ? 'TOP' : 'NEW',
        },
      },
      context: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      },
    },
  );

  useFocusEffect(() => {
    refetch({
      input: {
        type: selectedIndex ? 'TOP' : 'NEW',
      },
    });
  });

  const filterCanged = (index: number) => {
    setSelectedIndex(index), refetch();
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    logout();
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header avatarUrl={userInfo.avatarUrl}>
          {userInfo.firstName
            ? `Hello ${userInfo.firstName}!`
            : 'Welcome New User!'}
        </Header>
        <Sort selectedIndex={selectedIndex} setSelectedIndex={filterCanged} />

        <FlatList
          style={styles.list}
          data={data?.posts.data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('FullCard', {data: item});
              }}>
              <Card data={item} />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
};

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  list: {
    marginBottom: 160,
  },
});
