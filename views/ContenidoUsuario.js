import React, { useState, useEffect , useRef, forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Modal, Pressable, StyleSheet, Animated  } from 'react-native';
import globalStyles from '../styles/global';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MenuPrincipal from './usuario/MenuPrincipal'


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

    const [menuVisible, setMenuVisible] = useState(false);

    // Definir la referencia para el PanGestureHandler
    const panGestureHandlerRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnimation = new Animated.Value(-500); // Valor inicial fuera de la pantalla



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
        } else if (nativeEvent.translationX < -threshold) {
            // Deslizamiento de derecha a izquierda
            console.log('Deslizamiento de derecha a izquierda');
            setMenuVisible(false);
            setModalVisible(false)
        }
    };

    const MenuPrincipalWithRef = forwardRef((props, ref) => {
        return <MenuPrincipal {...props} forwardedRef={ref} setMenuVisible />;
    });


    return (
        <View style={[globalStyles.contenedor, { backgroundColor: '#2874A6' }]}>
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
                        }}>



                        <Animated.View
                         style={[styles.centeredView, { transform: [{ translateX: slideAnimation }] }]}
                         
                         >
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hello World!</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                        </Animated.View>
                    </Modal>



                   
                        <Text style={globalStyles.titulo}>UpTask</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Nombre"
                            onChangeText={texto => guardarNombre(texto)}
                        />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Email"
                            onChangeText={texto => guardarEmail(texto)}
                        />
                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={texto => guardarPassword(texto)}
                        />
                        <TouchableOpacity
                            style={globalStyles.boton}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
                        </TouchableOpacity>
                        {mensaje && mostrarAlerta()}
                    </View>

             

            </PanGestureHandler>
        </View>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
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
        borderRadius: 20,
        padding: 10,
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
});



export default ContenidoUsuario;
