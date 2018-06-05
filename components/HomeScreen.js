import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { SocialIcon, Avatar } from "react-native-elements"

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Find My Record Store</Text>
        <SocialIcon
          title="Sign In With Facebook"
          button
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
    backgroundColor: "#1B4353",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    marginBottom: 100 
  },
  back: {
    backgroundColor: "#6DAEDB",
  }
})
