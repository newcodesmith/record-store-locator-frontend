import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Avatar } from "react-native-elements"
import { Constants, Location, Permissions } from 'expo';
import { MapView } from 'expo';
import MapStyle from './MapStyle.json'
import StoreLocations from './StoreLocations.js';

export default class MapHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      currentUserName: this.props.currentUserName,
      currentUserPic: this.props.currentUserPic,
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
    this._getLocationAsync();
  }

  render() {
    const currentUserName = this.props.currentUserName;
    const currentUserPic = this.props.currentUserPic.data.url;

    return (
      <View
        style={styles.container}
      >
        <MapView
          provider={Expo.MapView.PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={styles.map}
          initialRegion={{
            latitude: 39.739978,
            longitude: -104.9754614,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={false}
          showsMyLocationButton={true}
        >
          <StoreLocations 
          storeData= {this.props.storeData}
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
  pic: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2,
    margin: 0,
    padding: 0,
  },
  map: {
    zIndex: -1,
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});