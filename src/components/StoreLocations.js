import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

const StoreLocations = ({
  navigation,
  storeData,
  currentUserName,
  currentUserPic,
}) => {
  const handleMarkerPress = useCallback(
    (storeId) => {
      navigation.navigate('storeInfo', {
        store_id: storeId,
        storeData,
        currentUserName,
        currentUserPic,
      });
    },
    [navigation, storeData, currentUserName, currentUserPic]
  );

  return storeData.map((store) => {
    const latitude = parseFloat(store.latitude);
    const longitude = parseFloat(store.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return null;
    }

    return (
      <Marker
        key={store.store_id}
        coordinate={{
          latitude,
          longitude,
        }}
        image={require('../../assets/vinyl_finder_marker.png')}
        title={store.name}
        description="Record Store"
        onCalloutPress={() => handleMarkerPress(store.store_id)}
        testID={`marker-${store.store_id}`}
      />
    );
  });
};

StoreLocations.propTypes = {
  navigation: PropTypes.object.isRequired,
  storeData: PropTypes.arrayOf(
    PropTypes.shape({
      store_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  currentUserName: PropTypes.string,
  currentUserPic: PropTypes.string,
};

StoreLocations.defaultProps = {
  currentUserName: 'User',
  currentUserPic: 'https://i.pravatar.cc/200?img=12',
};

export default StoreLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e4366',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
