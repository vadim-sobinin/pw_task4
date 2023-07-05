import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../@types/types';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardShift } from '../../../components/KeyboardShift';
import ButtonComponent from '../../../ui/Button';

const CreatePost = () => {
  const navigation = useNavigation<NavigationProps>();

  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');

  const [titleInputColor, setTitleInputColor] = useState('#9B9B9B');
  const [postInputColor, setPostInputColor] = useState('#9B9B9B');

  const isPostReady = Boolean(title && post && true);

  const choosePhoto = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then((image) => {
    //   console.log(image);
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CreatePost</Text>
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
        <View style={styles.iconCross}>
          <Icon
            name="close-outline"
            type="ionicon"
            color="#131313"
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <KeyboardShift>
        <View style={styles.content}>
          <TouchableOpacity style={styles.uploadBlock}>
            <Icon name="cloud-upload" type="ionicon" color="#87B71F" size={36} />
            <Text style={styles.uploadText}>Upload your photo here</Text>
          </TouchableOpacity>
          <Input
            placeholder={`Enter title of post`}
            placeholderTextColor={'#9B9B9B'}
            errorStyle={{ color: '#C2534C', fontSize: 14, lineHeight: 20 }}
            errorMessage="Enter title of post"
            inputStyle={{ color: '#131313', fontSize: 16 }}
            inputContainerStyle={{ borderColor: titleInputColor }}
            onFocus={() => setTitleInputColor('#131313')}
            onBlur={() => setTitleInputColor('#9B9B9B')}
            onChangeText={setTitle}
            value={title}
            label={'Title'}
            labelStyle={styles.label}
          />
          <Input
            placeholder={`Enter your post`}
            placeholderTextColor={'#9B9B9B'}
            errorStyle={{ color: '#C2534C', fontSize: 14, lineHeight: 20 }}
            errorMessage="Enter your post"
            inputStyle={{ color: '#131313', fontSize: 16 }}
            inputContainerStyle={{ borderColor: postInputColor }}
            onFocus={() => setPostInputColor('#131313')}
            onBlur={() => setPostInputColor('#9B9B9B')}
            onChangeText={setPost}
            value={post}
            label={'Post'}
            labelStyle={styles.label}
            multiline={true}
          />
          <ButtonComponent disabled={!isPostReady} style={{ marginTop: 52 }}>
            Publish
          </ButtonComponent>
        </View>
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default CreatePost;

//

const styles = StyleSheet.create({
  content: {
    marginTop: 28,
  },
  label: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  input: {},
  uploadText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#131313',
  },
  uploadBlock: {
    backgroundColor: '#F4F5F4',
    borderColor: '#87B71F',
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
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
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
    height: 24,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
