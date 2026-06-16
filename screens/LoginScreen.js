import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signIn } from "../services/authService"; // Import authentication service

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password!');
      return;
    }

    try {
      const user = await signIn(email.trim(), password);
      console.log("Logged in user:", user);
      navigation.replace('Home'); // Navigate to HomeScreen after successful login
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found'
        ? 'User not found. Please check your email or sign up.'
        : error.code === 'auth/wrong-password'
        ? 'Incorrect password. Please try again.'
        : error.message;

      Alert.alert('Login Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9E9E9E"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9E9E9E"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password recovery is under construction!')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6DAF7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#6A1B9A',
    borderWidth: 1,
  },
  forgotPassword: {
    color: '#6A1B9A',
    fontSize: 14,
    textAlign: 'right',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
    color: '#4A148C',
  },
  signupLink: {
    fontSize: 16,
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
});
