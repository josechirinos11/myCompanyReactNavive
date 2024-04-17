import { StyleSheet } from 'react-native';

const usuarioStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column', // Mostrar botones en columna
        alignItems: 'center', // Centrar botones horizontalmente
        marginTop: 20, // Margen superior
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
modalView: {
    backgroundColor: '#e0e0e0',
   
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    
}

});

export default usuarioStyles;