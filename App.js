import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StoreProvider } from './src/context/StoreContext';
import { CommentsProvider } from './src/context/CommentsContext';
import HomeScreen from './src/screens/HomeScreen';
import MapHome from './src/screens/MapHome';
import StoreInfo from './src/screens/StoreInfo';
import { COLORS } from './src/constants/colors';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { color: '#ffffff' },
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="vinylMap"
        component={MapHome}
        options={{ title: 'Vinyl Finder Map' }}
      />
      <Stack.Screen
        name="storeInfo"
        component={StoreInfo}
        options={{ title: 'Store Information' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => (
  <SafeAreaProvider>
    <StoreProvider>
      <CommentsProvider>
        <RootNavigator />
      </CommentsProvider>
    </StoreProvider>
  </SafeAreaProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

