import React, { Component } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Modal } from "react-native";
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
    const updateUrl = "https://vinyl-finder-server-6897eaebc32c.herokuapp.com/comments/";
    return fetch(updateUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewInfo)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to add review (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        return this.props.getComments()
      })
      .then(this._toggleModal)
      .then(response => {
        this.setState({
          rating: 0,
          comment: null,
        })
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Unable to save review', 'The server returned an error. Please try again shortly.');
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
        <Modal
          visible={this.state.isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={this._toggleModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity
                  onPress={this._toggleModal}>
                  <Text style={styles.closeButton}>×</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <Image
                  style={styles.avatar}
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
                <Text style={styles.commentLabel}>Comment</Text>
                <TextInput
                  style={styles.commentInput}
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
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
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
  closeButton: {
    color: '#517fa4',
    fontSize: 38,
    lineHeight: 38,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 4,
    padding: 8,
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