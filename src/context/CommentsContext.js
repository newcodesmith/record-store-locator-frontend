import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchComments } from '../services/commentService';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchComments();
      setComments(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading comments:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const value = {
    comments,
    isLoading,
    error,
    loadComments,
    setComments,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
