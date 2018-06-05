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


export default class HomeScreen extends React.Component {

  state = {
    userName: null,
    userPicture: {
      data: {
        url: ""
      }
    }
  };


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
              this.setState({
                userName: fbUserInfo.name,
                userPic: fbUserInfo.picture
              })
              console.log(this.state, "the state");
              console.log(this.props, "the props");
              
              // this.props.navigation.navigate("MapHome", { userInfo: this.state })
            })
            .catch(() => {
              reject("ERROR GETTING DATA FROM FACEBOOK")
            })
        } else {
          Alert.alert("Unable to connect to Facebook")
        }
      })
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Find My Record Store</Text>
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
  headline: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    marginBottom: 100
  },
})
