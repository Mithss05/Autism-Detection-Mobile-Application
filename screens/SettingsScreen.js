import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleTheme = () => setDarkTheme(prev => !prev);
  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been successfully logged out!', [
      { text: 'OK', onPress: () => console.log('User logged out') },
    ]);
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkBackground]}>
      <Text style={[styles.heading, darkTheme && styles.darkText]}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, darkTheme && styles.darkText]}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ true: '#6A1B9A', false: '#ccc' }}
          thumbColor={notificationsEnabled ? '#fff' : '#ccc'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.settingLabel, darkTheme && styles.darkText]}>Enable Dark Theme</Text>
        <Switch
          value={darkTheme}
          onValueChange={toggleTheme}
          trackColor={{ true: '#6A1B9A', false: '#ccc' }}
          thumbColor={darkTheme ? '#fff' : '#ccc'}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  darkBackground: { backgroundColor: '#333' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#4A148C', marginBottom: 30 },
  darkText: { color: '#FFF' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  settingLabel: { fontSize: 18, color: '#4A148C' },
  logoutButton: { marginTop: 40, backgroundColor: '#D32F2F', paddingVertical: 15, borderRadius: 5, alignItems: 'center' },
  logoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
