import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export const useStores = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStores must be used within StoreProvider');
  }
  return context;
};
