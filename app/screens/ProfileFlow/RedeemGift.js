import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../firebaseconfig';
import { saveInfo } from '../../Slices/SaveInfoSlice';

AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

const codeLength = 10;

const RedeemGift = ({ navigation }) => {
  const dispatch = useDispatch();
  const { balance, points } = useSelector(state => state.saveInfo);

  const [giftCode, setGiftCode] = useState('');
  const [incorrectCode, setIncorrectCode] = useState(false); // New state for incorrect code

  const getRedeemable = async () => {
    try {
      const snapshot = await firebase.firestore().collectionGroup('redeemables').get();
      const userData = [];
      snapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      const redeemableIndex = userData.find(item => item.code.toLowerCase() === giftCode.toLowerCase());
      if (redeemableIndex == -1) {
        setIncorrectCode(true); // Set incorrectCode state to true
        return null;
      } else {
        setIncorrectCode(false); // Reset incorrectCode state
        return redeemableIndex;
      }
    } catch (error) {
      console.error('Error fetching redeemable deals:', error);
      throw error;
    }
  };  

  const handleButton = async () => {
    try {
      const redeemable = await getRedeemable();
      if (redeemable) {
        let newBalance = Number.parseFloat(balance) + Number.parseFloat(redeemable.amount);
        newBalance = Number.parseFloat(newBalance).toFixed(2);
        dispatch(saveInfo({ amount: newBalance, points: points, giftCode: giftCode }));
        const documentRef = firebase.firestore().doc(`redeemables/${redeemable.code}`);
        try {
          // Delete the document
          await documentRef.delete();
          console.log('Document successfully deleted!');
        } catch (error) {
          console.error('Error deleting document: ', error);
        }
        navigation.goBack(null);
      } else {
        setIncorrectCode(true);
        setTimeout(() => {
          setIncorrectCode(false);
        }, 3000);
        // No need to do anything here, as the incorrect message will be displayed based on the state
      }
    } catch (error) {
      console.error('Error handling redeemable:', error);
      // Handle error fetching redeemable
    }
  };

  return (
    <SafeAreaView>
      <Text style={buyGiftStyle.title}>Redeem a Gift<Text> </Text>
      <MaterialCommunityIcons name="gift" size={24} color={'black'} />
      </Text>
      <AntDesign
        style={buyGiftStyle.backArrow}
        name="arrowleft"
        size={24}
        color={'black'}
        onPress={() => navigation.goBack(null)}
      />
      <Text style={{ top: 100, alignSelf: 'center', fontSize: 18 }}>Enter your code below</Text>
      <View style={{ top: 110, borderWidth: 1, borderRadius: 5, height: 40, width: 330, alignSelf: 'center' }}>
        <TextInput
          style={{ fontSize: 28, letterSpacing: 10, textAlign: 'center' }}
          maxLength={10}
          value={giftCode}
          onChangeText={(text) => setGiftCode(text)}
        />
        <View style={{ top: 10 }}>
          <Button
            title="Redeem"
            color={'#2DC653'}
            onPress={() => handleButton()}
          />
        </View>
        {incorrectCode && <Text style={buyGiftStyle.incorrectMessage}>This code is incorrect</Text>}
      </View>
    </SafeAreaView>
  );
};

const buyGiftStyle = StyleSheet.create({
  backArrow: {
    left: '8%',
    top: 80,
    position: 'absolute',
    height: 24,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    top: 80,
    position: 'absolute',
    alignSelf: 'center',
  },
  incorrectMessage: {
    marginTop: 20,
    alignSelf: 'center',
    color: 'red',
    fontWeight: '500',
    fontSize: 18,
  }
});

export default RedeemGift;