import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class StoreInfo extends Component {

    state = {
        storeData: null,
    };


    render() {
        console.log(this.props.store_id, "store ID info page");
        console.log(this.props.storeData, "All stores info page");

        const storeData = this.props.storeData;
        const selectedStore = this.props.store_id;
        const singleStore = storeData.filter(store => {
            if (store.store_id === selectedStore) {
                return store
            }
        })[0]

        console.log(singleStore && singleStore.name, "store name");

        return (
            <View
                style={styles.container}
            >
                <Image
                    style={{ width: 300, height: 200 }}
                    source={{ uri: singleStore && singleStore.photo }}
                />
                <Text>{singleStore && singleStore.name}</Text>
                <Text>{singleStore && singleStore.address}</Text>
                <Text>{singleStore && singleStore.hours}</Text>
                <Text>{singleStore && singleStore.web_address}</Text>
                <Text>{singleStore && singleStore.facebook}</Text>
                <Text>{singleStore && singleStore.description}</Text>
                <Text>{singleStore && singleStore.average_rating}</Text>
                <View style={{ alignItems: 'center' }}>
                    <Stars
                        value={singleStore && singleStore.average_rating}
                        spacing={8}
                        count={5}
                        starSize={30}
                        backingColor='#ffffff'
                        />
                </View>
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

