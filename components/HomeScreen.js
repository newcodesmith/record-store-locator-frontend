import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import Expo, { Constants } from 'expo';
import { SocialIcon } from "react-native-elements"
import { Actions } from 'react-native-router-flux';

export default class HomeScreen extends React.Component {

  state = {
    userName: null,
    userPic: {
      data: {
        url: ""
      }
    },
    storeData: [],
  };

  getLocations = () => {
    const locationUrl = "http://vinyl-finder-server.herokuapp.com/stores/";
    let locationDataGrab = response => {
      this.setState({ storeData: response });
    };
    return fetch(locationUrl)
      .then(response => response.json())
      .then(locationDataGrab)
      .catch(error => console.error(error))
  }

  login = () => {
    Expo.Facebook.logInWithReadPermissionsAsync('1149728978500849', {
      permissions: ["public_profile"]
    })
      .then(response => {
        const { token, type } = response
        if (type === "success") {
          fetch(`https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=${token}&fields=id,name,picture.type(large)`)
            .then((response) => response.json())
            .then((fbUserInfo) => {
              Actions.vinylMap({
                currentUserName: fbUserInfo.name,
                currentUserPic: fbUserInfo.picture,
                storeData: this.state.storeData,
              })
            })
            .catch(() => {
              reject("ERROR GETTING DATA FROM FACEBOOK")
            })
        } else {
          Alert.alert("Unable to connect to Facebook")
        }
      })
  };

  componentDidMount() {
    this.getLocations();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/vinyl_finder_logo.png')}
        />
        <SocialIcon
          title="Sign In With Facebook"
          button
          onPress={this.login}
          type="facebook"
          style={{ width: 250 }}
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
  logo: {
    marginBottom: 100,
    width: 300, 
    height: 100
  },
})