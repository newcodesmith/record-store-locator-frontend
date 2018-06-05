import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {YellowBox} from 'react-native'
console.disableYellowBox = true

import HomeScreen from './Components/HomeScreen.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
