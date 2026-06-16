// Fully updated CameraScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please enable it in settings.</Text>;
  }

  const captureImage = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        setCapturedMedia(photo.uri);
        setCameraActive(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to capture image.");
      console.error("❌ Capture error:", error);
    }
  };

  const retakeImage = () => {
    setCapturedMedia(null);
    setCameraActive(true);
  };

  const handleDone = () => {
    if (capturedMedia) {
      navigation.navigate('DiagnosisPredictionScreen', { media: capturedMedia });
    } else {
      Alert.alert("⚠️ No Image", "Please capture an image first.");
    }
  };

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <Camera style={styles.camera} ref={cameraRef} ratio="16:9">
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
              <Text style={styles.buttonText}>📸 Capture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedMedia }} style={styles.previewImage} />
          <TouchableOpacity style={styles.retakeButton} onPress={retakeImage}>
            <Text style={styles.buttonText}>🔄 Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.buttonText}>✔ Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5F5F5",
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: "#FF4081",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 250,
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});