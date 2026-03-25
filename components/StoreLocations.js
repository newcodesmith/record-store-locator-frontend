import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

export default class StoreLocations extends React.Component {

  openStoreInfo = (storeId) => {
    this.props.navigation.navigate('storeInfo', {
      store_id: storeId,
      storeData: this.props.storeData,
      currentUserName: this.props.currentUserName,
      currentUserPic: this.props.currentUserPic,
    })
  }

  render() {
    const storeData = this.props.storeData;
    return (
      storeData.map(storeData => {
        const latitude = parseFloat(storeData.latitude)
        const longitude = parseFloat(storeData.longitude)

        return (
          <Marker
            key={storeData.store_id}
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
            image={require('../assets/vinyl_finder_marker.png')}
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
})