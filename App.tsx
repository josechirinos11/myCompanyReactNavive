import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import { Dimensions, ImageBackground, Image, View, StyleSheet } from 'react-native';

import globalStyles from './styles/global';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './views/Login';
import ContenidoUsuario from './views/ContenidoUsuario';

import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('./styles/img/imgFondo.jpg');

const {width, height} = Dimensions.get('window');


const App = () => {






  return (
    <>
        
      <NavigationContainer>

      <ImageBackground
            source={image}
            resizeMode="cover"
            style={[globalStyles.image, { width: width, height: height }]}>

        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
           
            options={{
              title: "Iniciar Sesión",
              headerShown: false
            }}
          />
          <Stack.Screen
            name="ContenidoUsuario"
            component={ContenidoUsuario}
            options={{
              title: "Crear Cuenta",
              headerStyle: {
                backgroundColor: '#28303B'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          />
         
        </Stack.Navigator>
        </ImageBackground>
      </NavigationContainer>
     
    </>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta el modo de redimensionamiento de la imagen de fondo
    justifyContent: "center"
  },
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20, // Ajusta la posición vertical según tus necesidades
    left: 10, // Ajusta la posición horizontal según tus necesidades
    width: 24,
    height: 24,
  },
});
export default App;
