import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Avatar, Colors, Icon, useTheme} from '@rneui/themed';
import useGetPicture from '../../../components/useGetPicture';
import {Image} from 'react-native-image-crop-picker';
import {User} from '../../../@types/types';
import {AuthContext} from '../../../context/AuthContext';

const noAvatarUrl =
  'https://w7.pngwing.com/pngs/686/219/png-transparent-youtube-user-computer-icons-information-youtube-hand-silhouette-avatar.png';

export type imageType =
  | {
      source: {
        uri: string;
      };
      data: Image;
      filename: string;
    }
  | null
  | undefined;

type AvatarProps = {
  image: imageType;

  setImage: (image: imageType) => void;
  updateProfile: (upd: any) => void;
};
const AvatarBlock = ({image, setImage, updateProfile}: AvatarProps) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  // @ts-ignore
  const {userInfo}: {userInfo: User} = useContext(AuthContext);

  const {getImage} = useGetPicture();

  const takePhotoFromCamera = async () => {
    const recivedImage = await getImage(true);
    setImage(recivedImage);
    setShowPhotoModal(false);
  };
  const choosePhotoFromLibrary = async () => {
    const recivedImage = await getImage(false, true, true);
    setImage(recivedImage);
    setShowPhotoModal(false);
  };

  const input = {
    avatarUrl: null,
    email: userInfo.email,
  };

  return (
    <View style={styles.avatarBlock}>
      <TouchableOpacity
        onPress={() => {
          setShowPhotoModal(true);
        }}>
        <Avatar
          source={{
            uri: image ? image.source.uri : userInfo.avatarUrl || noAvatarUrl,
          }}
          rounded
          size={160}
        />
        <View style={styles.avatarIconWrapper}>
          <Icon name={'camera'} size={22} type="ionicon" color={colors.white} />
        </View>
      </TouchableOpacity>
      <Modal
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animationType="fade"
        transparent={true}
        visible={showPhotoModal}
        onRequestClose={() => {
          setShowPhotoModal(!showPhotoModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                {borderBottomWidth: 0.25},
              ]}
              onPress={takePhotoFromCamera}>
              <Text style={[styles.buttonText, {color: colors.success}]}>
                Take a photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                {borderTopWidth: 0.25, borderBottomWidth: 0.25},
              ]}
              onPress={choosePhotoFromLibrary}>
              <Text style={[styles.buttonText, {color: colors.success}]}>
                Choose from the library
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                {borderTopWidth: 0.25},
              ]}
              onPress={() => {
                updateProfile({variables: {input: input}});
                setImage(null);
                setShowPhotoModal(false);
              }}>
              <Text style={[styles.buttonText, {color: colors.error}]}>
                Delete photo
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={[styles.button, styles.pickerButton]}
              onPress={() => setShowPhotoModal(false)}>
              <Text style={[styles.buttonText, {color: colors.success}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvatarBlock;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#3030309e',
      gap: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 25,
    },
    modalView: {
      backgroundColor: colors.white,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 35,
      width: '100%',
    },
    buttonsView: {
      backgroundColor: colors.white,
      flexDirection: 'column',
      width: '100%',
      borderRadius: 15,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      paddingVertical: 12,
    },
    pickerButton: {
      borderStyle: 'solid',
      borderColor: colors.grey1,
    },
    avatarIconWrapper: {
      width: 38,
      height: 38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.success,
      borderRadius: 50,
    },
    avatarBlock: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
  });
