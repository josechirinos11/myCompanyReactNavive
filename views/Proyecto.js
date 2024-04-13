import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, TextInput, ToastAndroid, Keyboard, TouchableWithoutFeedback  } from 'react-native'

import globalStyles from '../styles/global';
import { gql, useMutation, useQuery } from '@apollo/client'
import Tarea from '../components/Tarea'
import { color } from 'native-base/lib/typescript/theme/styled-system';

// Crea nuevas tareas
const NUEVA_TAREA = gql`
    mutation nuevaTarea($input: TareaInput) {
        nuevaTarea(input: $input ) {
            nombre
            id
            proyecto
            estado
        }
    }
 `;

// Consulta las tareas del proyecto
const OBTENER_TAREAS = gql`
    query obtenerTareas($input: ProyectoIDInput) {
        obtenerTareas(input: $input) {
            id
            nombre
            estado
        }
    }
`;

const Proyecto = ({ route }) => {

    // obtiene el iD del proyecto
    const { id } = route.params;

    // STATE DEL COMPONENTE
    const [nombre, guardarNombre] = useState('');
    const [mensaje, guardarMensaje] = useState(null);


    // apollo obtener tareas
    const { data, loading, error } = useQuery(OBTENER_TAREAS, {
        variables: {
            input: {
                proyecto: id
            }
        }
    });

    console.log(data);

    // Apollo crear tareas
    const [nuevaTarea] = useMutation(NUEVA_TAREA, {
        update(cache, { data: { nuevaTarea } }) {
            const { obtenerTareas } = cache.readQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id
                    }
                }
            });

            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id
                    }
                },
                data: {
                    obtenerTareas: [...obtenerTareas, nuevaTarea]
                }
            })
        }
    });

    // Validar y crear tareas
    const handleSubmit = async () => {
        if (nombre === '') {
            guardarMensaje('El Nombre de la tarea es obligatorio');
            return;
        }

        // almacenarlo en la base de datos

        try {
            const { data } = await nuevaTarea({
                variables: {
                    input: {
                        nombre,
                        proyecto: id
                    }
                }
            });
            console.log(data);
            guardarNombre('');
            guardarMensaje('Tarea creada Correctamente');

            setTimeout(() => {
                guardarMensaje(null);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarAlerta = () => {
        ToastAndroid.showWithGravity(mensaje, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    // Si apollo esta consultando
    if (loading) return (
    <View style={[globalStyles.contenedor, { backgroundColor: '#E84347' }]}>
        <Text>Cargando...</Text>
        </View>
       
        )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.contenedor, { backgroundColor: '#E84347' }]}>
            <View style={{ marginHorizontal: '2.5%', marginTop: 20 }}>
                <View style={globalStyles.input}>
                    <TextInput
                        placeholder="Nombre Tarea"
                        value={nombre}
                        onChangeText={texto => guardarNombre(texto)}
                        onBlur={Keyboard.dismiss}
                    />
                </View>

                <TouchableOpacity
                    style={globalStyles.boton}

                    onPress={() => handleSubmit()}
                >
                    <Text style={{ color: 'white' }}>Crear Tarea</Text>
                </TouchableOpacity>
            </View>

            <Text style={globalStyles.subtitulo}>Tareas: {route.params.nombre} </Text>

            <View>

                <View style={styles.contenido}>
                    <FlatList
                        data={data.obtenerTareas}
                        keyExtractor={(proyecto) => proyecto.id.toString()}
                        renderItem={({ item: tarea }) => (
                            <Tarea
                                key={tarea.id}
                                tarea={tarea}
                                proyectoId={id}
                            />
                        )}
                    />
                </View>
            </View>

            {mensaje && mostrarAlerta()}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }
})

export default Proyecto;