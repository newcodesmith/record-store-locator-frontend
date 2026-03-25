import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFacebookAuth } from '../hooks/useFacebookAuth';
import { useStores } from '../hooks/useStores';
import { COLORS } from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  const { stores, isLoading: isLoadingStores } = useStores();
  const { isSigningIn, setIsSigningIn, authError, setAuthError, login: facebookLogin, request } = useFacebookAuth();

  // Handle auth errors
  useEffect(() => {
    if (authError) {
      setIsSigningIn(false);
      if (/feature unavailable|currently unavailable/i.test(authError)) {
        Alert.alert(
          'Facebook app not enabled',
          'This Facebook app is currently restricted. Add your Facebook account as a Tester/Developer in Meta App Dashboard, then try again.'
        );
      } else {
        Alert.alert('Facebook login failed', authError);
      }
      setAuthError(null);
    }
  }, [authError, setAuthError, setIsSigningIn]);

  const continueAsGuest = useCallback(() => {
    if (!stores.length) {
      if (isLoadingStores) {
        Alert.alert('Stores are still loading', 'Please try again in a moment.');
      } else {
        Alert.alert('Unable to load stores', 'Please check your connection and try again.');
      }
      return;
    }

    navigation.navigate('vinylMap', {
      currentUserName: 'Guest User',
      currentUserPic: 'https://i.pravatar.cc/200?img=12',
      storeData: stores,
    });
  }, [stores, isLoadingStores, navigation]);

  const handleFacebookLogin = useCallback(async () => {
    if (!stores.length) {
      if (isLoadingStores) {
        Alert.alert('Stores are still loading', 'Please try again in a moment.');
      } else {
        Alert.alert('Unable to load stores', 'Please check your connection and try again.');
      }
      return;
    }

    if (!request) {
      Alert.alert('Facebook login unavailable', 'Authentication is not ready yet. Please try again.');
      return;
    }

    setIsSigningIn(true);
    try {
      const authResult = await facebookLogin();
      if (authResult?.type === 'success') {
        const token = authResult.authentication?.accessToken;
        if (token) {
          // Fetch Facebook user info
          const fbResponse = await fetch(
            `https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${token}`
          );
          if (!fbResponse.ok) {
            throw new Error('Failed to fetch Facebook profile');
          }
          const fbUserInfo = await fbResponse.json();

          navigation.navigate('vinylMap', {
            currentUserName: fbUserInfo?.name || 'Facebook User',
            currentUserPic: fbUserInfo?.picture?.data?.url || 'https://i.pravatar.cc/200?img=12',
            storeData: stores,
          });
        }
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      Alert.alert('Facebook login failed', error.message || 'Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  }, [stores, request, facebookLogin, navigation, setIsSigningIn]);

  const isButtonDisabled = isSigningIn || isLoadingStores || !request;

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/vinyl_finder_logo.png')}
      />
      
      {isLoadingStores && (
        <ActivityIndicator
          size="large"
          color={COLORS.facebook}
          style={styles.loader}
        />
      )}

      <TouchableOpacity
        style={[styles.signInButton, isButtonDisabled && styles.signInButtonDisabled]}
        onPress={handleFacebookLogin}
        disabled={isButtonDisabled}
        testID="facebook-login-button"
      >
        <Text style={styles.signInText}>
          {isSigningIn ? 'Signing In...' : 'Sign In With Facebook'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.guestButton}
        onPress={continueAsGuest}
        testID="guest-login-button"
      >
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 100,
    width: 300,
    height: 100,
  },
  loader: {
    marginBottom: 20,
  },
  signInButton: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.facebook,
    paddingVertical: 12,
    borderRadius: 6,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  guestButton: {
    marginTop: 14,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 6,
  },
  guestText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
