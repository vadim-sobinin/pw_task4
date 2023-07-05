import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Card from './Card';
import Sort from './Sort';
import { ApolloError, useQuery } from '@apollo/client';
import { GET_POSTS } from '../../../apollo/requests';
import Spinner from '../../../ui/Spinner';
import { AuthContext } from '../../../context/AuthContext';
import { NavigationProps, Post, PostsReqData, User } from '../../../@types/types';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
const Main = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // @ts-ignore
  const { userToken, userInfo, logout } = useContext<User>(AuthContext);

  const { loading, error, data, refetch } = useQuery<PostsReqData | undefined>(GET_POSTS, {
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
          {userInfo.firstName ? `Hello ${userInfo.firstName}!` : 'Welcome New User!'}
        </Header>
        <Sort selectedIndex={selectedIndex} setSelectedIndex={filterCanged} />

        <FlatList
          style={styles.list}
          data={data?.posts.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('FullCard', { data: item });
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
    marginBottom: 80,
  },
});
