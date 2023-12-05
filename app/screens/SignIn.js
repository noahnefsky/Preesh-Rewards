import React, { useState, useRef } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import store from '../../app/ConfigureStore';
import { firebase, setId } from '../firebaseconfig';
import { fetchBrowseDeals } from '../Slices/BrowseDealsSlice';
import { fetchFavourites } from '../Slices/FavouritesSlice';
import { fetchGifts } from '../Slices/GiftsSlice';
import { fetchImages } from '../Slices/ImagesSlice';
import { fetchMostPopular } from '../Slices/MostPopularSlice';
import { fetchDeals } from '../Slices/SavedDealsSlice';
import { fetchUserData } from '../Slices/SaveInfoSlice';
import { fetchUsedRewards } from '../Slices/UsedRewardsSlice';
import { fetchPromotions } from '../Slices/UsePromotionSlice';

Octicons.loadFont();
MaterialCommunityIcons.loadFont();

const fetchAccount = async (uid) => {
  const snapshot = await firebase.firestore().collection('accounts').get();
  snapshot.forEach((doc) => {
    if (doc.id == uid && doc.data()) {
      setId(doc.data().id);
      store.dispatch(fetchUserData());
      store.dispatch(fetchDeals());
      store.dispatch(fetchMostPopular());
      store.dispatch(fetchFavourites());
      store.dispatch(fetchBrowseDeals());
      store.dispatch(fetchUsedRewards());
      store.dispatch(fetchPromotions());
      store.dispatch(fetchGifts());
      store.dispatch(fetchImages());
    }
  });
};

const SignIn = ({ argument }) => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [newEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInEvent = () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, newEmail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        fetchAccount(user.uid);

        setTimeout(() => {
          setLoading(false);
          argument.navigate('TabNavigator', {});
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setShowError(true);

        setTimeout(() => {
          setShowError(false);
        }, 3000);
      });
  };

  return (
    <SafeAreaView style={{ flexDirection: 'column' }}>
      <View style={SignInStyles.container}>
        <View style={{ justifyContent: 'center', paddingVertical: 20 }}>
          <View style={[SignInStyles.rect]}>
            <Text style={SignInStyles.text}>Email</Text>
            <TextInput
              style={SignInStyles.editableText}
              value={newEmail}
              onChangeText={(newEmail) => setEmail(newEmail)}
            />
          </View>

          <View style={SignInStyles.lineStyle} />

          <View style={[SignInStyles.rect]}>
            <Text style={SignInStyles.text}>Password</Text>
            <TextInput
              style={SignInStyles.editableText}
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
          </View>
          <View style={SignInStyles.lineStyle} />
          <Button title="Sign In" style={{ top: 10 }} onPress={signInEvent} />
        </View>
      </View>

      {loading && (
        <View style={SignInStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {showError && (
        <View style={SignInStyles.warningContainer}>
          <Text style={SignInStyles.warning}>Sign in failed</Text>
          <Text style={SignInStyles.warning}>Please check the email and password</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const SignInStyles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor: '#A39E9E',
    marginTop: -15,
    marginBottom: 5,
    backgroundColor: '#A39E9E'
  },
  warning: {
    color: 'red', fontWeight: '500', fontSize: 15, marginBottom: 3
  },
  warningContainer: {
    alignSelf: 'center', alignItems: 'center', margin: 10, position: 'absolute', top: 155
  },
  title: {
    fontWeight: 500,
    fontSize: 17,
    left: 60,
    top: 10,
    position: 'absolute',
    lineHeight: 19.92
  },
  x: {
    left: 20,
    top: 7.96,
    position: 'absolute',
  },
  pencil: {
    position: 'absolute',
    top: 75,
    left: 20,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 205
  },
  rect: {
    height: 60,
    left: 34,
  },
  text: {
    color: '#A39E9E',
    fontWeight: 400,
    fontSize: 13,
    top: 0
  },
  editableText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 15,
    top: 5,
  },
});

export default SignIn;