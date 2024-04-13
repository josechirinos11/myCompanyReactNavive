import React, { useState, useEffect, useRef } from 'react'

import { Animated, ActivityIndicator, Dimensions, ImageBackground, Text, View, StyleSheet, TextInput, Button, Alert, ToastAndroid, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
//import { NativeBaseProvider, Container, Button, H1, Input, Form, Item, Toast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';
import login from '../styles/loginStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Apollo 
import { gql, useMutation } from '@apollo/client';


const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input ) {
        token
        }
    }
`;

const CREAR_USUARIO = gql`
    mutation CrearUsuario($input: UsuarioInput) {
        crearUsuario(input: $input) {
            token
            mensaje
          }
        }
`;


const image = require('../styles/img/imgFondo.jpg');

const { width, height } = Dimensions.get('window');




const Login = () => {

    // State del formulario
    const [auth, setAuth] = useState('')
    const [ventanaLogin, setVentanaLogin] = useState(false)
    const [ventanaContenidoUsuario, setventanaContenidoUsuario] = useState(false)
    const [cargandoToken, setCargandoToken] = useState(true);

    const inputScale = useRef(new Animated.Value(1)).current;
    const inputBackground = useRef(new Animated.Value(0)).current;

    const [email, setEmail] = useState('jose@jose.com');
    const [password, setPassword] = useState('123456');
    const [nombre, setNombre] = useState('jose');

    const [mensaje, guardarMensaje] = useState(null);




    // React navigation
    const navigation = useNavigation();

    // Mutation de apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
    const [crearUsuario] = useMutation(CREAR_USUARIO);



    // verificar si esta logueado el usuario
    useEffect(() => {
        // Función asíncrona para cargar el token al montar el componente
        const cargarToken = async () => {
            try {
                // Extraer el token de AsyncStorage
                const tokenGuardado = await AsyncStorage.getItem('token');
                setAuth(tokenGuardado || ''); // Almacenar el token en el estado, o establecer una cadena vacía si no hay token
                setCargandoToken(false); // Indicar que la carga del token ha terminado
                console.log('el tokenGuardado es: .................   ', tokenGuardado)
                console.log('el auth es: .................   ', auth)

            } catch (error) {
                console.error('Error al cargar el token:', error);
            }
        };

        // Llamar a la función para cargar el token
        cargarToken();

        // Función de limpieza que se ejecutará al desmontar el componente
        return () => {
            console.log('El componente se ha desmontado');
            // Aquí puedes realizar cualquier limpieza necesaria
        };
    }, [])



    const handleEliminarToken = async () => {
        try {
            // Eliminar el token de AsyncStorage
            await AsyncStorage.removeItem('token');
            console.log('Token eliminado exitosamente');
            // Redireccionar a Proyectos
            setAuth('')
        } catch (error) {
            console.error('Error al eliminar el token:', error);
        }
    }

    
    // muestra un mensaje alerta
    const mostrarAlerta = () => {
        ToastAndroid.showWithGravity(mensaje, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    const mensajes = (text) => {
        guardarMensaje(text);
    }



    const handleIniciarSesion = async () => {
        // validar
        if (email === '' || password === '') {
            // Mostrar un error
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }

        try {
            // autenticar el usuario
            const { data } = await autenticarUsuario({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });

            const { token } = data.autenticarUsuario;

            // Colocar token en storage
            await AsyncStorage.setItem('token', token);

            // Redireccionar a Proyectos
            navigation.navigate("ContenidoUsuario");
            const x = await AsyncStorage.getItem('token')
            guardarMensaje('el token es: .................   ', x);
            console.log('el token es: .................   ', x)
        } catch (error) {
            // si hay un error mostrarlo
            console.log()
            guardarMensaje(error.message.replace('GraphQL error: ', ''));

        }
    }
        
        const handleContenidoUsuario = async () => {
        // validar
        if (email === '' || password === '') {
            // Mostrar un error
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }

        try {
            // autenticar el usuario
            const { data } = await crearUsuario({
                variables: {
                    input: {
                        email,
                    
                        password
                    }
                }
            });

            const { token } = data.crearUsuario;

            // Colocar token en storage
              await AsyncStorage.setItem('token', token);

            // Redireccionar a Proyectos
            navigation.navigate("ContenidoUsuario");
                const x = await AsyncStorage.getItem('token')
                guardarMensaje('el token es en linea 221: .................   ', x);
            console.log('el token es en linea 221: .................   ', x)
        } catch (error) {
            // si hay un error mostrarlo
            console.log()
            guardarMensaje(error.message.replace('GraphQL error: ', ''));

        }

    }

    const handleAtras = () => {
        setVentanaLogin(false)
        setventanaContenidoUsuario(false)
    }

    const handleFocus = () => {
        Animated.timing(inputScale, {
            toValue: 1.05, // Escala del input al enfocar
            duration: 300, // Duración de la animación en milisegundos
            useNativeDriver: true, // Usa el driver nativo para optimizar la animación
        }).start();
    };

    const handleBlur = () => {
        Animated.timing(inputScale, {
            toValue: 1, // Escala del input al desenfocar
            duration: 300, // Duración de la animación en milisegundos
            useNativeDriver: true, // Usa el driver nativo para optimizar la animación
        }).start();
    };

    const backgroundInterpolation = inputBackground.interpolate({
        inputRange: [0, 1],
        outputRange: ['red', '#E0E0E0'], // Colores de fondo inicial y final
    });
    return (
        <ImageBackground
            source={image}
            resizeMode="cover"
            style={[login.image, { width: width, height: height }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>



                <View style={login.contenedor}>

                    <View style={login.contenidoPrincipal}>
                        {auth !== '' ? (
                            <>
                                <Text style={login.textoMy}>Esperando<Text style={login.textoCompany}>Datos.......</Text></Text>
                                <View style={login.inputsContainer}>

                                    <TouchableOpacity
                                        style={login.boton}
                                        onPress={handleEliminarToken}>
                                        <Text style={login.botonTexto}>Borrar token</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            ventanaLogin && auth === '' ? (
                                <>
                                    <Text style={login.textoMy}>Iniciar<Text style={login.textoCompany}>Sesion</Text></Text>
                                    <View style={login.inputsContainer}>



                                        <Animated.View style={[styles.container, { transform: [{ scale: inputScale }] }]}>

                                            <TextInput
                                                style={[login.input, login.neumorphismImput]}
                                                placeholder="Correo Electrónico"
                                                onChangeText={(text) => setEmail(text)}
                                                value={email}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />

                                        </Animated.View>





                                        <TextInput
                                            style={[login.input, login.neumorphismImput]}
                                            placeholder="Contraseña"
                                            onChangeText={(text) => setPassword(text)}
                                            value={password}
                                            secureTextEntry={true}
                                        />
                                        <View
                                            style={login.contenedoresBotones}
                                        >
                                            <TouchableOpacity
                                                style={[login.boton, login.neumorphismBoton]}
                                                onPress={handleIniciarSesion}>
                                                <Text style={login.botonTexto}>Iniciar Sesión</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[login.boton, login.neumorphismBoton]}
                                                onPress={handleAtras}>
                                                <Text style={login.botonTexto}>Atras</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            ) : (
                                ventanaContenidoUsuario && auth === '' ? (
                                    <>
                                        <Text style={login.textoMy}>Crear<Text style={login.textoCompany}>Cuenta</Text></Text>
                                        <View style={login.inputsContainer}>
                                            <TextInput
                                                style={[login.input, login.neumorphismImput]}
                                                placeholder="Correo Electrónico"
                                                onChangeText={(text) => setEmail(text)}
                                                value={email}
                                            />
                                           
                                            <TextInput
                                                style={[login.input, login.neumorphismImput]}
                                                placeholder="Contraseña"
                                                onChangeText={(text) => setPassword(text)}
                                                value={password}
                                                secureTextEntry={true}
                                            />
                                            <View
                                                style={login.contenedoresBotones}
                                            >
                                                <TouchableOpacity
                                                    style={[login.boton, login.neumorphismBoton]}
                                                    onPress={handleContenidoUsuario}>
                                                    <Text style={login.botonTexto}>Crear Cuenta</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[login.boton, login.neumorphismBoton]}
                                                    onPress={handleAtras}>
                                                    <Text style={login.botonTexto}>Atras</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Text style={login.textoMy}>My<Text style={login.textoCompany}>Company</Text></Text>
                                        <View style={login.contenidoSecundario}>
                                            <TouchableOpacity
                                                style={login.loginCss}
                                                onPress={() => {

                                                    setVentanaLogin(true)
                                                }}>
                                                <Text style={login.textoLogin}>Iniciar Sesion</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={login.entrarCss}
                                                onPress={() => setventanaContenidoUsuario(true)}>
                                                <Text style={login.textoEntrar}>Crear Cuenta</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>


                                )
                            )
                        )}

                    </View>

                    {mensaje && mostrarAlerta()}

                </View>


            </TouchableWithoutFeedback>
        </ImageBackground>


    );
}



const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0
    },

    container: {
        width: '100%',

    },
    input: {
        width: '100%',
        color: '#666',
    },
});









export default Login;