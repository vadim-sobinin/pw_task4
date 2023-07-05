import { ApolloClient, InMemoryCache } from '@apollo/client';

const link = 'https://internship-social-media.purrweb.com/graphql';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: link,
});
export default client;
