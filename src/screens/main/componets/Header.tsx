import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Avatar } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../@types/types';

const noAvatarUrl =
  'https://w7.pngwing.com/pngs/686/219/png-transparent-youtube-user-computer-icons-information-youtube-hand-silhouette-avatar.png';

const Header = ({ children, avatarUrl }: { children: any; avatarUrl: string | null }) => {
  // @ts-ignore
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <Avatar
        onPress={() => {
          navigation.openDrawer();
        }}
        rounded
        source={{ uri: avatarUrl ? avatarUrl : noAvatarUrl }}
        size={40}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '500',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
