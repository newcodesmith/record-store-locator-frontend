import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchStores } from '../services/storeService';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStores = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStores();
      setStores(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading stores:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStores();
  }, [loadStores]);

  const value = {
    stores,
    isLoading,
    error,
    loadStores,
    setStores,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
