import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import { Avatar } from 'react-native-elements';

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
                        <Avatar
                            medium
                            rounded
                            source={{ uri: comment.user_pic }}
                            overlayContainerStyle={styles.pic}
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
                        <Text style={{ marginTop: 10 }}>{comment.comment} </Text>
                        <Text style={{ margin: 5 }}>{comment.dateCreated}</Text>
                        <View>
                            {comment.comment_user_name === currentUserName ? 
                            <TouchableOpacity onPress={this.editComment}>
                                <Text style={styles.button}>Edit Review</Text>
                            </TouchableOpacity> : null }
                            {comment.comment_user_name === currentUserName ? 
                            <TouchableOpacity onPress={this.deleteComment}>
                                <Text style={styles.button}>Delete Review</Text>
                            </TouchableOpacity> : null }
                        </View>
                    </View>
                )
            })
        )
    };
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#f6f6f6',
        padding: 30,
        alignItems: 'center',
        width: 350,
        marginBottom: 5
    },
    pic: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 2,
        margin: 0,
        padding: 0,
    },
    userName: {
        margin: 10
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        padding: 10,
        color: '#ffffff',
        backgroundColor: '#652d96',
        textAlign: 'center'
    }
});

