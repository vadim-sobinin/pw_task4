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
import {Input} from '@rneui/themed';
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
  );
};

export default DatePickerBlock;

const styles = StyleSheet.create({
  infoBlockTitle: {
    color: '#131313',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
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
  datePicker: {
    height: 188,
    marginTop: -10,
  },

  formBlock: {
    marginTop: 32,
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
});
