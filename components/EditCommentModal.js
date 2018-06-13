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
            .then(this._toggleModal)
            .then(() => this.props.getComments())
    }

    deleteComment = (event) => {
        const commentId = this.props.selectedComment
        const deleteUrl = `http://vinyl-finder-server.herokuapp.com/comments/${commentId}`;
        return fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .catch(err => console.error(err))
            .then(() => this.props.getComments())
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    {this.props.commentUserName === this.props.currentUserName ?
                        <TouchableOpacity
                            style={styles.editButtonContainer}
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
                                inputStyle={styles.commentInput}
                                multiline={true}
                                numberOfLines={4}
                                defaultValue={this.props.comment}
                                onChangeText={(text) => this.setState({ comment: text })}
                            />
                            <View style={styles.saveButtonContainer}>
                                <TouchableOpacity
                                    onPress={this.updateComment}>
                                    <Text style={styles.saveButton}>Save Review</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.deleteComment}>
                                    <Text style={styles.saveButton}>Delete Review</Text>
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
    editButtonContainer: {
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
    },
    closeButtonContainer: {
        alignItems: 'flex-end'
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        margin: 20,
        fontSize: 20
    },
    commentInput: {
        width: 275,
        justifyContent: 'flex-start',
        color: '#000000'
    },
    saveButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    saveButton: {
        margin: 10,
        padding: 10,
        textAlign: "center",
        color: '#ffffff',
        backgroundColor: '#2e4366',
        width: 125
    }
});