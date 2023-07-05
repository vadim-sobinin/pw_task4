import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Card from './Card';
import { ApolloError, useQuery } from '@apollo/client';
import { GET_FAVORITES, GET_POSTS } from '../../../apollo/requests';
import Spinner from '../../../ui/Spinner';
import { AuthContext } from '../../../context/AuthContext';
import { FavoritesData, NavigationProps, Post, PostsReqData, User } from '../../../@types/types';
import NoFavorites from './NoFavorites';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const Favorites = () => {
  // @ts-ignore
  const { userToken, userInfo } = useContext(AuthContext);

  const navigation = useNavigation<NavigationProps>();
  const { loading, error, data, refetch } = useQuery<FavoritesData | undefined>(GET_FAVORITES, {
    variables: {
      input: {},
    },
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
    onCompleted(data) {},
  });

  if (loading || !data) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header avatarUrl={userInfo.avatarUrl}>Favorites</Header>
        {data?.favouritePosts.data.length === 0 ? (
          <NoFavorites>You haven't added anything to your favorites yet</NoFavorites>
        ) : (
          <FlatList
            style={styles.list}
            data={data.favouritePosts.data}
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
        )}
      </SafeAreaView>
    );
  }
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  list: {
    // marginBottom: 80,
  },
});
