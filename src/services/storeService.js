import { API_ENDPOINTS } from '../constants/config';

/**
 * Fetch all store locations
 * @returns {Promise<Array>} Array of store objects
 */
export const fetchStores = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.STORES);
    if (!response.ok) {
      throw new Error(`Failed to load stores (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchStores error:', error);
    throw error;
  }
};

/**
 * Get a single store by ID
 * @param {number} storeId - The store ID
 * @param {Array} stores - Array of all stores
 * @returns {Object|null} Store object or null
 */
export const getStoreById = (storeId, stores) => {
  return stores.find(store => store.store_id === storeId) || null;
};
