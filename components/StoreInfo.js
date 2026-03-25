import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import StoreComments from './StoreComments.js';
import AddCommentModal from './AddCommentModal';

export default class StoreInfo extends Component {

    state = {
        commentsData: []
    };

    getComments = () => {
        const commentsUrl = "https://vinyl-finder-server-6897eaebc32c.herokuapp.com/comments/";
        let commentsDataGrab = response => {
            this.setState({ commentsData: response });
        };
        return fetch(commentsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load comments (${response.status})`);
                }
                return response.json();
            })
            .then(commentsDataGrab)
            .catch(error => {
                console.error(error);
                Alert.alert('Unable to load comments', 'The server returned an error. Please try again shortly.');
            })
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        const storeData = this.props.route?.params?.storeData || [];
        const selectedStore = this.props.route?.params?.store_id;
        const commentsData = this.state.commentsData;
        const currentUserName = this.props.route?.params?.currentUserName;
        const currentUserPic = this.props.route?.params?.currentUserPic;

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

        const getRatingAverage = function (comments) {
            var rating = 0,
                average;
            for (var i = 0; i < comments.length; i++) {
                rating += comments[i].rating;
            }
            average = rating / comments.length;
            return average;
        };


        const averageRating = getRatingAverage(comments)
        const facebookUrl = singleStore && singleStore.facebook;
        const webAddress = singleStore && singleStore.web_address;
        
        return (
            <ScrollView>
                <View
                    style={styles.container}
                >
                    <View style={styles.storeInfoContainer} >
                        <Image
                            style={{ width: 300, height: 200 }}
                            source={{ uri: singleStore && singleStore.photo }}
                        />
                        <Text
                            style={{ fontSize: 30, textAlign: 'center' }}
                        >{singleStore && singleStore.name}</Text>
                        <View style={{ alignItems: 'center', margin: 10 }}>
                            <Stars
                                value={averageRating}
                                spacing={8}
                                count={5}
                                starSize={30}
                                backingColor='#a1a1a1'
                            />
                            <Text style={{ marginTop: 5 }}>{comments.length} Reviews</Text>
                        </View>
                        <Text>{singleStore && singleStore.address}</Text>
                        <Text>{singleStore && singleStore.hours}</Text>
                        <Text>{singleStore && singleStore.phone}</Text>
                        <Text style={{ fontSize: 15, marginTop: 10, width: 300 }}>Stores Description: {singleStore && singleStore.description}</Text>

                        <View style={styles.linksContainer}>
                            <View>
                                <TouchableOpacity
                                    style={styles.linkButton}
                                    onPress={() => Linking.openURL(facebookUrl)}
                                >
                                    <FontAwesome name="facebook-square" size={56} color="#1877f2" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.linkButton}
                                onPress={() => Linking.openURL(webAddress)}>
                                <MaterialCommunityIcons
                                    name='web'
                                    color='#2e4366'
                                    size={56}
                                />
                            </TouchableOpacity>
                        </View>


                        <AddCommentModal
                            selectedStore={selectedStore}
                            currentUserName={currentUserName}
                            currentUserPic={currentUserPic}
                            getComments={this.getComments}
                        />

                    </View>
                    <StoreComments
                        selectedStore={selectedStore}
                        commentsData={this.state.commentsData}
                        currentUserName={currentUserName}
                        getComments={this.getComments}
                    />
                </View>
            </ScrollView>
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
    storeInfoContainer: {
        backgroundColor: '#a1a1a1',
        padding: 30,
        alignItems: 'center',
        width: 350,
        marginTop: 10,
        marginBottom: 10
    },
    linksContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    linkButton: {
        marginHorizontal: 10,
    }
});

