initialRegion={{
    latitude: 39.739978,
    longitude: -104.9754614,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }}


  const userPic = this.props.userPic.data.url;


          <Avatar
          large
          rounded
          source={{ uri: userPic }}
          overlayContainerStyle={styles.pic}
        />



import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import Expo, { Constants } from 'expo';
import { WebBrowser } from 'expo';
import { SocialIcon, Avatar } from "react-native-elements"
import { MapView } from 'expo';

import { Actions } from 'react-native-router-flux';

export default class StoreLocations extends React.Component {

  state = {
    storeData: null,
  };


  getLocations = () => {
    const locationUrl = "http://vinyl-finder-server.herokuapp.com/stores/1";
    let locationDataGrab = response => {
      this.setState({ storeData: response });
      console.log(this.state.storeData, "Locations")

    };
    return fetch(locationUrl)
      .then(response => response.json())
      .then(locationDataGrab)
      .catch(error => console.log(error))


  }

  openStoreInfo = (MarkerData) => {
    Actions.storeInfo(MarkerData)
  }

  componentDidMount() {
    this.getLocations();
  }

  render() {
    return (
      <View>
        <MapView.Marker
          key={1}
          coordinate={{
            latitude: 39.740188,
            longitude: -104.956992
          }}
          title={"Twist & Shout"}
          description={"Record Store"}
          onCalloutPress={()=> {
            console.log("lhadfv");
            this.openStoreInfo(this, this.Marker)
            }}
        />
        <MapView.Marker
          id={2}
          coordinate={{
            latitude: 39.736965,
            longitude: -104.978906
          }}
          title={"Wax Trax Records"}
          description={"Record Store"}
        />
        <MapView.Marker
          id={3}
          coordinate={{
            latitude: 39.740255,
            longitude: -104.975018
          }}
          title={"Angelo's CDs & More"}
          description={"Record Store"}
        />
        <MapView.Marker
          id={4}
          coordinate={{
            latitude: 39.736297,
            longitude: -104.993243
          }}
          title={"Recollect Records"}
          description={"Record Store"}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e4366",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    marginBottom: 100
  },
})