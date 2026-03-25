import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { Platform } from 'react-native';
import { FACEBOOK_APP_ID } from '../constants/config';

WebBrowser.maybeCompleteAuthSession();

export const useFacebookAuth = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    scopes: ['public_profile'],
    responseType: 'token',
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      setUser({
        token: response.authentication?.accessToken,
        expiresIn: response.authentication?.expiresIn,
      });
      setAuthError(null);
    } else if (response?.type === 'error') {
      const errorMsg = response.error?.message || 'Unknown error';
      setAuthError(errorMsg);
      setUser(null);
    }
  }, [response]);

  const login = async () => {
    setIsSigningIn(true);
    try {
      await promptAsync(
        Platform.OS === 'web' ? undefined : { useProxy: true }
      );
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
  };

  return {
    request,
    response,
    promptAsync,
    isSigningIn,
    setIsSigningIn,
    authError,
    setAuthError,
    user,
    login,
    logout,
  };
};
