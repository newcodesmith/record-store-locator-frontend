import React, { Component } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Modal } from "react-native";
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
        const updateUrl = `https://vinyl-finder-server-6897eaebc32c.herokuapp.com/comments/${commentId}`;
        return fetch(updateUrl, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewInfo)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to update review (${response.status})`);
                }
                return response.json();
            })
            .then(this._toggleModal)
            .then(() => this.props.getComments())
            .catch(err => {
                console.error(err);
                Alert.alert('Unable to update review', 'The server returned an error. Please try again shortly.');
            })
    }

    deleteComment = (event) => {
        const commentId = this.props.selectedComment
        const deleteUrl = `https://vinyl-finder-server-6897eaebc32c.herokuapp.com/comments/${commentId}`;
        return fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete review (${response.status})`);
                }
            })
            .then(() => this.props.getComments())
            .catch(err => {
                console.error(err);
                Alert.alert('Unable to delete review', 'The server returned an error. Please try again shortly.');
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    {this.props.commentUserName === this.props.currentUserName ?
                        <TouchableOpacity
                            style={styles.editButtonContainer}
                            onPress={this._toggleModal}>
                            <Text style={styles.editGlyph}>✎</Text>
                            <Text style={styles.editButton}>Edit Review</Text>
                        </TouchableOpacity> : null}
                </View>
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
                                    rating={this.props.rating}
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
    editGlyph: {
        color: '#616161',
        fontSize: 10,
        marginRight: 4,
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
        flexDirection: 'row',
        alignItems: 'center'
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