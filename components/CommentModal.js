import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
 
export default class CommentModal extends Component {
  state = {
    isModalVisible: false
  };
 
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text style={{ marginTop: 20, padding: 10, color:'#ffffff', backgroundColor:'#652d96' }}>Add Review</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>

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
    }
});