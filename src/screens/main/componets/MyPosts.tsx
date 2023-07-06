import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Card from './Card';
import {useQuery} from '@apollo/client';
import {GET_MYPOST} from '../../../apollo/requests';
import Spinner from '../../../ui/Spinner';
import {AuthContext} from '../../../context/AuthContext';
import {MyPostsData, NavigationProps, Post} from '../../../@types/types';
import NoFavorites from './NoFavorites';
import Header from './Header';
import AddPostLink from './AddPostLink';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const MyPosts = () => {
  // @ts-ignore
  const {userToken, userInfo} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProps>();
  const {loading, error, data, refetch} = useQuery<MyPostsData | undefined>(
    GET_MYPOST,
    {
      variables: {
        input: {},
      },
      context: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      },
      // onCompleted(data) {},
    },
  );

  // useEffect(() => {
  //   refetch({variables: {}});
  // }, []);

  if (loading || !data) {
    return <Spinner />;
  }

  if (error) {
    console.log('My posts... ', error);
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header avatarUrl={userInfo.avatarUrl}>My posts</Header>
          {data?.myPosts.data.length === 0 ? (
            <NoFavorites>You haven't posted any posts yet</NoFavorites>
          ) : (
            <SwipeListView
              data={data.myPosts.data}
              renderItem={({item}: {item: Post}) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('FullCard', {data: item});
                  }}>
                  <Card data={item} />
                </Pressable>
              )}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-73}
              disableRightSwipe={true}
            />
          )}
        </View>
        <AddPostLink />
      </SafeAreaView>
    );
  }
};

export default MyPosts;

const renderHiddenItem = () => (
  <View style={styles.rowBack}>
    <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
      <Icon name="trash" type="ionicon" color="#fff" size={32} />
      <Text style={styles.text}>Delete</Text>
    </View>
  </View>
);

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    // marginBottom: 80,
  },
  text: {
    color: '#fff',
    marginTop: 8,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#C2534C',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 4,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#C2534C',
    right: 0,
  },
});
