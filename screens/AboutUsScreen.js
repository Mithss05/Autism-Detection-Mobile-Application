import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

export default function AboutUsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>About Us</Text>
      </View>

      <Text style={styles.text}>
        Our app is designed to help individuals with Autism Spectrum Disorder (ASD), caregivers, and healthcare professionals
        track symptoms, receive AI-driven insights, and engage in supportive peer interactions.
      </Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Our Mission</Text>
        <Text style={styles.text}>
          We aim to leverage technology to provide personalized symptom tracking, diagnosis predictions, and intervention
          recommendations, improving the lives of those affected by ASD.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Our Vision</Text>
        <Text style={styles.text}>
          We envision a world where technology bridges the communication gap for individuals with ASD, empowering them to
          lead independent lives with the right support and resources.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Key Features</Text>
        <Text style={styles.text}>
          - **AI-Powered Symptom Tracking**: Monitor behavioral patterns and track progress.
        </Text>
        <Text style={styles.text}>
          - **Diagnosis Prediction**: Get real-time insights based on symptoms and machine learning models.
        </Text>
        <Text style={styles.text}>
          - **Peer Support**: Connect with a community of caregivers, professionals, and individuals experiencing similar
          challenges.
        </Text>
        <Text style={styles.text}>
          - **Personalized Interventions**: Receive therapy recommendations tailored to individual needs.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or feedback, feel free to reach out to us at support@asdapp.com.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  text: { fontSize: 16, color: '#666', marginBottom: 15 },
  section: { marginTop: 20 },
  subTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A148C', marginBottom: 5 },
});