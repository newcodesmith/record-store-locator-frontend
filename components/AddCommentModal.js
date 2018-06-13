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
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={this._toggleModal}>
          <Text style={styles.addButtonText}>Add Review</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity
                onPress={this._toggleModal}>
                <Icon
                  name='close-o'
                  type='evilicon'
                  color='#517fa4'
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Avatar
                style={styles.avatar}
                large
                rounded
                source={{ uri: this.props.currentUserPic }}
              />
              <Text
                style={styles.userName}
              >{this.props.currentUserName}</Text>
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
              <FormLabel
                labelStyle={styles.commentLabel}
              >Comment</FormLabel>
              <FormInput
                inputStyle={styles.commentInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({ comment: text })}
              />
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  onPress={this.addReview}>
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
    backgroundColor: '#2e4366'
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    margin: 20,
    fontSize: 20
  },
  commentLabel: {
    color: '#2e4366'
  },
  commentInput: {
    width: 275,
    justifyContent: 'flex-start',
    color: '#000000'
  },
  saveButtonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    margin: 10,
    padding: 10,
    textAlign: "center",
    color: '#ffffff',
    backgroundColor: '#2e4366',
    width: 125
  },
  addButtonText: {
    color: '#ffffff',
    backgroundColor: '#2e4366'
  }
});