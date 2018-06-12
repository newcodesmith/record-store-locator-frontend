import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Avatar, FormLabel, FormInput } from "react-native-elements"
import Stars from 'react-native-stars';



export default class AddCommentModal extends Component {
  state = {
    isModalVisible: false,
    store_id: this.props.selectedStore,
    user_name: this.props.currentUserName,
    user_pic: this.props.currentUserPic,
    rating: 0,
    comment: null,
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  addReview = (event) => {
    const reviewInfo = {
      comment_store_id: this.state.store_id,
      user_name: this.state.user_name,
      user_pic: this.state.user_pic,
      rating: this.state.rating,
      comment: this.state.comment,
    }
    const updateUrl = "http://vinyl-finder-server.herokuapp.com/comments/";
    return fetch(updateUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewInfo)
    })
      .then(response => response.json())
      .catch(err => console.error(err))
      .then(() => this.props.getComments())
      .then(this._toggleModal)
      .then(response => {
        this.setState({
          store_id: this.props.store_id,
          user_name: this.props.currentUserName,
          user_pic: this.props.currentUserPic,
          rating: 0,
          comment: null,
        })
      })
  }

  render() {

    console.log(Object.getOwnPropertyNames(this.props), "modal");


    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text style={styles.button}>Add Review</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>
            <Avatar
              large
              rounded
              source={{ uri: this.props.userPic }}
              overlayContainerStyle={styles.pic}
            />
            <Text>{this.props.currentUserName}</Text>
            <View style={{ alignItems: 'center' }}>
              <Stars
                rating={0}
                update={(val) => { this.setState({ rating: val }) }}
                spacing={4}
                starSize={40}
                count={5}
                backingColor='#a1a1a1'
              />
            </View>
            <View>
              <FormLabel>Comment</FormLabel>
              <FormInput
                onChangeText={(text) => this.setState({ comment: text })}
              />
              <TouchableOpacity onPress={this.addReview}>
                <Text style={styles.button}>Save Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 10
  },
  button: {
    marginTop: 20,
    padding: 10,
    color: '#ffffff',
    backgroundColor: '#652d96'
  }
});