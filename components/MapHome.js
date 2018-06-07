import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';
import MapStyle from './MapStyle.json'

export default class MapHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      currentUser: this.props.navigation.state.params.userName,
      userPicture: this.props.navigation.state.params.userPic,
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
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
    this._getLocationAsync()
  }

  render() {
    return (

      <MapView
        provider={Expo.MapView.PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        style={{ flex: 1 }}
        region={this.state.mapRegion}
        onRegionChange={this._handleMapRegionChange}
        showsUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
      >
      </MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});