import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    }, 
    titulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF'
    }, 
    subtitulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 20
    },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 20
    }, 
    boton: {
        backgroundColor: '#28303B',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    }, 
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    }, 
    enlace: {
        color: '#FFF',
        marginTop: 60, 
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    image: {


    },
    textoMy: {

        textAlign: 'center',
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#E67E22',
        fontFamily: 'Rubik', // Fuente
    },
    textoCompany: {

        textAlign: 'center',
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#2874A6',
        fontFamily: 'Rubik', // Fuente
    },
});

export default globalStyles;