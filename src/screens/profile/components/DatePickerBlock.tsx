import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Input, useTheme} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  dateOfBirth: string;
  date: Date;
  setDate: (date: string) => void;
  setDateOfBirth: (date: string) => void;
};

const DatePickerBlock = ({
  dateOfBirth,
  date,
  setDate,
  setDateOfBirth,
}: Props) => {
  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  const [showPicker, setShowPicker] = useState(false);
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
    <View style={styles.formBlock}>
      <Text style={styles.infoBlockTitle}>Date of birth</Text>

      <Pressable onPress={toggleDatepicker}>
        <Input
          placeholder={'Select date of birth'}
          placeholderTextColor={colors.grey3}
          inputStyle={{
            color: colors.grey3,
            fontSize: 16,
          }}
          inputContainerStyle={{
            borderBottomWidth: 1.5,
            borderColor: colors.grey3,
            marginLeft: -10,
            marginRight: -10,
          }}
          onChangeText={setDateOfBirth}
          value={dateOfBirth}
          label={'B-day'}
          labelStyle={{color: colors.grey3, fontSize: 14, marginLeft: -10}}
          editable={false}
          onPressIn={toggleDatepicker}
        />
      </Pressable>

      {Platform.OS === 'ios' ? (
        <Modal
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.white,
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
                textColor={colors.black}
              />
            </View>

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
                  <Text style={[styles.buttonText, {color: colors.success}]}>
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
                  <Text style={[styles.buttonText, {color: colors.error}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            style={styles.datePicker}
            maximumDate={new Date()}
            textColor={colors.black}
          />
        )
      )}
    </View>
  );
};

export default DatePickerBlock;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    infoBlockTitle: {
      color: colors.black,
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 16,
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

      backgroundColor: '#blue',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      paddingVertical: 12,
    },
    datePicker: {
      height: 188,
      marginTop: -10,
    },

    formBlock: {
      marginTop: 32,
    },
    pickerButton: {
      borderStyle: 'solid',
      borderColor: colors.grey1,
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
      borderBottomColor: colors.grey1,
      borderStyle: 'solid',
      marginBottom: 18,
    },
    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grey1,
      gap: 8,
      paddingLeft: 16,
      paddingRight: 16,
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
  });
