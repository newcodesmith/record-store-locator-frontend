import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Avatar, FormLabel, FormInput, Icon } from "react-native-elements"
import Stars from 'react-native-stars';



export default class AddCommentModal extends Component {
  state = {
    isModalVisible: false,
    rating: 0,
    comment: null,
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  addReview = (event) => {
    const reviewInfo = {
      comment_store_id: this.props.selectedStore,
      user_name: this.props.currentUserName,
      user_pic: this.props.currentUserPic,
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
      .then((data) => {
        console.log(data, 'Our test data');
        return this.props.getComments()
      })
      .then(this._toggleModal)
      .then(response => {
        this.setState({
          rating: 0,
          comment: null,
        })
      })
  }

  render() {

    // console.log(Object.getOwnPropertyNames(this.props), "modal");

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={this._toggleModal}>
          <Icon
            name='feedback'
            color='#e7e7e7'
          />
          <Text style={styles.addButtonText} >Add Review</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this._toggleModal}>
              <Icon
                name='edit'
                color='#616161'
                size={10}
              />
              <Text style={styles.editButton} >Close</Text>
            </TouchableOpacity>
            <View styles={styles.userInfo}>
              <Avatar
                large
                rounded
                source={{ uri: this.props.currentUserPic }}
                overlayContainerStyle={styles.pic}
              />
              <Text>{this.props.currentUserName}</Text>
            </View>
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
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  onPress={this.addReview}>
                  <Icon
                    name='feedback'
                    color='#e7e7e7'
                  />
                  <Text style={styles.saveButton}>Save Review</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 20
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#652d96'
  },
  userInfo: {
    alignItems: 'center',
  },
  saveButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#652d96',
    width: 125,
  },
  saveButton: {
    padding: 5,
    textAlign: "center",
    color: '#ffffff',
  },
  addButtonText: {
    color: '#ffffff',
    backgroundColor: '#652d96'
  }
});