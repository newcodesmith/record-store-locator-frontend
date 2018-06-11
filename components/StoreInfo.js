import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';






export default class StoreInfo extends Component {

    state = {
        storeData: null,
    };


    render() {
        console.log(this.props.store_id, "store ID info page");
        console.log(this.props.storeData, "All stores info page");
        
        return (
            <View
                style={styles.container}
            >
            <Text>Store Info Page</Text>

            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e4366',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 100,
        // width: 100

    },
});

