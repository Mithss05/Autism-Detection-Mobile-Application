import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const modules = [
  { id: '1', name: 'Symptom Tracking', image: require('../assets/images/symptom_tracking.png') },
  { id: '2', name: 'Diagnosis Prediction', image: require('../assets/images/diagnosis_prediction.png') },
  { id: '3', name: 'Peer Support', image: require('../assets/images/peer_support.png') },
  { id: '4', name: 'Data Visualization', image: require('../assets/images/data_visualization.png') },
  { id: '5', name: 'About Us', image: require('../assets/images/about_us.png') },
];

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Check if email is verified
        if (parsedUser && !parsedUser.emailVerified) {
          Alert.alert("Please verify your email before continuing.");
        }
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const renderModule = ({ item }) => (
    <TouchableOpacity 
      style={styles.module} 
      onPress={() => {
        if (item.name === 'About Us') {
          navigation.navigate('AboutUs');
        } else if (item.name === 'Symptom Tracking') {
          navigation.navigate('SymptomTracking');
        } else if (item.name === 'Diagnosis Prediction') {
          navigation.navigate('DiagnosisPrediction');
        } else if (item.name === 'Peer Support') {
          navigation.navigate('PeerSupport');
        } else if (item.name === 'Data Visualization') {
          navigation.navigate('DataVisualization');
        }
      }}
    >
      <Image source={item.image} style={styles.moduleImage} />
      <Text style={styles.moduleText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/images/profile_icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.tagline}>ASD TRACKER</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../assets/images/settings_icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={modules}
        renderItem={renderModule}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6DAF7',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#8E24AA',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  grid: {
    padding: 20,
  },
  module: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  moduleImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  moduleText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A148C',
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
});
