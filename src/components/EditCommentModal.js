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
import { updateComment, deleteComment } from '../services/commentService';
import { COLORS } from '../constants/colors';

const EditCommentModal = ({
  selectedComment,
  currentUserName,
  commentUserName,
  currentUserPic,
  rating: initialRating,
  commentText: initialComment,
  onCommentUpdated,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwnComment = commentUserName === currentUserName;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) {
      resetForm();
    }
  };

  const resetForm = () => {
    setRating(initialRating);
    setComment(initialComment);
  };

  const handleUpdateComment = async () => {
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
      const updateData = {
        rating,
        comment: comment.trim(),
      };

      await updateComment(selectedComment, updateData);
      toggleModal();
      onCommentUpdated?.();
      Alert.alert('Success', 'Your review has been updated!');
    } catch (error) {
      console.error('Error updating review:', error);
      Alert.alert(
        'Unable to update review',
        'The server returned an error. Please try again shortly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = () => {
    Alert.alert(
      'Delete Review?',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              await deleteComment(selectedComment);
              toggleModal();
              onCommentUpdated?.();
              Alert.alert('Success', 'Your review has been deleted!');
            } catch (error) {
              console.error('Error deleting review:', error);
              Alert.alert(
                'Unable to delete review',
                'The server returned an error. Please try again shortly.'
              );
            } finally {
              setIsSubmitting(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!isOwnComment) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.editButtonContainer}
        onPress={toggleModal}
        testID="edit-review-button"
      >
        <Text style={styles.editGlyph}>✎</Text>
        <Text style={styles.editButton}>Edit</Text>
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
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
                editable={!isSubmitting}
                testID="edit-comment-input"
              />

              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  onPress={handleUpdateComment}
                  disabled={isSubmitting}
                  testID="update-review-button"
                >
                  <Text style={styles.saveButton}>
                    {isSubmitting ? 'Saving...' : 'Save Review'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteComment}
                  disabled={isSubmitting}
                  testID="delete-review-button"
                >
                  <Text style={[styles.saveButton, styles.deleteButton]}>
                    Delete Review
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

EditCommentModal.propTypes = {
  selectedComment: PropTypes.number.isRequired,
  currentUserName: PropTypes.string.isRequired,
  commentUserName: PropTypes.string.isRequired,
  currentUserPic: PropTypes.string.isRequired,
  rating: PropTypes.number,
  commentText: PropTypes.string,
  onCommentUpdated: PropTypes.func,
};

EditCommentModal.defaultProps = {
  rating: 0,
  commentText: '',
  onCommentUpdated: () => {},
};

export default EditCommentModal;

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
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  editButton: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '500',
  },
  editGlyph: {
    color: COLORS.textLight,
    fontSize: 12,
    marginRight: 4,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    fontWeight: '600',
    fontSize: 12,
    overflow: 'hidden',
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
});
