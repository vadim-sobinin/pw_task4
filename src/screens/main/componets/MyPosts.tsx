import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Card from './Card';
import {useMutation, useQuery} from '@apollo/client';
import {DELETE_POST, GET_MYPOST} from '../../../apollo/requests';
import Spinner from '../../../ui/Spinner';
import {AuthContext} from '../../../context/AuthContext';
import {MyPostsData, NavigationProps, Post} from '../../../@types/types';
import NoFavorites from './NoFavorites';
import Header from './Header';
import AddPostLink from './AddPostLink';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors, Icon, useTheme} from '@rneui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

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

  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  useFocusEffect(() => {
    refetch({});
  });

  const [deleteReq] = useMutation(DELETE_POST, {
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
    onCompleted: () => {
      refetch({});
    },
  });

  const deletePost = (id: string) => {
    deleteReq({
      variables: {
        input: {
          id: id,
        },
      },
    });
  };

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
              style={styles.list}
              data={data.myPosts.data}
              renderItem={({item}: {item: Post}) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('FullCard', {data: item});
                  }}>
                  <Card data={item} />
                </Pressable>
              )}
              renderHiddenItem={data => {
                return (
                  <RenderHiddenItem deletePost={deletePost} data={data.item} />
                );
              }}
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

const RenderHiddenItem = ({
  deletePost,
  data,
}: {
  deletePost: (id: string) => void;
  data: Post;
}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.rowBack}
      onPress={() => deletePost(data.id)}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Icon name="trash" type="ionicon" color="#fff" size={32} />
        <Text style={{color: '#fff'}}>Delete</Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
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
      backgroundColor: colors.white,
    },
    list: {
      marginBottom: 80,
    },
    text: {
      color: colors.white,
      marginTop: 8,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: colors.error,
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
      backgroundColor: colors.error,
      right: 0,
    },
  });
