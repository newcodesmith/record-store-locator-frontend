import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import { Avatar, Icon } from 'react-native-elements';
import EditCommentModal from './EditCommentModal.js';

export default class StoreComments extends Component {

    render() {
        const currentUserName = this.props.currentUserName;
        const commentsData = this.props.commentsData;
        const selectedStore = this.props.selectedStore;
        const comments = commentsData.filter(comment => {
            if (comment.comment_store_id === selectedStore) {
                return comment
            }
        })

        return (


            comments.map(comment => {
                return (
                    <View
                        key={comment.comment_id}
                        style={styles.commentContainer}
                    >
                        <EditCommentModal
                            selectedComment={comment.comment_id}
                            currentUserName={this.props.currentUserName}
                            commentUserName={comment.user_name}
                            currentUserPic={comment.user_pic}
                            rating={comment.rating}
                            comment={comment.comment}
                            getComments={this.props.getComments}
                        />
                        <View style={styles.userInfo}>
                            <Avatar
                                medium
                                rounded
                                source={{ uri: comment.user_pic }}
                            />
                            <Text
                                style={styles.userName}
                            >{comment.user_name}</Text>
                            <Stars
                                value={comment.rating}
                                spacing={8}
                                count={5}
                                starSize={20}
                                backingColor='#f6f6f6'
                            />
                        </View>

                        <Text style={{ marginTop: 10 }}>{comment.comment} </Text>
                        <Text style={{ marginTop: 5 }}>{comment.dateCreated}</Text>

                    </View>
                )
            })
        )
    };
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#f6f6f6',
        padding: 20,
        width: 350,
        marginBottom: 5
    },
    userName: {
        margin: 10,
        alignItems: 'center',
    },
    userInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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

