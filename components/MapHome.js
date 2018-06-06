import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MapHome =() => (
      <View style={styles.container}>
          <Text>Hello</Text>
      </View>
    );

export default  MapHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});