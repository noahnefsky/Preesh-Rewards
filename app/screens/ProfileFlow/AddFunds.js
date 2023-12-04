import React, { useState } from 'react';
import { Animated, Easing, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import coin from '../../../assets/coin.png';
import giftCard from '../../../assets/giftCard.png';

AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

// need to add proper algorithm for calcuting pressh points

const GiftCard = ( {navigation} ) => {
  const { balance, points } = useSelector(state => state.saveInfo);

  const [inputValue, setInputValue] = useState(0);
  const [isShow, setShow] = useState('none');
  const [isRed, setRed] = useState('#2DC653');
  const fadeAnim = useState(new Animated.Value(1))[0];

  const handleAdd = () => {
    setInputValue((inputValue *5) < points ? String(Number(inputValue) + 5): inputValue)
    if (inputValue * 5 >= points) {
        setShow('flex');
        setRed('red');
        fadeOutText();
    }
  }

  const fadeOutText = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Animate to opacity 0 (fully transparent)
      duration: 1500, // Animation duration in milliseconds
      useNativeDriver: false, // Avoid using native driver for color changes
      easing: Easing.ease
    }).start(() => {
      setRed('#2DC653'); // Change the text color back to black
      setShow('none')
      fadeAnim.setValue(3); // Reset the opacity value to 1
    });
  };

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <Text style={buyGiftStyle.title}>Add Funds</Text>
      <AntDesign style={buyGiftStyle.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                  navigation.goBack(null)
                  }
        />
      <Image source={giftCard} style={buyGiftStyle.giftCard}/>
      <View style={buyGiftStyle.amount}>
      <View style={[buyGiftStyle.text, {flexDirection: 'row', alignItems: 'center', marginBottom: 10}]}>
          <Text style={{fontSize: 18, fontWeight: 600, color: '#208B3A'}}>Preesh Points Available</Text>
          <Text style={{fontSize: 18, fontWeight: 600, color: '#208B3A'}}>: </Text>
          <Image source={coin} style={buyGiftStyle.coin2}/>
          <Text style={[{fontSize: 22, fontWeight: 500}, { color: isRed }]}> {points} </Text>
        </View>
        <Text style={[buyGiftStyle.notEnough, {display: isShow}]}>Not enough Preesh Points</Text>
        <View style={[buyGiftStyle.text, {flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={{fontSize: 22, fontWeight: 400}}>Card Balance: $</Text>
          <Text style={{fontSize: 22, fontWeight: 500, color: '#208B3A'}}>{balance}</Text>
        </View>
        <View style={[buyGiftStyle.text, {flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={{fontSize: 22, fontWeight: 400}}>Added Funds: $</Text>
          <Text style={{fontSize: 22, fontWeight: 500, color: '#208B3A'}}>{inputValue}</Text>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity
          style={buyGiftStyle.fundChange}
          onPress={() =>
            setInputValue(inputValue > 0 ? String(Number(inputValue) - 5): 0)
          }
          >
            <Text style={{fontSize: 22, color: '#F4F2EC'}}> - $5</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={buyGiftStyle.fundChange}
          onPress={() =>
            handleAdd()
        }
          >
            <Text style={{fontSize: 22, color: '#F4F2EC'}}> + $5</Text>
          </TouchableOpacity>
        </View>
        <View style={[buyGiftStyle.text, {flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={{fontSize: 22, fontWeight: 400}}>Cost</Text>
          <Text style={{fontSize: 22, fontWeight: 400}}>: </Text>
          <Image source={coin} style={buyGiftStyle.coin}/>
          <Text style={[{fontSize: 22, fontWeight: 500}, { color: isRed }]}> {inputValue *5} </Text>
        </View>
      </View>
      <View style={buyGiftStyle.select}>
        <TouchableOpacity
        onPress={() =>
          navigation.navigate('Checkout', {isGift: false, inputValue})
        }>
            <Text style={{fontSize: 22, color: 'white', fontWeight: 500}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const buyGiftStyle = StyleSheet.create({

  giftIt: {
    alignItems: 'center', height:45, borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey', justifyContent: 'center',
    backgroundColor: '#f9f9f9', width: 70, alignSelf: 'center'
  },
  notEnough: {
    alignSelf: 'center',
    color: 'red',
  },
  select: {
    padding: 10,
    width: 150,
    margin: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#208B3A',
    top: 420,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 5
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
  giftCard: {
    height: 198.72,
    width: 300,
    borderRadius: 16,
    alignSelf: 'center',
    top: 100
  },
  amount: {
    justifyContent: 'center',
    // alignItems: 'left',
    top: 350,
    position: 'absolute',
    alignSelf: 'center',
    // flexDirection: 'row'
  },
  fundChange: {
    backgroundColor: '#208B3A',
    borderRadius: 5,
    paddingVertical: 5,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  coin: {
    height: 24,
    width: 15.5,
  },
  coin2: {
    height: 24,
    width: 15.5,
    tintColor: '#208B3A'
  },
  text: {
    fontSize: 24,
    fontWeight: 500,
    // borderWidth: 1,
    // borderColor: '#B7EFC5',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    // color: '#10451D',
    margin: 5,
    // backgroundColor: '#D9D9D980',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    width: 290,
    elevation: 5
  }
});

export default GiftCard;