import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Avatar, FormLabel, FormInput, Icon } from "react-native-elements"
import Stars from 'react-native-stars';



export default class EditCommentModal extends Component {
    state = {
        isModalVisible: false,
        rating: this.props.rating,
        comment: this.props.comment,
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    updateComment = (event) => {
        const commentId = this.props.selectedComment
        const reviewInfo = {
            rating: this.state.rating,
            comment: this.state.comment,
        }
        const updateUrl = `http://vinyl-finder-server.herokuapp.com/comments/${commentId}`;
        return fetch(updateUrl, {
            method: "PUT",
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
    }

    deleteComment = (commentId) => {
        let deleteUrl = `http://vinyl-finder-server.herokuapp.com/comments/${commentId}`;
        return fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .catch(err => console.error(err));
    }



    render() {        
        return (
            <View style={{ flex: 1 }}>
                <View>
                    {this.props.commentUserName === this.props.currentUserName ?
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this._toggleModal}>
                            <Icon
                                name='edit'
                                color='#616161'
                                size={10}
                            />
                            <Text style={styles.editButton}>Edit Review</Text>
                        </TouchableOpacity> : null}
                </View>                
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
                        <Avatar
                            large
                            rounded
                            source={{ uri: this.props.currentUserPic }}
                            overlayContainerStyle={styles.pic}
                        />
                        <Text>{this.props.currentUserName}</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Stars
                                rating={this.props.rating}
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
                                defaultValue={this.props.comment}
                                onChangeText={(text) => this.setState({ comment: text })}
                            />
                            <TouchableOpacity
                                onPress={this.addReview}>
                                <Icon
                                    name='feedback'
                                    color='#e7e7e7'
                                />
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
    addButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#652d96'
    },
    button: {
        marginTop: 20,
        padding: 10,
        color: '#ffffff',
        backgroundColor: '#652d96'
    },
    addButtonText: {
        color: '#ffffff',
        backgroundColor: '#652d96'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    editButton: {
        color: '#616161',
        textAlign: 'center',
        fontSize: 10,
        justifyContent: 'flex-end'
    }
});