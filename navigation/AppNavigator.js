// Updated AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SymptomTrackingScreen from '../screens/SymptomTrackingScreen';
import CameraScreen from '../screens/CameraScreen';
import DiagnosisPredictionScreen from '../screens/DiagnosisPredictionScreen';
import PredictionScreen from '../screens/PredictionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DataVisualizationScreen from '../screens/DataVisualizationScreen';
import PeerSupportScreen from '../screens/PeerSupportScreen';
import UploadScreen from '../screens/UploadScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SymptomTracking" component={SymptomTrackingScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="DiagnosisPrediction" component={DiagnosisPredictionScreen} />
      <Stack.Screen name="PredictionScreen" component={PredictionScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="DataVisualization" component={DataVisualizationScreen} />
      <Stack.Screen name="PeerSupport" component={PeerSupportScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}
