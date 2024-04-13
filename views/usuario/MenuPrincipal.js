import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const MenuPrincipal = ({ navigation, forwardedRef  }) => {
  return (
    <View style={styles.container} ref={forwardedRef}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.menuItem}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Text style={styles.menuItem}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Configuracion')}>
        <Text style={styles.menuItem}>Configuración</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default MenuPrincipal;
