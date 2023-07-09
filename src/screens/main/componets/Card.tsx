import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Avatar, Colors, Icon, Image, useTheme} from '@rneui/themed';
import {Post} from '../../../@types/types';
import {useMutation} from '@apollo/client';
import {GET_FAVORITES, LIKE_POST, UNLIKE_POST} from '../../../apollo/requests';
import {AuthContext} from '../../../context/AuthContext';
import Share from 'react-native-share';

export const convertDate = (date: string) => {
  let dateInProcess = date.slice(0, 10).split('-');
  dateInProcess[0] = dateInProcess[0].slice(2, 4);
  return dateInProcess.reverse().join('.');
};

const Card = ({data}: {data: Post}) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

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

    onCompleted() {},
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

    onCompleted() {},
    onError(error) {
      console.log('error:', error.stack);
    },
  });

  const onPressShare = async () => {
    try {
      await Share.open({
        message: data.title,
        url: data.mediaUrl,
      });
    } catch (error) {
      console.log('Share error', error);
    }
  };
  return (
    <View style={styles.gap}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{convertDate(data.createdAt)}</Text>
        </View>
        <View style={styles.body}>
          <Image source={{uri: data.mediaUrl}} style={styles.image} />
        </View>
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
              color={colors.black}
            />
            <Text style={styles.counterText}>{data.likesCount}</Text>
            <Icon
              name="share-social"
              size={20}
              type="ionicon"
              color={colors.black}
              onPress={onPressShare}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    gap: {paddingBottom: 4},
    container: {
      backgroundColor: colors.grey0,
      paddingTop: 24,
      paddingRight: 20,
      paddingBottom: 32,
      paddingLeft: 20,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      color: colors.black,
      fontWeight: '500',
      fontSize: 16,
    },
    date: {
      color: colors.grey3,
      fontSize: 14,
    },
    image: {
      width: '100%',
      height: 225,
      borderRadius: 17,
      marginBottom: 20,
    },
    footer: {
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
    body: {},
    avatar: {},
    name: {
      color: colors.grey3,
      fontSize: 14,
    },
    counterText: {
      fontSize: 14,
      color: colors.black,
      marginLeft: 6,
      marginRight: 14,
    },
  });
