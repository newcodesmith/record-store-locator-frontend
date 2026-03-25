import { API_ENDPOINTS } from '../constants/config';

/**
 * Fetch all comments
 * @returns {Promise<Array>} Array of comment objects
 */
export const fetchComments = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.COMMENTS);
    if (!response.ok) {
      throw new Error(`Failed to load comments (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchComments error:', error);
    throw error;
  }
};

/**
 * Get comments for a specific store
 * @param {number} storeId - The store ID
 * @param {Array} allComments - Array of all comments
 * @returns {Array} Filtered comments for the store
 */
export const getCommentsByStore = (storeId, allComments) => {
  return allComments.filter(comment => comment.comment_store_id === storeId);
};

/**
 * Calculate average rating for comments
 * @param {Array} comments - Array of comment objects
 * @returns {number} Average rating (0 if no comments)
 */
export const calculateAverageRating = (comments) => {
  if (!comments || comments.length === 0) return 0;
  const sum = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
  return sum / comments.length;
};

/**
 * Add a new comment
 * @param {Object} reviewData - Comment data object
 * @returns {Promise<Object>} Created comment object
 */
export const addComment = async (reviewData) => {
  try {
    const response = await fetch(API_ENDPOINTS.COMMENTS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add review (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('addComment error:', error);
    throw error;
  }
};

/**
 * Update an existing comment
 * @param {number} commentId - The comment ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated comment object
 */
export const updateComment = async (commentId, updateData) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.COMMENTS}${commentId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update review (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('updateComment error:', error);
    throw error;
  }
};

/**
 * Delete a comment
 * @param {number} commentId - The comment ID
 * @returns {Promise<void>}
 */
export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.COMMENTS}${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete review (${response.status})`);
    }
  } catch (error) {
    console.error('deleteComment error:', error);
    throw error;
  }
};
