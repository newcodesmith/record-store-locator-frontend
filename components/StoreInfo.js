import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Hyperlink from 'react-native-hyperlink'
import StoreComments from './StoreComments.js'

export default class StoreInfo extends Component {

    render() {
        const storeData = this.props.storeData;
        const selectedStore = this.props.store_id;
        const commentsData = this.props.commentsData

        const singleStore = storeData.filter(store => {
            if (store.store_id === selectedStore) {
                return store
            }
        })[0];

        const comments = commentsData.filter(comment => {
            if (comment.comment_store_id === selectedStore) {
                return comment
            }
        });

        const facebookUrl = singleStore && singleStore.facebook;

        return (
            <View
                style={styles.container}
            >
                <View style={{ backgroundColor: '#d3d3d3', padding: 30 }} >
                    <Image
                        style={{ width: 300, height: 200 }}
                        source={{ uri: singleStore && singleStore.photo }}
                    />
                    <Text
                        style={{ fontSize: 30, textAlign: 'center' }}
                    >{singleStore && singleStore.name}</Text>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Stars
                            value={singleStore && singleStore.average_rating}
                            spacing={8}
                            count={5}
                            starSize={30}
                            backingColor='#d3d3d3'
                        />
                        <Text style={{ marginTop: 5 }}>{comments.length} Reviews</Text>
                    </View>
                    <Text>{singleStore && singleStore.address}</Text>
                    <Text>{singleStore && singleStore.hours}</Text>
                    <Hyperlink
                        linkDefault={true}
                        linkStyle={{ color: '#2980b9', fontSize: 15 }}>
                        <Text style={{ marginTop: 10 }}>{singleStore && singleStore.web_address}</Text>
                    </Hyperlink>
                    <Hyperlink
                        linkStyle={{ color: '#2980b9', fontSize: 15 }}
                        linkText={url => url === facebookUrl ? 'Facebook' : url}
                    >
                        <Text style={{ fontSize: 15, marginTop: 10 }}>
                            {facebookUrl}
                        </Text>
                    </Hyperlink>
                    <Text style={{ fontSize: 20, marginTop: 10 }}>{singleStore && singleStore.description}</Text>
                </View>
                <StoreComments
                    selectedStore={selectedStore}
                    commentsData={this.props.commentsData}
                />
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

