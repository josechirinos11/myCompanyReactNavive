
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createHttpLink} from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://192.168.1.182:4000',
  });
  
  const authLink = setContext(async (_, {headers}) => {
    //leer token
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
  export default client;
  

  // http://localhost:4000   https://affairsappbackend-production.up.railway.app