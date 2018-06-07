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
      currentUser: this.props.userName,
      userPicture: this.props.userPic,
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
    console.log(this.props.userName, 'map state');

  }

  componentDidMount() {
    this._getLocationAsync()
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.paragraph}>{this.props.currentUser}</Text>
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
          showsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
        >
        <View>
          <MapView.Marker
            coordinate={{
              latitude: 39.740188,
              longitude: -104.956992
            }}
            title={"Twist & Shout"}
            description={"Record Store"}
          />
          <MapView.Marker
            coordinate={{
              latitude: 39.736965,
              longitude: -104.978906
            }}
            title={"Wax Trax"}
            description={"Record Store"}
          />

        </View>


        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    zIndex: 1
  },
  map: {
    zIndex: 0,
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