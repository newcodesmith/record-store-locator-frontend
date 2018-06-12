import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SocialIcon, Avatar } from "react-native-elements"


export default class StoreComments extends Component {

    render() {
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
                        <Text style={{ marginTop: 10 }}>{comment.comment}</Text>
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
    }
});

