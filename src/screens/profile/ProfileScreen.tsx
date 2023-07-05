import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, Icon, Input} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, User} from '../../@types/types';
import {AuthContext} from '../../context/AuthContext';
import {useForm} from 'react-hook-form';
import CustomInput from '../../ui/CustomInput';
import {KeyboardShift} from '../../components/KeyboardShift';
import CustomRadioButton from '../../ui/CustomRadioButton';

import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const [selectedIndex, setSelectedIndex] = useState<null | string>(null);

  const noAvatarUrl =
    'https://w7.pngwing.com/pngs/686/219/png-transparent-youtube-user-computer-icons-information-youtube-hand-silhouette-avatar.png';

  // @ts-ignore
  const {userInfo}: {userInfo: User} = useContext(AuthContext);

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.middleName,
      surname: userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone,
      country: userInfo.country,
    },
  });

  const onPressRadioButton = (id: string) => {
    setSelectedIndex(id);
  };
  const onSubmitPressed = (data: any) => {};

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  // @ts-ignore
  const onChange = ({type}, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    toggleDatepicker();
  };

  const formatDate = (rawDate: string | Date) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

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
          <View style={styles.avatarBlock}>
            <TouchableOpacity onPress={() => {}}>
              <Avatar
                source={{
                  uri: userInfo.avatarUrl ? userInfo.avatarUrl : noAvatarUrl,
                }}
                rounded
                size={160}
              />
              <View style={styles.avatarIconWrapper}>
                <Icon name={'camera'} size={22} type="ionicon" color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.formBlock}>
            <Text style={styles.infoBlockTitle}>Personal Info</Text>

            <CustomInput
              name={'firstName'}
              placeholder={'Enter your first name'}
              control={control}
              rules={{required: 'Please, fill your first name'}}
              label="First name"
            />

            <CustomInput
              name={'lastName'}
              placeholder={'Enter your last name'}
              control={control}
              label="Last name"
            />

            <CustomInput
              name={'surname'}
              placeholder={'Enter your surname name'}
              control={control}
              label="Surname"
            />
          </View>
          <View style={styles.formBlock}>
            <Text style={styles.infoBlockTitle}>Gender</Text>
            <CustomRadioButton
              onPress={onPressRadioButton}
              id="Male"
              isSelected={selectedIndex === 'Male'}>
              Male
            </CustomRadioButton>
            <CustomRadioButton
              onPress={onPressRadioButton}
              id="Female"
              isSelected={selectedIndex === 'Female'}>
              Female
            </CustomRadioButton>
          </View>

          <View style={styles.formBlock}>
            <Text style={styles.infoBlockTitle}>Date of birth</Text>

            <Pressable onPress={toggleDatepicker}>
              <Input
                placeholder={'Select date of birth'}
                placeholderTextColor={'#9B9B9B'}
                inputStyle={{
                  color: '#131313',
                  fontSize: 16,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 1.5,
                  borderColor: '#9B9B9B',
                  marginLeft: -10,
                  marginRight: -10,
                }}
                onChangeText={setDateOfBirth}
                value={dateOfBirth}
                label={'B-day'}
                labelStyle={{color: '#9B9B9B', fontSize: 14, marginLeft: -10}}
                editable={false}
                onPressIn={toggleDatepicker}
              />
            </Pressable>

            <Modal
              style={{
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              animationType="fade"
              transparent={true}
              visible={showPicker}
              onRequestClose={() => {
                setShowPicker(!showPicker);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.datapickerTextBlock}>
                    <Text style={styles.datapickerText}>
                      Pick the date of your birth
                    </Text>
                  </View>

                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    style={styles.datePicker}
                    maximumDate={new Date()}
                  />
                </View>
                {Platform.OS === 'ios' && (
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <View style={styles.buttonsView}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.pickerButton,
                          {borderBottomWidth: 0.25},
                        ]}
                        onPress={confirmIOSDate}>
                        <Text style={[styles.buttonText, {color: '#87B71F'}]}>
                          Confirm
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.pickerButton,
                          {borderTopWidth: 0.25},
                        ]}
                        onPress={toggleDatepicker}>
                        <Text style={[styles.buttonText, {color: '#C2534C'}]}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </Modal>
          </View>

          <View style={styles.formBlock}>
            <Text style={styles.infoBlockTitle}>Account Info</Text>
            <CustomInput
              name={'email'}
              placeholder={'Enter your email'}
              control={control}
              rules={{
                required: 'Please, fill your email',
                pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
              }}
              label="Email"
            />

            <CustomInput
              name={'phone'}
              placeholder={'Enter your phone number'}
              control={control}
              label="Phone number"
            />
            <CustomInput
              name={'country'}
              placeholder={'Enter your country'}
              control={control}
              label="Country"
            />
          </View>
        </>
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  buttonsView: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#blue',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 12,
  },
  pickerButton: {
    borderStyle: 'solid',
    borderColor: '#DEDEDE',
  },
  datapickerText: {
    color: '#9A99A2',
    paddingBottom: 18,
    paddingTop: 16,
    textAlign: 'center',
  },
  datapickerTextBlock: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E4EA',
    borderStyle: 'solid',
    marginBottom: 18,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3030309e',
    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '100%',
  },

  datePicker: {
    height: 188,
    marginTop: -10,
  },
  infoBlockTitle: {
    color: '#131313',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },

  formBlock: {
    marginTop: 32,
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
    backgroundColor: '#87B71F',
    borderRadius: 50,
  },
  avatarBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
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
