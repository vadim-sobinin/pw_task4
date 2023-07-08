import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {NavigationProps, Post} from '../../../@types/types';
import {Avatar, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {convertDate} from './Card';
import {AuthContext} from '../../../context/AuthContext';
import {useMutation} from '@apollo/client';
import {GET_FAVORITES, LIKE_POST, UNLIKE_POST} from '../../../apollo/requests';

const FullPost = ({route}: {route: {params: {data: Post}}}) => {
  const navigation = useNavigation<NavigationProps>();
  const data = route.params.data;

  // @ts-ignore
  const {userToken} = useContext(AuthContext);

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      input: {
        id: data.id,
      },
    },
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
    refetchQueries: [
      {
        query: GET_FAVORITES,
        variables: {
          input: {},
        },
        context: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      },
    ],
    onCompleted() {
      if (!data.isLiked) {
        data.likesCount++;
      }
      data.isLiked = true;
    },
    onError(error) {
      console.log('error:', error);
    },
  });
  const [unLikePost] = useMutation(UNLIKE_POST, {
    variables: {
      input: {
        id: data.id,
      },
    },
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
    refetchQueries: [
      {
        query: GET_FAVORITES,
        variables: {
          input: {},
        },
        context: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      },
    ],
    onCompleted() {
      if (data.isLiked) {
        data.likesCount--;
      }
      data.isLiked = false;
    },
    onError(error) {
      console.log('error:', error.stack);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{data.title}</Text>
          <View style={styles.icon}>
            <Icon
              name="arrow-back"
              type="ionicon"
              color="#131313"
              size={24}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
        <Text style={styles.date}>{convertDate(data.createdAt)}</Text>
        <Image style={styles.image} source={{uri: data.mediaUrl}} />
        <Text style={styles.description}>{data.description}</Text>
        <View style={styles.footer}>
          <View style={styles.author}>
            <Avatar source={{uri: data.author.avatarUrl}} rounded size={24} />
            <Text style={styles.name}>
              {data.author.firstName || 'New'}{' '}
              {data.author.lastName ? data.author.lastName.slice(0, 1) : 'user'}
            </Text>
          </View>
          <View style={styles.reactions}>
            <Icon
              name={data.isLiked ? 'heart' : 'heart-outline'}
              onPress={() => (data.isLiked ? unLikePost() : likePost())}
              size={20}
              type="ionicon"
              color="#000000"
            />
            <Text style={styles.counterText}>{data.likesCount}</Text>
            <Icon
              name="share-social"
              size={20}
              type="ionicon"
              color="#000000"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullPost;

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  counterText: {
    fontSize: 14,
    color: '#131313',
    marginLeft: 6,
    marginRight: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 19.3,
    color: '#131313',
  },
  image: {
    width: '100%',
    height: 226,
    borderRadius: 17,
    marginBottom: 20,
  },

  date: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    color: '#9B9B9B',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    position: 'relative',
  },
  headerText: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    color: '#131313',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 0,
    height: 24,
    width: 24,
  },
});
