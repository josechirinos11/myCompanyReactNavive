

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Apollo
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client'


const myCompany = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => myCompany);