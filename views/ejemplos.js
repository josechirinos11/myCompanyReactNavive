<View>
<Text>MyCompany</Text>
<View>
    <TouchableOpacity
        style={globalStyles.boton}
        onPress={() => mensajes()}
    >
        <Text style={globalStyles.botonTexto}>
            Iniciar Sesión
        </Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={globalStyles.boton}
        onPress={() => mensajes()}
    >
        <Text style={globalStyles.botonTexto}>
            Iniciar Sesión
        </Text>
    </TouchableOpacity>
</View>
</View>
----------------------------------------------------------------



<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={[globalStyles.contenedor, { backgroundColor: '#e84347' }]}>
    <View style={globalStyles.contenido}>
        <Text style={globalStyles.titulo}>TaskControl</Text>

        <View style={globalStyles.input}>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={texto => guardarEmail(texto.toLowerCase())}
                value={email}
                onBlur={Keyboard.dismiss}
            />
        </View>


        <View style={globalStyles.input}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={texto => guardarPassword(texto)}
                onBlur={Keyboard.dismiss}

            />
        </View>



        <TouchableOpacity
            style={[globalStyles.boton, { backgroundColor: 'black' }]}
            onPress={() => handleSubmit()}
        >
            <Text style={[globalStyles.botonTexto, { color: 'white' }]}>
                Iniciar Sesión
            </Text>
        </TouchableOpacity>







        <Text
            onPress={() => navigation.navigate("CrearCuenta")}
            style={globalStyles.enlace}
        >Crear Cuenta</Text>

        {mensaje && mostrarAlerta()}



    </View>
</View>

</TouchableWithoutFeedback>
