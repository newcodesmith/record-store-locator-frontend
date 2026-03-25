import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars';
import { addComment } from '../services/commentService';
import { COLORS } from '../constants/colors';

const AddCommentModal = ({
  selectedStore,
  currentUserName,
  currentUserPic,
  onCommentAdded,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) {
      resetForm();
    }
  };

  const resetForm = () => {
    setRating(0);
    setComment('');
  };

  const handleAddReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Validation Error', 'Please enter a comment.');
      return;
    }

    if (rating === 0) {
      Alert.alert('Validation Error', 'Please select a rating.');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewInfo = {
        comment_store_id: selectedStore,
        user_name: currentUserName,
        user_pic: currentUserPic,
        rating,
        comment: comment.trim(),
      };

      await addComment(reviewInfo);
      toggleModal();
      onCommentAdded?.();
      Alert.alert('Success', 'Your review has been saved!');
    } catch (error) {
      console.error('Error saving review:', error);
      Alert.alert(
        'Unable to save review',
        'The server returned an error. Please try again shortly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={toggleModal}
        testID="add-review-button"
      >
        <Text style={styles.addButtonText}>Add Review</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={toggleModal} testID="close-modal">
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <Image
                style={styles.avatar}
                source={{ uri: currentUserPic }}
              />
              <Text style={styles.userName}>{currentUserName}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Stars
                rating={rating}
                update={setRating}
                spacing={4}
                starSize={40}
                count={5}
                backingColor={COLORS.secondary}
              />
            </View>

            <View style={styles.commentSection}>
              <Text style={styles.commentLabel}>Comment</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Share your thoughts..."
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
                editable={!isSubmitting}
                testID="comment-input"
              />

              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  onPress={handleAddReview}
                  disabled={isSubmitting}
                  testID="submit-review-button"
                >
                  <Text style={styles.saveButton}>
                    {isSubmitting ? 'Saving...' : 'Save Review'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

AddCommentModal.propTypes = {
  selectedStore: PropTypes.number.isRequired,
  currentUserName: PropTypes.string.isRequired,
  currentUserPic: PropTypes.string.isRequired,
  onCommentAdded: PropTypes.func,
};

AddCommentModal.defaultProps = {
  onCommentAdded: () => {},
};

export default AddCommentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 8,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  closeButton: {
    color: '#517fa4',
    fontSize: 38,
    lineHeight: 38,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  commentSection: {
    marginTop: 16,
  },
  commentLabel: {
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  commentInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 12,
    textAlignVertical: 'top',
    color: COLORS.text,
    marginBottom: 12,
  },
  saveButtonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
