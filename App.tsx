import AppNav from './src/navigation/AppNav';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo/client';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeCustomProvider} from './src/themes/ThemeCustomProvider';

export default function App() {
  return (
    <ThemeCustomProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <AppNav />
        </ApolloProvider>
      </AuthProvider>
    </ThemeCustomProvider>
  );
}
