import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DataVisualizationScreen() {
  const data = {
    labels: ['DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'],
    datasets: [
      {
        data: [1, 2, 3, 2, 1, 3],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Autism Level Tracking</Text>
      <LineChart
        data={data}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#1E293B',
          backgroundGradientFrom: '#1E293B',
          backgroundGradientTo: '#1E293B',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.legendContainer}>
        <View style={[styles.legendBox, { backgroundColor: '#ff6384' }]} >
          <Text style={styles.legendText}>Severe</Text>
        </View>
        <View style={[styles.legendBox, { backgroundColor: '#ffcd56' }]} >
          <Text style={styles.legendText}>Moderate</Text>
        </View>
        <View style={[styles.legendBox, { backgroundColor: '#36a2eb' }]} >
          <Text style={styles.legendText}>Mild</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Current Level</Text>
          <Text style={styles.statValue}>Severe</Text>
          <Text style={styles.statDate}>4 April</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Most Recent Severity</Text>
          <Text style={styles.statValue}>Moderate</Text>
          <Text style={styles.statDate}>30 March</Text>
        </View>
      </View>

      <View style={styles.footerStats}>
        <Text style={styles.footerText}>Users Engaged: 367</Text>
        <Text style={styles.footerText}>Total Users: 1574</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E293B', padding: 10 },
  title: { fontSize: 24, color: '#FFFFFF', textAlign: 'center', marginVertical: 20 },
  chart: { marginVertical: 8, borderRadius: 16 },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 },
  legendBox: { width: 60, height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5 },
  legendText: { color: '#FFFFFF', fontSize: 12 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  statBox: { backgroundColor: '#2D3748', padding: 10, borderRadius: 10, alignItems: 'center', width: '30%' },
  statTitle: { color: '#FFFFFF', fontSize: 14 },
  statValue: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  statDate: { color: '#FFFFFF', fontSize: 12 },
  footerStats: { marginTop: 30, alignItems: 'center' },
  footerText: { color: '#FFFFFF', fontSize: 14 },
});
