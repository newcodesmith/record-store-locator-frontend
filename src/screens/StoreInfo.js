import React, { useEffect, useMemo } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useComments } from '../hooks/useComments';
import { getCommentsByStore, calculateAverageRating } from '../services/commentService';
import { getStoreById } from '../services/storeService';
import StoreComments from '../components/StoreComments';
import AddCommentModal from '../components/AddCommentModal';
import { COLORS } from '../constants/colors';

const StoreInfo = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { comments, isLoading: isLoadingComments, loadComments } = useComments();

  const storeData = route?.params?.storeData || [];
  const selectedStoreId = route?.params?.store_id;
  const currentUserName = route?.params?.currentUserName;
  const currentUserPic = route?.params?.currentUserPic;

  // Get current store from data
  const singleStore = useMemo(
    () => getStoreById(selectedStoreId, storeData),
    [selectedStoreId, storeData]
  );

  // Get comments for this store
  const storeComments = useMemo(
    () => getCommentsByStore(selectedStoreId, comments),
    [selectedStoreId, comments]
  );

  // Calculate average rating
  const averageRating = useMemo(
    () => calculateAverageRating(storeComments),
    [storeComments]
  );

  useEffect(() => {
    if (!comments.length && !isLoadingComments) {
      loadComments();
    }
  }, []);

  if (!singleStore) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Store not found</Text>
      </View>
    );
  }

  const handleOpenURL = (url, label) => {
    if (!url) {
      Alert.alert('Link Unavailable', `${label} link is not available for this store.`);
      return;
    }
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', `Unable to open ${label}`);
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View style={styles.storeInfoContainer}>
        {singleStore.photo && (
          <Image
            style={styles.storeImage}
            source={{ uri: singleStore.photo }}
          />
        )}

        <Text style={styles.storeName}>{singleStore.name}</Text>

        <View style={styles.ratingContainer}>
          {isLoadingComments && storeComments.length === 0 ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <>
              <Stars
                value={averageRating}
                spacing={8}
                count={5}
                starSize={30}
                backingColor={COLORS.secondary}
              />
              <Text style={styles.reviewCount}>
                {storeComments.length} {storeComments.length === 1 ? 'Review' : 'Reviews'}
              </Text>
            </>
          )}
        </View>

        <View style={styles.storeDetailsContainer}>
          {singleStore.address && (
            <Text style={styles.storeDetail}>📍 {singleStore.address}</Text>
          )}
          {singleStore.hours && (
            <Text style={styles.storeDetail}>🕐 {singleStore.hours}</Text>
          )}
          {singleStore.phone && (
            <Text style={styles.storeDetail}>📞 {singleStore.phone}</Text>
          )}
        </View>

        {singleStore.description && (
          <Text style={styles.storeDescription}>
            <Text style={styles.descriptionLabel}>About: </Text>
            {singleStore.description}
          </Text>
        )}

        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleOpenURL(singleStore.facebook, 'Facebook')}
            testID="facebook-link"
          >
            <FontAwesome
              name="facebook-square"
              size={56}
              color={COLORS.facebook}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleOpenURL(singleStore.web_address, 'Website')}
            testID="website-link"
          >
            <MaterialCommunityIcons
              name="web"
              color={COLORS.primary}
              size={56}
            />
          </TouchableOpacity>
        </View>

        <AddCommentModal
          selectedStore={selectedStoreId}
          currentUserName={currentUserName}
          currentUserPic={currentUserPic}
          onCommentAdded={loadComments}
        />
      </View>

      <StoreComments
        selectedStore={selectedStoreId}
        commentsData={comments}
        currentUserName={currentUserName}
        onCommentUpdated={loadComments}
      />
    </ScrollView>
  );
};

export default StoreInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.text,
  },
  storeInfoContainer: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
  },
  storeImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  storeName: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
    marginBottom: 12,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewCount: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.textLight,
  },
  storeDetailsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  storeDetail: {
    fontSize: 14,
    marginVertical: 4,
    color: COLORS.text,
  },
  storeDescription: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 20,
    color: COLORS.text,
    paddingHorizontal: 10,
  },
  descriptionLabel: {
    fontWeight: '700',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  linkButton: {
    marginHorizontal: 16,
  },
});
