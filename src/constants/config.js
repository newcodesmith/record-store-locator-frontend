// API Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://vinyl-finder-server-6897eaebc32c.herokuapp.com';

export const API_ENDPOINTS = {
  STORES: `${API_BASE_URL}/stores/`,
  COMMENTS: `${API_BASE_URL}/comments/`,
};

// Facebook Auth Configuration
export const FACEBOOK_APP_ID = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '1149728978500849';

// App Configuration
export const APP_CONFIG = {
  name: 'Vinyl Finder',
  version: '1.0.0',
  scheme: 'vinylfinder',
};
