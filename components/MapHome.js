import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Location from 'expo-location';
import MapStyle from './MapStyle.json'

export default class MapHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true })
    }

    let location = await Location.getCurrentPositionAsync({})
    this.setState({ locationResult: JSON.stringify(location) })

    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    })
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    const currentUserName = this.props.route?.params?.currentUserName;
    const currentUserPic = this.props.route?.params?.currentUserPic;
    const storeData = this.props.route?.params?.storeData || [];

    if (Platform.OS === 'web') {
      return (
        <View style={styles.webFallback}>
          <Text style={styles.webFallbackText}>Map view is available on iOS and Android.</Text>
        </View>
      );
    }

    const { default: MapView, PROVIDER_GOOGLE } = require('react-native-maps');
    const StoreLocations = require('./StoreLocations.js').default;

    return (
      <View
        style={styles.container}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={styles.map}
          initialRegion={{
            latitude: 39.739978,
            longitude: -104.9754614,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          region={this.state.mapRegion || undefined}
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
        >
          <StoreLocations
            navigation={this.props.navigation}
            storeData={storeData}
            currentUserName={currentUserName}
            currentUserPic={currentUserPic}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  map: {
    zIndex: 1,
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  webFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  webFallbackText: {
    color: '#2e4366',
    textAlign: 'center',
  },
});