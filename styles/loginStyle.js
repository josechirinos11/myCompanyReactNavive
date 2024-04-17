import { StyleSheet } from 'react-native';
import { green, red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const login = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Fondo transparente
    },

    contenidoPrincipal: {


        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        width: '90%',
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        padding: 32,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20,
    },
    contenidoSecundario: {

        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '40%',
        width: '50%',
        alignItems: 'center',
        paddingTop: 20,
    },
    botonContainer: {
        marginBottom: 8,
    },
    neumorphismImput: {
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        shadowColor: '#bebebe',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 60,
        elevation: 40, // Para sombra en Android
    },
    neumorphismBoton: {

        borderRadius: 50,
        backgroundColor: '#2874A6',
        shadowColor: '#22638d',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 60,
        elevation: 40, // Para sombra en Android
    },
    neumorphism: {
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        shadowColor: '#bebebe',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 60,
        elevation: 40, // Para sombra en Android
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
    textoTitulo: {

        textAlign: 'center',
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#374151',
        fontFamily: 'Rubik', // Fuente
    },

    loginCss: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#d1d5db',

        paddingHorizontal: 20,

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#374151', // Color del borde
        borderWidth: 1, // Grosor del borde
        flex: 1,
        width: '80%',

    },
    entrarCss: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        flex: 1,
        backgroundColor: '#374151',


        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#374151', // Color del borde
        borderWidth: 1, // Grosor del borde


    },
    textoLogin: {
        textAlign: 'center',
        color: '#374151',
        fontWeight: 'bold',
    },
    textoEntrar: {
        textAlign: 'center',
        color: '#d1d5db',
        fontWeight: 'bold',
    },

    image: {


    },

    titulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
    },
    subtitulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 20,
    },
    input: {


        borderRadius: 15,
        padding: 10, // ajusta según tu preferencia
        marginBottom: 20,
        width: '100%',
        color: '#666',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2, // Solo para Android, simula la sombra en iOS

    },
    inputsContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center', // Cambiado a alignItems
        justifyContent: 'center',
    },
    contenedoresBotones: {

        flexDirection: 'row',
        justifyContent: 'space-between', // Distribuir los elementos de manera uniforme en el espacio disponible
        // Agregar un margen horizontal para separar los botones del borde de la pantalla
    },
    boton: {
        backgroundColor: '#28303B',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '45%', // Ancho del botón
        marginHorizontal: 20,
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
    },
    enlace: {
        color: '#FFF',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
    },
});

export default login;
