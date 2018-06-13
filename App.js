import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import HomeScreen from './components/HomeScreen.js';
import MapHome from './components/MapHome.js';
import StoreInfo from './components/StoreInfo.js';

const App = () => (
  <Router 
  navigationBarStyle={{ backgroundColor: '#2e4366' }}
  headerTintColor='#ffffff'
  titleStyle={{ color: '#ffffff' }}>
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
        title="Vinyl Finder Map"
      />
      <Scene
        key="storeInfo"
        component={StoreInfo}
        title="Store Information"
        
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

