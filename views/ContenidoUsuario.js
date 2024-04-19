import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Alert, ImageBackground, Dimensions, View, Text, ActivityIndicator, TextInput, TouchableOpacity, ToastAndroid, Modal, Pressable, StyleSheet, Animated } from 'react-native';
import globalStyles from '../styles/global';
import usuarioStyles from '../styles/contenidoUsuarioStyles'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MenuPrincipal from './usuario/MenuPrincipal'
import MenuIzquierdo from './usuario/MenuIzquierdo'
import { Camera, useCameraDevice, NoCameraDeviceError } from 'react-native-vision-camera'

const image = require('../styles/img/imgFondo.jpg');

const { width, height } = Dimensions.get('window');

/**
// Apollo 
import { gql, useMutation } from '@apollo/client';

const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
        crearUsuario(input:$input)
    }
`;
 */
const ContenidoUsuario = () => {
    // State del formulario
    const [nombre, guardarNombre] = useState('pata');
    const [email, guardarEmail] = useState('@pata');
    const [password, guardarPassword] = useState('123');
    const [mensaje, guardarMensaje] = useState(null);
    const [camActiva, setCamActiva] = useState(false)

    const [menuVisible, setMenuVisible] = useState(false);

    // Definir la referencia para el PanGestureHandler
    const panGestureHandlerRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleDerecho, setModalVisiblDerecho] = useState(false);
    const slideAnimation = new Animated.Value(-500); // Valor inicial fuera de la pantalla
    const slideAnimationDerecha = new Animated.Value(+500); // Valor inicial fuera de la pantalla

    //camara
    const device = useCameraDevice('back')
    const camera = useRef(null)

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(slideAnimation, {
                toValue: 0, // Valor final para que el modal se muestre completamente
                duration: 300, // Duración de la animación
                useNativeDriver: true, // Utilizar el driver nativo para mejorar el rendimiento
            }).start();
        } else {
            Animated.timing(slideAnimation, {
                toValue: -500, // Valor inicial fuera de la pantalla
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);
    useEffect(() => {
        if (modalVisibleDerecho) {
            Animated.timing(slideAnimationDerecha, {
                toValue: 0, // Valor final para que el modal se muestre completamente
                duration: 300, // Duración de la animación
                useNativeDriver: true, // Utilizar el driver nativo para mejorar el rendimiento
            }).start();
        } else {
            Animated.timing(slideAnimationDerecha, {
                toValue: +500, // Valor inicial fuera de la pantalla
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisibleDerecho]);

    // Mutation de apollo
    //  const [crearUsuario] = useMutation(NUEVA_CUENTA);

    // Cuando el usuario presiona en crear cuenta
    const handleSubmit = async () => {

        // Validar
        if (nombre === '' || email === '' || password === '') {
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }

        // Password debe tener al menos 6 caracteres
        if (password.length < 3) {
            guardarMensaje('El password debe ser de al menos 6 caracteres');
            return;
        }
        /**
                try {
                    // Crear usuario
                    const { data } = await crearUsuario({
                        variables: {
                            input: {
                                nombre,
                                email,
                                password
                            }
                        }
                    });
        
                    guardarMensaje(data.crearUsuario);
                    // Navegar a Login
                    // Coloca aquí la lógica de navegación a tu pantalla de login
                    
                } catch (error) {
                    console.log(error)
                    guardarMensaje(error.message.replace('GraphQL error: ', ''));
                }
        
                 */
    }

    // Mostrar mensaje Toast
    const mostrarAlerta = () => {
        ToastAndroid.showWithGravity(mensaje, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    const handleGesture = ({ nativeEvent }) => {
        const threshold = 50; // Umbral de deslizamiento

        if (nativeEvent.translationX > threshold) {
            // Deslizamiento de izquierda a derecha
            console.log('Deslizamiento de izquierda a derecha');
            setMenuVisible(true);
            setModalVisible(true)
            setModalVisiblDerecho(false)
        } else if (nativeEvent.translationX < -threshold) {
            // Deslizamiento de derecha a izquierda
            console.log('Deslizamiento de derecha a izquierda');
            setMenuVisible(false);
            setModalVisible(false)
            setModalVisiblDerecho(true)
        }
    };

    const MenuPrincipalWithRef = forwardRef((props, ref) => {
        return <MenuPrincipal {...props} forwardedRef={ref} setMenuVisible />;
    });


    const openCamera = async () => {
        console.log('desde la camara')
        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()
        console.log(newCameraPermission)

        setCamActiva(true)
        console.log(camActiva)
    }

    const tomarFoto = async () => {
        setCamActiva(false)
        const photo = await camera.current.takePhoto()
        console.log(photo)
      
    }

    return (

        <ImageBackground
            source={image}
            resizeMode="cover"
            style={[globalStyles.image, { width: width, height: height }]}>

            <View style={[globalStyles.contenedor]}>
                <PanGestureHandler
                    ref={panGestureHandlerRef}
                    onGestureEvent={handleGesture}
                >
                    <View style={globalStyles.contenido}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                                console.log('fuera del modal')
                            }}>



                            <Animated.View
                                style={[styles.centeredView, { transform: [{ translateX: slideAnimation }], alignItems: 'flex-start' }]}

                            >
                                <View style={[usuarioStyles.neumorphismBoton, usuarioStyles.modalView, { width: width / 2, height: height }]}>
                                    <Text style={styles.modalText}>Modal izquierdo</Text>
                                    <MenuIzquierdo />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                            console.log('fuera del modal')
                                        }}>
                                        <Text style={styles.textStyle}>Cerrar</Text>
                                    </Pressable>
                                </View>
                            </Animated.View>
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisibleDerecho}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisiblDerecho(!modalVisibleDerecho);
                                console.log('fuera del modal')
                            }}>



                            <Animated.View
                                style={[styles.centeredView, { transform: [{ translateX: slideAnimationDerecha }], alignItems: 'flex-end', }]}

                            >
                                <View style={[usuarioStyles.neumorphismBoton, usuarioStyles.modalView, { width: width / 2, height: height }]}>
                                    <Text style={styles.modalText}>Modal DERECHO</Text>
                                    <MenuPrincipal />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisiblDerecho(!modalVisibleDerecho)
                                            console.log('fuera del modal')
                                        }}>
                                        <Text style={styles.textStyle}>Cerrar</Text>
                                    </Pressable>
                                </View>
                            </Animated.View>
                        </Modal>


                        <View style={[usuarioStyles.contenedor]}>
                            <Text style={globalStyles.textoMy}>My<Text style={globalStyles.textoCompany}>Company</Text></Text>
                            <Pressable
                                style={[styles.Item, styles.buttonClose]}
                                onPress={() => {
                                    openCamera()


                                }}>
                                <Text style={[styles.textStyle]}>Foto</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.Item, styles.buttonClose]}
                                onPress={() => {

                                    console.log('boton 2')
                                }}>
                                <Text style={styles.textStyle}>Nota Escrita</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.Item, styles.buttonClose]}
                                onPress={() => {

                                    console.log('boton 3')
                                }}>
                                <Text style={styles.textStyle}>Nota Voz</Text>
                            </Pressable>
                        </View>

                        {mensaje && mostrarAlerta()}
                    </View>


                </PanGestureHandler>
            </View>

            {camActiva && device !== null ? (
                <View style={StyleSheet.absoluteFill}>
                    <Camera
                        ref={camera}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        photo={true}
                    />
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'red',
                            position: 'absolute',
                            bottom: 100,
                            alignSelf: 'center',
                        }}
                        onPress={() => {
                            tomarFoto()
                        }}
                    />
                </View>

            ) : null}
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',

        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: '100%',
        borderRadius: 20,
        padding: 30,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    Item: {
        width: 150, // Ancho de los botones
        height: 50, // Altura de los botones
        backgroundColor: '#2196F3', // Color de fondo
        justifyContent: 'center', // Centrar contenido verticalmente
        alignItems: 'center', // Centrar contenido horizontalmente
        borderRadius: 10, // Radio de borde para hacer botones cuadrados
        marginVertical: 10, // Separación vertical entre botones
    },
});



export default ContenidoUsuario;
