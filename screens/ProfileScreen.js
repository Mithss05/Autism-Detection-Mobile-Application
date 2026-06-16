import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { auth, firestore, storage } from "../services/firebase"; // ✅ Correct path
import { getDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const user = auth.currentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState("19");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const docRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setName(userData.name || "");
        setAge(userData.age || "");
        setPhone(userData.phone || "");
        setAddress(userData.address || "");
        setBio(userData.bio || "");
        setProfilePic(userData.profilePic || null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Error", "Please fill all the required fields.");
      return;
    }
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        name,
        email,
        age,
        phone,
        address,
        bio,
        profilePic,
      }, { merge: true });
      Alert.alert("Success", "Profile Updated Successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera roll permissions to update your profile picture.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      uploadProfilePic(result.assets[0].uri);
    }
  };

  const uploadProfilePic = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePic(downloadURL);
      await setDoc(doc(firestore, "users", user.uid), { profilePic: downloadURL }, { merge: true });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profilePicContainer}>
        <Image source={{ uri: profilePic || "https://via.placeholder.com/120" }} style={styles.profilePic} />
        <TouchableOpacity style={styles.editPicButton} onPress={handlePickImage}>
          <Text style={styles.editPicText}>Change Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Profile Information</Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />
        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
        <Text style={styles.label}>Short Bio</Text>
        <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} multiline />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20 },
  profilePicContainer: { alignItems: "center", marginVertical: 20 },
  profilePic: { width: 120, height: 120, borderRadius: 60, resizeMode: "cover" },
  editPicButton: { marginTop: 10, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#8E24AA", borderRadius: 5 },
  editPicText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
  infoContainer: { marginTop: 20 },
  heading: { fontSize: 22, fontWeight: "bold", color: "#4A148C", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#4A148C", marginBottom: 5 },
  input: { height: 50, borderColor: "#ddd", borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingLeft: 10, fontSize: 16, color: "#4A148C" },
  bioInput: { height: 80, textAlignVertical: "top" },
  updateButton: { backgroundColor: "#6A1B9A", paddingVertical: 15, borderRadius: 5, alignItems: "center", marginTop: 20 },
  updateButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
