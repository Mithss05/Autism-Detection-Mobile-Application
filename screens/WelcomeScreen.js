import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      {/* Tagline */}
      <Text style={styles.tagline}>
        Autism Spectrum Disorder Detection and Symptom Tracking
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')} // Navigate to login screen on button press
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6DAF7', // Pastel Purple background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50, // Added more padding to move everything down
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
