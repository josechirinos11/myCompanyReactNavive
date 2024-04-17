import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
    let cameraRef = null;

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.takePictureAsync(options);
            console.log(data.uri); // La URI de la imagen tomada
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={(ref) => {
                    cameraRef = ref;
                }}
                style={{ flex: 1 }}
                captureAudio={false} // No se necesita captura de audio
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={takePicture} style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, color: 'white' }}>Tomar Foto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CameraScreen;
