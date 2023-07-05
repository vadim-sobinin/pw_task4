import AppNav from './src/navigation/AppNav';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo/client';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthContext';
import SplashScreen from './src/screens/splash/SplashScreen';

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <AppNav />
      </ApolloProvider>
    </AuthProvider>
  );
}
