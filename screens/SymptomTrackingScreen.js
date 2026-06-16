import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';

export default function SymptomTrackingScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleOpenCamera = async () => {
    if (hasPermission === false) {
      Alert.alert("Permission Denied", "Enable camera access in settings.");
      return;
    }
    setCameraActive(true);
  };

  const handleCloseCamera = () => setCameraActive(false);

  const handleCapturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setPhotoUri(photo.uri);
      setCameraActive(false);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleTickAndNavigate = () => {
    if (photoUri) {
      navigation.navigate("DiagnosisPrediction", { photoUri });
    } else {
      Alert.alert("No Photo", "Capture or select an image first.");
    }
  };

  if (cameraActive) {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.captureButton} onPress={handleCapturePhoto}>
              <Text style={styles.buttonText}>📸 Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseCamera}>
              <Text style={styles.buttonText}>❌ Close</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Symptom Tracking</Text>
      <TouchableOpacity style={styles.openCameraButton} onPress={handleOpenCamera}>
        <Text style={styles.buttonText}>📷 Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pickImageButton} onPress={handlePickImage}>
        <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
      </TouchableOpacity>

      {photoUri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
          <TouchableOpacity style={styles.tickButton} onPress={handleTickAndNavigate}>
            <Text style={styles.buttonText}>✔ Proceed to Diagnosis Prediction</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  openCameraButton: { backgroundColor: "#6200EA", padding: 15, borderRadius: 10, marginBottom: 10 },
  pickImageButton: { backgroundColor: "#FF9800", padding: 15, borderRadius: 10, marginBottom: 10 },
  tickButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  cameraContainer: { flex: 1 },
  camera: { flex: 1, justifyContent: "flex-end" },
  cameraControls: { flexDirection: "row", justifyContent: "space-between", padding: 20 },
  captureButton: { backgroundColor: "#FF4081", padding: 15, borderRadius: 50 },
  closeButton: { backgroundColor: "#D32F2F", padding: 15, borderRadius: 50 },
  previewContainer: { marginTop: 20, alignItems: "center" },
  previewImage: { width: 200, height: 200, borderRadius: 10 },
});
