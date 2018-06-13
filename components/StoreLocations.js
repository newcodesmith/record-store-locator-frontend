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

  openStoreInfo = (storeId) => {
    Actions.storeInfo({
      store_id: storeId,
      storeData: this.props.storeData,
      currentUserName: this.props.currentUserName,
      currentUserPic: this.props.currentUserPic,
    })
  }


  render() {
    const storeData = this.props.storeData;
    // console.log(Object.getOwnPropertyNames(this.props), "store location");
    

    return (
      storeData.map(storeData => {
        const latitude = parseFloat(storeData.latitude)
        const longitude = parseFloat(storeData.longitude)

       return(
        <MapView.Marker
          key={storeData.store_id}
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
          title={storeData.name}
          description={"Record Store"}
          onCalloutPress={() => {
            this.openStoreInfo(storeData.store_id);
          }}
        />
       )
      })
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