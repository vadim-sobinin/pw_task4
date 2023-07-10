import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../screens/main/componets/Main';
import {Avatar, Colors, Icon, useTheme} from '@rneui/themed';
import Favorites from '../screens/main/componets/Favorites';
import MyPosts from '../screens/main/componets/MyPosts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullPost from '../screens/main/componets/FullPost';
import CreatePost from '../screens/main/componets/CreatePost';
import {AuthContext} from '../context/AuthContext';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {User} from '../@types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  const {theme} = useTheme();
  const colors = theme.colors;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {color: colors.black, marginLeft: -24},
        swipeEnabled: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerItemStyle: {marginLeft: 32},
          drawerIcon: () => {
            return (
              <Icon
                name="person"
                type="ionicon"
                color={colors.black}
                size={24}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const makeStyles = (colors: Colors) =>
    StyleSheet.create({
      scrollView: {
        flex: 1,
      },
      container: {
        backgroundColor: colors.white,
      },
      theme: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 40,
        marginTop: 200,
        marginLeft: 32,
      },
      avatarBlock: {
        marginTop: 60,
        marginBottom: 60,
        marginLeft: 32,
      },
      username: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 12,
        color: colors.black,
      },
    });
  // @ts-ignore
  const {logout, userInfo}: {userInfo: User} = useContext(AuthContext);
  const noAvatarUrl =
    'https://w7.pngwing.com/pngs/686/219/png-transparent-youtube-user-computer-icons-information-youtube-hand-silhouette-avatar.png';

  const {updateTheme, theme} = useTheme();
  const colors = theme.colors;
  const toggleTheme = () => {
    updateTheme(theme => ({
      mode: theme.mode === 'light' ? 'dark' : 'light',
    }));

    AsyncStorage.setItem('mode', theme.mode === 'light' ? 'dark' : 'light');
  };
  const styles = makeStyles(colors);

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.avatarBlock}>
        <Avatar
          rounded
          source={{uri: userInfo.avatarUrl || noAvatarUrl}}
          size={80}
        />
        <Text style={styles.username}>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : 'New User'}
        </Text>
      </View>
      <View>
        <View>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Exit"
            onPress={() => logout()}
            icon={() => {
              return (
                <Icon
                  name="exit-outline"
                  type="ionicon"
                  color={colors.black}
                  size={24}
                />
              );
            }}
            labelStyle={{color: colors.black, marginLeft: -24}}
            style={{marginLeft: 32}}
          />
        </View>
      </View>
      <Pressable style={styles.theme} onPress={toggleTheme}>
        <Icon
          name={theme.mode === 'light' ? 'sunny' : 'moon'}
          type="ionicon"
          color={colors.black}
        />
        <Text style={{color: colors.black}}>
          {theme.mode === 'light' ? 'Light theme' : 'Dark theme'}
        </Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

////////////////////////////////////////////////////////////////////////////
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const makeStyles = (colors: Colors) =>
    StyleSheet.create({
      container: {
        paddingTop: 12,
        minHeight: 55,
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderStyle: 'solid',
        borderTopColor: colors.white,
      },
      tab: {
        fontSize: 12,
      },
    });

  const {theme} = useTheme();
  const colors = theme.colors;

  const styles = makeStyles(colors);

  return (
    <Tab.Navigator>
      <Tab.Group
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: styles.tab,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.grey1,
          tabBarStyle: styles.container,
        }}>
        <Tab.Screen
          name="MainScreen"
          component={MainStack1}
          options={{
            tabBarLabel: 'Main',
            tabBarAccessibilityLabel: 'Main Screen',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} type="ionicon" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarLabel: 'Favorites',
            tabBarAccessibilityLabel: 'Favorites',
            tabBarIcon: ({color, size}) => (
              <Icon name="bookmark" size={size} type="ionicon" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="My posts"
          component={MyPostsStack}
          options={{
            tabBarLabel: 'My posts',
            tabBarAccessibilityLabel: 'My posts',
            tabBarIcon: ({color, size}) => (
              <Icon name="image" size={size} type="ionicon" color={color} />
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
////////////////////////////////////////////////////////////////////////////////

const Stack = createNativeStackNavigator();

const MainStack1 = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="FullCard" component={FullPost} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FavoritesContent" component={Favorites} />
      <Stack.Screen name="FullCard" component={FullPost} />
    </Stack.Navigator>
  );
};

const MyPostsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreatePostStack" component={CreatePostStack} />
      <Stack.Screen name="FullCard" component={FullPost} />
    </Stack.Navigator>
  );
};

const CreatePostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPosts" component={MyPosts} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};
