import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native'
//import { Container, Button, Text, H2, Content, List, ListItem, Left, Right } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';


const OBTENER_PROYECTOS = gql`
    query obtenerProyectos { 
        obtenerProyectos {
            id
            nombre
        }
    }
`;

const Proyectos = () => {

    const navigation = useNavigation();

    // Apollo
    const { data, loading, error } = useQuery(OBTENER_PROYECTOS);

    console.log(data);
    console.log(loading);
    console.log(error);

    if (loading) return <Text>Cargando...</Text>
    const base = [
        { id: 1, nombre: 'Objeto 1' },
        { id: 2, nombre: 'Objeto 2' },
        { id: 3, nombre: 'Objeto 3' },
        { id: 4, nombre: 'Objeto 4' },
        { id: 5, nombre: 'Objeto 5' },
        { id: 6, nombre: 'Objeto 6' },
        { id: 7, nombre: 'Objeto 7' },
        { id: 8, nombre: 'Objeto 8' },
        { id: 9, nombre: 'Objeto 9' },
        { id: 10, nombre: 'Objeto 10' }
    ];

    return (
        <View style={[globalStyles.contenedor, { backgroundColor: '#E84347' }]}>
            <TouchableOpacity
                style={[globalStyles.boton, { marginTop: 30 }]}
                square
                block
                onPress={() => navigation.navigate("NuevoProyecto")}
            >
                <Text style={globalStyles.botonTexto}>Nuevo Proyecto</Text>
            </TouchableOpacity>

            <Text style={globalStyles.subtitulo}>Selecciona un Proyecto</Text>

            <View>
                <View style={styles.contenido}>
                    <FlatList
                        data={data.obtenerProyectos}
                        keyExtractor={(proyecto) => proyecto.id.toString()}
                        renderItem={({ item: proyecto }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Proyecto", proyecto)}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                            >
                                <Text>{proyecto.nombre}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }
})

export default Proyectos;