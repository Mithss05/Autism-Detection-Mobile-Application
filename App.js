import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Screen imports
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import SymptomTrackingScreen from './screens/SymptomTrackingScreen';
import UploadScreen from './screens/UploadScreen';
import PeerSupportScreen from './screens/PeerSupportScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import DiagnosisPredictionScreen from './screens/DiagnosisPredictionScreen';
import PredictionScreen from './screens/PredictionScreen';
import DataVisualizationScreen from './screens/DataVisualizationScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import CameraScreen from './screens/CameraScreen';

// Model utilities
import { loadLocalModel, prepareInput, runInference } from './utils/modelLoader';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    runPrediction();
  }, []);

  const runPrediction = async () => {
    try {
      const modelPath = require('./assets/models/image_classification_model.onnx');
      const session = await loadLocalModel(modelPath);
      if (session) {
        const inputData = new Float32Array([/* your input data */]);
        const inputTensor = prepareInput(inputData, [/* input dimensions */]);
        await runInference(session, inputTensor);
      }
    } catch (error) {
      console.error('❌ Prediction error:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SymptomTracking" component={SymptomTrackingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PeerSupport" component={PeerSupportScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DiagnosisPrediction" component={DiagnosisPredictionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PredictionScreen" component={PredictionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DataVisualization" component={DataVisualizationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;