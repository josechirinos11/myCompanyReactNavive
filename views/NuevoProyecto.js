import React, { useState } from 'react';

import { Text, View, StyleSheet, TextInput, Button, Alert, ToastAndroid, TouchableOpacity, Keyboard, TouchableWithoutFeedback  } from 'react-native'

import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';

const NUEVO_PROYECTO = gql`
    mutation nuevoProyecto($input: ProyectoInput ) {
        nuevoProyecto(input : $input){
            nombre
            id
        }
    }
`;

// Actualizar el cache
const OBTENER_PROYECTOS = gql`
    query obtenerProyectos { 
        obtenerProyectos {
            id
            nombre
        }
    }
`;

const NuevoProyecto = () => {

    // navigation
    const navigation = useNavigation();

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [mensaje, guardarMensaje] = useState(null);

    // Apollo
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
        update(cache, { data: { nuevoProyecto }}) {
            const { obtenerProyectos } = cache.readQuery({ query: OBTENER_PROYECTOS });
            cache.writeQuery({
                query: OBTENER_PROYECTOS,
                data: { obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) }
            })
        }
    });

    // Validar crear proyecto
    const handleSubmit = async () => {
        if(nombre === '') {
            guardarMensaje('El Nombre del Proyecto es Obligatorio');
            return;
        }

        // Guardar el Proyecto en la base de datos

        try {
            const { data } = await nuevoProyecto({
                variables: {
                    input: {
                        nombre
                    }
                }
            });
            // console.log(data);
            guardarMensaje('Proyecto Creado Correctamente');
            navigation.navigate("Proyectos");

        } catch (error) {
            // console.log(error);
            guardarMensaje(error.message.replace('GraphQL error:', '' ))
        }
    }

    // muestra un mensaje toast
    const mostrarAlerta = () => {
        ToastAndroid.showWithGravity(mensaje, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }


    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.contenedor, { backgroundColor: '#e84347' }]}>
            <View style={globalStyles.contenido}>
                <Text style={globalStyles.subtitulo}>Nuevo Proyecto</Text>

                <View>
                    
                    <View style={globalStyles.input}>
                    <TextInput
                        placeholder="Nombre del Proyecto"
                        
                        onChangeText={ texto => guardarNombre(texto) }
                        onBlur={Keyboard.dismiss}
                    />
                </View>
                </View>

                <TouchableOpacity
                    style={[globalStyles.boton, { marginTop: 30}]}
                    
                    onPress={ () => handleSubmit() }
                >
                    <Text style={globalStyles.botonTexto}>Crear Proyecto</Text>
                </TouchableOpacity>


                {mensaje && mostrarAlerta()}
            </View>
        </View>
        </TouchableWithoutFeedback>
     );
}
 
export default NuevoProyecto;