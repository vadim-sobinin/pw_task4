import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, User} from '../../@types/types';
import {AuthContext} from '../../context/AuthContext';
import {Control, useForm} from 'react-hook-form';
import {KeyboardShift} from '../../components/KeyboardShift';
import AvatarBlock, {imageType} from './components/AvatarBlock';
import axios from 'axios';
import DatePickerBlock from './components/DatePickerBlock';
import AccountInfoBlock from './components/AccountInfoBlock';
import Spinner from '../../ui/Spinner';
import {useMutation} from '@apollo/client';
import {EDIT_PROFILE} from '../../apollo/requests';
import PersonalInfoBlock from './components/PersonalInfoBlock';
import GenderBlock from './components/GenderBlock';

type editRequestBody = {
  email: string;
  avatarUrl?: string | null;
  birthDate?: string;
  country?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
};

export type formInputsType = {
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  phone: string;
  country: string;
};

export type MyControlType = {
  control: Control<formInputsType, any>;
};

const signURL = 'https://internship-social-media.purrweb.com/v1/aws/signed-url';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  // @ts-ignore
  const {userInfo, userToken, update}: {userInfo: User} =
    useContext(AuthContext);

  const [selectedIndex, setSelectedIndex] = useState<null | string>(
    userInfo.gender,
  );

  const recivedBirthDate = userInfo.birthDate
    ? userInfo.birthDate.split('-').reverse().join('-')
    : '';

  const [dateOfBirth, setDateOfBirth] = useState<string>(recivedBirthDate);
  const [newImage, setNewImage] = useState<imageType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(userInfo.birthDate || new Date());

  const [updateProfile] = useMutation(EDIT_PROFILE, {
    context: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
    onCompleted(data: any) {
      if (data.userEditProfile.problem) {
        if (data.userEditProfile.problem.message === 'Email already in use') {
          setError('email', {
            type: 'custom',
            message: data.userEditProfile.problem.message,
          });
        }
        console.log('onComplete error', data.userEditProfile.problem.message);
      } else {
        update(data.userEditProfile.user);
      }
    },
    onError(error) {
      console.log('onError error:', error.message);
    },
  });

  const {control, handleSubmit, setError} = useForm<formInputsType>({
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.middleName,
      surname: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
      country: userInfo.country,
    },
  });

  const onSubmitPressed = async (data: any) => {
    setIsLoading(true);
    let input: editRequestBody = {
      email: data.email,
    };
    data.firstName ? (input.firstName = data.firstName) : null;
    data.lastName ? (input.middleName = data.lastName) : null;
    data.surname ? (input.lastName = data.surname) : null;
    data.phone ? (input.phone = data.phone) : null;
    data.country ? (input.country = data.country) : null;
    selectedIndex ? (input.gender = selectedIndex) : null;
    dateOfBirth
      ? (input.birthDate = dateOfBirth.split('-').reverse().join('-'))
      : null;

    if (newImage) {
      try {
        const response = await axios({
          url: signURL,
          params: {
            fileName: `${getRandomInt(1, 10000000)}.jpg`,
            fileCategory: 'AVATARS',
          },
          headers: {Authorization: `Bearer ${userToken}`},
        });

        input.avatarUrl = response.data.split('?')[0];

        await fetch(response.data, {
          method: 'put',
          body: newImage.source,
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    updateProfile({variables: {input: input}});
    setIsLoading(false);

    navigation.goBack();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={{flex: 1, marginRight: 16, marginLeft: 16}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
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
        <TouchableOpacity
          style={styles.iconCross}
          onPress={handleSubmit(onSubmitPressed)}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
      <KeyboardShift>
        <>
          <AvatarBlock
            image={newImage}
            setImage={setNewImage}
            updateProfile={updateProfile}
          />

          <PersonalInfoBlock control={control} />

          <GenderBlock
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />

          <DatePickerBlock
            date={date}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            setDate={setDate}
          />

          <AccountInfoBlock control={control} />
        </>
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    // marginBottom: 28,
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
  iconCross: {
    position: 'absolute',
    top: 19,
    right: 0,
    // height: 24,
    // width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
