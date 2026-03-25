import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars';
import EditCommentModal from './EditCommentModal';
import { getCommentsByStore } from '../services/commentService';
import { COLORS } from '../constants/colors';

const StoreComments = ({
  selectedStore,
  commentsData,
  currentUserName,
  onCommentUpdated,
}) => {
  // Get comments for this store and sort in reverse order
  const sortedComments = useMemo(() => {
    const storeComments = getCommentsByStore(selectedStore, commentsData || []);
    return [...storeComments].reverse();
  }, [selectedStore, commentsData]);

  if (!sortedComments.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No reviews yet. Be the first to review!</Text>
      </View>
    );
  }

  return sortedComments.map((comment) => (
    <View key={comment.comment_id} style={styles.commentContainer}>
      <EditCommentModal
        selectedComment={comment.comment_id}
        currentUserName={currentUserName}
        commentUserName={comment.user_name}
        currentUserPic={comment.user_pic}
        rating={comment.rating}
        commentText={comment.comment}
        onCommentUpdated={onCommentUpdated}
      />

      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: comment.user_pic }}
          testID={`avatar-${comment.comment_id}`}
        />
        <Text style={styles.userName}>{comment.user_name}</Text>
        <Stars
          value={comment.rating}
          spacing={8}
          count={5}
          starSize={20}
          backingColor={COLORS.surface}
        />
      </View>

      <Text style={styles.commentText}>{comment.comment}</Text>
      <Text style={styles.dateText}>{comment.dateCreated}</Text>
    </View>
  ));
};

StoreComments.propTypes = {
  selectedStore: PropTypes.number.isRequired,
  commentsData: PropTypes.arrayOf(
    PropTypes.shape({
      comment_id: PropTypes.number.isRequired,
      comment_store_id: PropTypes.number.isRequired,
      user_name: PropTypes.string.isRequired,
      user_pic: PropTypes.string,
      rating: PropTypes.number,
      comment: PropTypes.string,
      dateCreated: PropTypes.string,
    })
  ).isRequired,
  currentUserName: PropTypes.string,
  onCommentUpdated: PropTypes.func,
};

StoreComments.defaultProps = {
  currentUserName: 'User',
  onCommentUpdated: () => {},
};

export default StoreComments;

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    margin: 10,
    borderRadius: 8,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontStyle: 'italic',
  },
  commentContainer: {
    backgroundColor: COLORS.surface,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 10,
    lineHeight: 20,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
