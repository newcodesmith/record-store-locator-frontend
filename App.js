import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native'
console.disableYellowBox = true
import { StackNavigator } from "react-navigation"

import HomeScreen from './components/HomeScreen.js';
import MapHome from './components/MapHome.js';

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: App,
  },
  MapHome: {
    screen: MapHome,
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e4366',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
