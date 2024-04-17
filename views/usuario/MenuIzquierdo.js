import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const MenuIzquierdo = ({ navigation, forwardedRef  }) => {
  return (
    <View style={styles.container} ref={forwardedRef}>
      <TouchableOpacity onPress={() => navigation.navigate('Cliente')}>
        <Text style={styles.menuItem}>Agregar Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Proveedor')}>
        <Text style={styles.menuItem}>Agregar Proveedor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Producto')}>
        <Text style={styles.menuItem}>Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default MenuIzquierdo;
