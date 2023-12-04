import {
  CardNumber, Cvv, ExpiryDate, Frames, SubmitButton
} from "frames-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { saveInfo } from '../Slices/SaveInfoSlice';

AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

// GENERATE A RANDOM CODE FOR EACH GIFT
export default function App( {route, navigation} ) {
  const gift = route.params;
  const [isGift] = useState(gift.isGift);

  const dispatch = useDispatch();
  const { balance, points } = useSelector(state => state.saveInfo);

  const process = () => {
    let newPoints = points - gift.inputValue * 5;
    if (!isGift) {
      let newBalance = Number.parseFloat(balance) + Number.parseFloat(gift.inputValue);
      newBalance = Number.parseFloat(newBalance).toFixed(2);
      dispatch(saveInfo({ amount: newBalance, points: newPoints }));
    } else {
     dispatch(saveInfo({ amount: balance, points: newPoints }));
    }
    navigation.navigate('Processed', isGift)
  };
  return (
      <SafeAreaView style={{width: '100%', alignItems: 'center'}}>
    <Text style={styles.title}>Buy a Gift Card</Text>
    <AntDesign style={styles.backArrow} name="arrowleft" size={24} color={'black'}
              onPress={() =>
                navigation.goBack(null)
                }
      />
    <View style={styles.container}>
      <Frames
        config={{
          debug: true,
          publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
        }}
        cardTokenized={(e) => {
          alert(e.token);
        }}
      >
        <CardNumber
          style={styles.cardNumber}
          placeholderTextColor="#9898A0"
          // showIcon={false} in case you don't want to see the card scheme logo
        />

        <View style={styles.dateAndCode}>
          <ExpiryDate
            style={styles.expiryDate}
            placeholderTextColor="#9898A0"
          />
          <Cvv style={styles.cvv} placeholder='Cvv' placeholderTextColor="#9898A0" />
        </View>

    {isGift ? (
        <View style={{alignItems: 'center', gap: 20, marginTop: 20, marginBottom: 10}}>
            <Text style={{fontSize: 16, fontWeight: 500, textAlign: 'center'}}>You will be able to send your gift after the payment is processed.</Text>
        </View>) :
        null}
        <SubmitButton
          title="Pay Now"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() =>
            process()
          }
        />
      </Frames>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    top: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateAndCode: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 18,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f9f9f9',
    borderColor: "#3A4452",
    borderRadius: 5,
  },
  sendButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f9f9f9',
    borderColor: "#3A4452",
    borderRadius: 20,
    padding: 10
  },
  expiryDate: {
    fontSize: 18,
    height: 50,
    width: "48%",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f9f9f9',
    borderColor: "#3A4452",
  },
  cvv: {
    fontSize: 18,
    height: 50,
    width: "48%",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f9f9f9',
    borderColor: "#3A4452",
  },
  button: {
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    backgroundColor: "#208B3A",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  backArrow: {
    left: '8%',
    top: 80,
    position: 'absolute',
    height: 24
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    top: 80,
    position: 'absolute',
    alignSelf: 'center'
  },
});