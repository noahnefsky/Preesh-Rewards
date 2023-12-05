import React, { useState, useRef } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebaseconfig';

Octicons.loadFont();
MaterialCommunityIcons.loadFont();

const CreateAccount = ({ change }) => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [newEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showError, setShowError] = useState('');
  const [newId, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const addAccount = () => {
    // Check if newId is a non-empty string before proceeding
    if (!newId || typeof newId !== 'string' || newId.trim() === '') {
      return;
    }
  
    firebase
      .firestore()
      .collection('accounts')
      .doc(newId)
      .set({
        id: newId,
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };
  

  const createAccountEvent = () => {
    if (password !== passwordConfirm) {
      setShowError('Passwords do not match');
      setTimeout(() => {
        setShowError('');
      }, 2000);
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, newEmail, password)
      .then((userCredential) => {
        setId(userCredential.user.uid);
        addAccount();
        setShowError('Account successfully created!');

        setTimeout(() => {
          setShowError('Redirecting to sign in');
          setTimeout(() => {
            setLoading(false);
            change();
          }, 2000);
        }, 2000);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        setShowError('Create Account Failed');
        setTimeout(() => {
          setShowError('');
        }, 2000);
      });
  };

  return (
    <SafeAreaView style={{ flexDirection: 'column' }}>
      <View style={CreateAccountStyles.container}>
        <View style={{ justifyContent: 'center', paddingVertical: 20 }}>
          <View style={[CreateAccountStyles.rect]}>
            <Text style={CreateAccountStyles.text}>Email</Text>
            <TextInput
              style={CreateAccountStyles.editableText}
              value={newEmail}
              onChangeText={(newEmail) => setEmail(newEmail)}
            />
          </View>

          <View style={CreateAccountStyles.lineStyle} />

          <View style={[CreateAccountStyles.rect]}>
            <Text style={CreateAccountStyles.text}>Password</Text>
            <TextInput
              style={CreateAccountStyles.editableText}
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
          </View>
          <View style={CreateAccountStyles.lineStyle} />

          <View style={[CreateAccountStyles.rect]}>
            <Text style={CreateAccountStyles.text}>Confirm Password</Text>
            <TextInput
              style={CreateAccountStyles.editableText}
              value={passwordConfirm}
              onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
              secureTextEntry={true}
            />
          </View>
          <View style={CreateAccountStyles.lineStyle} />

          <Button title="Create Account" style={{ top: 10 }} onPress={createAccountEvent} />
        </View>
      </View>

      {loading && (
        <View style={CreateAccountStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {showError.length > 0 && (
        <View style={CreateAccountStyles.warningContainer}>
          <Text style={CreateAccountStyles.warning}>{showError}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const CreateAccountStyles = StyleSheet.create({
  lineStyle:{
    borderWidth: 0.5,
    borderColor: '#A39E9E',
    marginTop: -15,
    marginBottom: 5,
    backgroundColor: '#A39E9E'
  },
  warning: {
    color: 'red', fontWeight: '700', fontSize: 15, margin: 5
  },
  warningContainer: {
    alignSelf: 'center', alignItems: 'center', margin: 10, position: 'absolute', top: 200
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
    height: 250
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
});

export default CreateAccount;