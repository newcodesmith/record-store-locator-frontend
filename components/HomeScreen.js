import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';

WebBrowser.maybeCompleteAuthSession();

const FACEBOOK_APP_ID = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '1149728978500849';

const HomeScreen = ({ navigation }) => {
  const [storeData, setStoreData] = useState([]);
  const [isLoadingStores, setIsLoadingStores] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    scopes: ['public_profile'],
    responseType: 'token',
  });

  const getLocations = useCallback(() => {
    setIsLoadingStores(true);
    const locationUrl = "https://vinyl-finder-server-6897eaebc32c.herokuapp.com/stores/";
    return fetch(locationUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load stores (${response.status})`);
        }
        return response.json();
      })
      .then(data => {
        setStoreData(data);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Unable to load stores', 'The server returned an error. Please try again shortly.');
      })
      .finally(() => {
        setIsLoadingStores(false);
      });
  }, []);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  useEffect(() => {
    if (!response) {
      return;
    }

    if (response.type === 'error') {
      setIsSigningIn(false);
      const authError = response.error?.message || '';
      if (/feature unavailable|currently unavailable/i.test(authError)) {
        Alert.alert(
          'Facebook app not enabled',
          'This Facebook app is currently restricted. Add your Facebook account as a Tester/Developer in Meta App Dashboard, then try again.'
        );
      } else {
        Alert.alert('Facebook login failed', authError || 'Unable to authenticate with Facebook.');
      }
      return;
    }

    if (response.type !== 'success') {
      setIsSigningIn(false);
      return;
    }

    const token = response.authentication?.accessToken;
    if (!token) {
      setIsSigningIn(false);
      Alert.alert('Facebook login failed', 'No access token was returned. Please try again.');
      return;
    }

    fetch(`https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${token}`)
      .then(graphResponse => {
        if (!graphResponse.ok) {
          throw new Error(`Facebook profile fetch failed (${graphResponse.status})`);
        }
        return graphResponse.json();
      })
      .then(fbUserInfo => {
        navigation.navigate('vinylMap', {
          currentUserName: fbUserInfo?.name || 'Facebook User',
          currentUserPic: fbUserInfo?.picture?.data?.url || 'https://i.pravatar.cc/200?img=12',
          storeData,
        });
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Facebook login failed', 'Unable to retrieve your Facebook profile.');
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  }, [response, navigation, storeData]);

  const continueAsGuest = async () => {
    if (!storeData.length && !isLoadingStores) {
      await getLocations();
    }

    if (!storeData.length) {
      Alert.alert('Stores are still loading', 'Please try again in a moment.');
      return;
    }

    navigation.navigate('vinylMap', {
      currentUserName: 'Guest User',
      currentUserPic: 'https://i.pravatar.cc/200?img=12',
      storeData,
    });
  };

  const login = async () => {
    if (!storeData.length && !isLoadingStores) {
      await getLocations();
    }

    if (!storeData.length) {
      Alert.alert('Stores are still loading', 'Please try again in a moment.');
      return;
    }

    if (!request) {
      Alert.alert('Facebook login unavailable', 'Authentication is not ready yet. Please try again.');
      return;
    }

    setIsSigningIn(true);
    try {
      const authResult = await promptAsync(
        Platform.OS === 'web' ? undefined : { useProxy: true }
      );
      if (authResult.type !== 'success') {
        if (authResult.type !== 'cancel' && authResult.type !== 'dismiss') {
          Alert.alert(
            'Facebook login unavailable',
            'Facebook blocked this app for your account. You can continue as Guest while app settings are updated.'
          );
        }
        setIsSigningIn(false);
      }
    } catch (error) {
      console.error(error);
      setIsSigningIn(false);
      Alert.alert('Facebook login failed', 'Unable to start Facebook login.');
    }
  };

  const buttonDisabled = isSigningIn || isLoadingStores || !request;

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/vinyl_finder_logo.png')}
      />
      <TouchableOpacity
        style={[styles.signInButton, buttonDisabled && styles.signInButtonDisabled]}
        onPress={login}
        disabled={buttonDisabled}
      >
        <Text style={styles.signInText}>{isSigningIn ? 'Signing In...' : 'Sign In With Facebook'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.guestButton}
        onPress={continueAsGuest}
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
    backgroundColor: "#2e4366",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 100,
    width: 300, 
    height: 100
  },
  signInButton: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877f2',
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
})