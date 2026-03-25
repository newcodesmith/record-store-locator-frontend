import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapStyle from '../components/MapStyle.json';
import { COLORS } from '../constants/colors';

const MapHome = ({ navigation, route }) => {
  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const currentUserName = route?.params?.currentUserName;
  const currentUserPic = route?.params?.currentUserPic;
  const storeData = route?.params?.storeData || [];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      setIsLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setHasLocationPermissions(false);
        Alert.alert('Permission Denied', 'Location permission is required for optimal map experience.');
        setIsLoadingLocation(false);
        return;
      }

      setHasLocationPermissions(true);
      
      const location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Location Error', 'Could not retrieve your location.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webFallback}>
        <Text style={styles.webFallbackText}>
          Map view is available on iOS and Android.
        </Text>
      </View>
    );
  }

  const { default: MapView, PROVIDER_GOOGLE } = require('react-native-maps');
  const StoreLocations = require('../components/StoreLocations').default;

  return (
    <View style={styles.container}>
      {isLoadingLocation && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        style={styles.map}
        initialRegion={{
          latitude: 39.739978,
          longitude: -104.9754614,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={mapRegion || undefined}
        zoomEnabled
        pitchEnabled
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
      >
        <StoreLocations
          navigation={navigation}
          storeData={storeData}
          currentUserName={currentUserName}
          currentUserPic={currentUserPic}
        />
      </MapView>
    </View>
  );
};

export default MapHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  map: {
    zIndex: 1,
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  webFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  webFallbackText: {
    color: COLORS.primary,
    textAlign: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
