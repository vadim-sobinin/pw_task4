import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors, Icon, Image, useTheme} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../@types/types';
import {KeyboardShift} from '../../../components/KeyboardShift';
import ButtonComponent from '../../../ui/Button';

import useGetPicture from '../../../components/useGetPicture';
import {imageType} from '../../profile/components/AvatarBlock';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../ui/CustomInput';
import axios from 'axios';
import {CREATE_POST} from '../../../apollo/requests';
import {useMutation} from '@apollo/client';
import {AuthContext} from '../../../context/AuthContext';
import Spinner from '../../../ui/Spinner';

const signURL = 'https://internship-social-media.purrweb.com/v1/aws/signed-url';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type createPostRequestBody = {
  description: string;
  title: string;
  mediaUrl?: string;
};

const CreatePost = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isLoading, setIsLoading] = useState(false);

  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  const [image, setImage] = useState<imageType | null>(null);

  // @ts-ignore
  const {userToken} = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {getImage} = useGetPicture();

  const choosePhoto = async () => {
    const recivedImage = await getImage(false, false, false);
    setImage(recivedImage);
  };

  const [createPost] = useMutation(CREATE_POST, {
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },

    onError(error) {
      console.log('onError error:', error);
    },
    // refetchQueries: () => [
    //   {
    //     query: GET_MYPOST,
    //     variables: {},
    //   },
    // ],
  });

  const onSubmitPressed = async (data: any) => {
    setIsLoading(true);
    const input: createPostRequestBody = {
      description: data.postText,
      title: data.title,
    };
    // console.log(data);
    if (image) {
      try {
        const response = await axios({
          url: signURL,
          params: {
            fileName: `${getRandomInt(1, 10000000)}.jpg`,
            fileCategory: 'POSTS',
          },
          headers: {Authorization: `Bearer ${userToken}`},
        });

        input.mediaUrl = response.data.split('?')[0];

        await fetch(response.data, {
          method: 'put',
          body: image.source,
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    await createPost({variables: {input: input}});
    setIsLoading(false);
    navigation.goBack();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CreatePost</Text>
        <View style={styles.icon}>
          <Icon
            name="arrow-back"
            type="ionicon"
            color={colors.black}
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.iconCross}>
          <Icon
            name="close-outline"
            type="ionicon"
            color={colors.black}
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <KeyboardShift>
        <View style={styles.content}>
          {image ? (
            <Image style={styles.image} source={{uri: image.source.uri}} />
          ) : (
            <TouchableOpacity style={styles.uploadBlock} onPress={choosePhoto}>
              <Icon
                name="cloud-upload"
                type="ionicon"
                color={colors.primary}
                size={36}
              />
              <Text style={styles.uploadText}>Upload your photo here</Text>
            </TouchableOpacity>
          )}
          <CustomInput
            control={control}
            placeholder="Enter title of post"
            name="title"
            label="Title"
            rules={{
              required: {value: true, message: 'Enter your post title'},
              minLength: {
                value: 5,
                message: 'Title must be longer than or equal to 5 characters',
              },
            }}
          />
          <CustomInput
            control={control}
            placeholder="Enter your post"
            name="postText"
            label="Post"
            rules={{
              required: {value: true, message: 'Enter your post text'},
              minLength: {
                value: 40,
                message:
                  'Description must be longer than or equal to 40 characters',
              },
            }}
            multiline={true}
          />

          <ButtonComponent
            disabled={!(!errors.title?.type && Boolean(image))}
            style={{marginTop: 52}}
            onPress={handleSubmit(onSubmitPressed)}>
            Publish
          </ButtonComponent>
        </View>
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default CreatePost;

//

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    content: {
      marginTop: 28,
      marginLeft: 16,
      marginRight: 16,
    },
    contentWrapper: {
      marginLeft: 16,
      marginRight: 16,
    },
    label: {
      color: colors.grey3,
      fontSize: 14,
    },
    input: {},
    uploadText: {
      fontWeight: '500',
      fontSize: 14,
      color: colors.black,
    },
    image: {
      borderRadius: 24,
      height: 166,
      marginBottom: 40,
    },
    uploadBlock: {
      backgroundColor: colors.grey0,
      borderColor: colors.primary,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderRadius: 24,
      height: 166,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 40,
    },

    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      position: 'relative',
      // marginBottom: 28,
      marginLeft: 16,
      marginRight: 16,
    },
    headerText: {
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      color: colors.black,
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
    iconCross: {
      position: 'absolute',
      top: 19,
      right: 0,
      height: 24,
      width: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
