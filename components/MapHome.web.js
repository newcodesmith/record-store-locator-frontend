import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapHomeWeb = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Map view is available on iOS and Android.</Text>
  </View>
);

export default MapHomeWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  text: {
    color: '#2e4366',
    textAlign: 'center',
  },
});
