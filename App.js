import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native';
console.disableYellowBox = true;
// import { createStackNavigator } from "react-navigation";
import { Router, Scene } from 'react-native-router-flux';

import HomeScreen from './components/HomeScreen.js';
import MapHome from './components/MapHome.js';

const App = () => (
    <Router>
      <Scene
        key="root">
        <Scene 
          key="home"
          component={HomeScreen}
          style={styles.container}
          hideNavBar={true}
          initial
        />
        <Scene
          key="vinylMap"
          component={MapHome}
          title="Vinyl Map"
        />
      </Scene>
    </Router>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e4366',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

