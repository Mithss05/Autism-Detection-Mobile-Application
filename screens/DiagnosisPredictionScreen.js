import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";  // For picking images
import axios from "axios";  // Assuming you will use axios for API calls

const DiagnosisPredictionScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [eyeContact, setEyeContact] = useState("");
  const [repetitiveBehavior, setRepetitiveBehavior] = useState("");
  const [speechDelay, setSpeechDelay] = useState("");
  const [sensorySensitivity, setSensorySensitivity] = useState("");
  const [socialInteraction, setSocialInteraction] = useState("");
  const [unusualPlay, setUnusualPlay] = useState("");
  const [image, setImage] = useState(null);  // For storing the selected image

  const handlePrediction = async () => {
    if (
      !age ||
      !eyeContact ||
      !repetitiveBehavior ||
      !speechDelay ||
      !sensorySensitivity ||
      !socialInteraction ||
      !unusualPlay ||
      !image
    ) {
      Alert.alert("Input Error", "Please fill in all fields and upload an image.");
      return;
    }

    // Prepare symptom data for API call
    const symptoms = {
      age,
      eyeContact,
      repetitiveBehavior,
      speechDelay,
      sensorySensitivity,
      socialInteraction,
      unusualPlay,
    };

    try {
      // API call for prediction (image and symptoms)
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg", // Modify according to your image format
        name: "image.jpg",
      });
      formData.append("symptoms", JSON.stringify(symptoms));

      const response = await axios.post("YOUR_API_URL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;  // Assuming API returns a result like { prediction: "autistic" }
      
      if (result.prediction === "autistic") {
        Alert.alert("Prediction", "The person is predicted to be autistic.");
      } else {
        Alert.alert("Prediction", "The person is predicted to not be autistic.");
      }

    } catch (error) {
      console.error("Error during prediction:", error);
      Alert.alert("Error", "An error occurred while making the prediction.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ASD Diagnosis Prediction</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Eye Contact (Yes/No)"
        value={eyeContact}
        onChangeText={setEyeContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetitive Behavior (Yes/No)"
        value={repetitiveBehavior}
        onChangeText={setRepetitiveBehavior}
      />
      <TextInput
        style={styles.input}
        placeholder="Speech Delay (Yes/No)"
        value={speechDelay}
        onChangeText={setSpeechDelay}
      />
      <TextInput
        style={styles.input}
        placeholder="Sensory Sensitivity (Yes/No)"
        value={sensorySensitivity}
        onChangeText={setSensorySensitivity}
      />
      <TextInput
        style={styles.input}
        placeholder="Difficulty with Social Interaction (Yes/No)"
        value={socialInteraction}
        onChangeText={setSocialInteraction}
      />
      <TextInput
        style={styles.input}
        placeholder="Unusual Play Behavior (Yes/No)"
        value={unusualPlay}
        onChangeText={setUnusualPlay}
      />

      {/* Image upload section */}
      <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.predictButton} onPress={handlePrediction}>
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#6A1B9A",
  },
  predictButton: {
    backgroundColor: "#8E24AA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageUploadButton: {
    backgroundColor: "#8E24AA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
});

export default DiagnosisPredictionScreen;
