import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/splash/SplashScreen';

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="Feed" component={SplashScreen} />
      <DrawerNav.Screen name="Article" component={SplashScreen} />
    </DrawerNav.Navigator>
  );
};

export default Drawer;
