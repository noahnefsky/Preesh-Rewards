import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import giftCard from '../../../assets/giftCard.png';

AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

// need to add proper algorithm for calcuting pressh points

const GiftCard = ( {navigation} ) => {
  const { balance } = useSelector(state => state.saveInfo);

  return (
    <SafeAreaView>
      <Text style={buyGiftStyle.title}>Preesh Card</Text>
      <AntDesign style={buyGiftStyle.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                  navigation.goBack(null)
                  }
        />
      <Image source={giftCard} style={buyGiftStyle.giftCard}/>
      <View style={buyGiftStyle.amount}>
        <TouchableOpacity
        onPress={() =>
          navigation.navigate('ScanCard')
        }>
          <MaterialIcons style={{alignSelf: 'center'}} name="qr-code" size={55} color={'#155D27'}/>
        </TouchableOpacity>
        <View style={[buyGiftStyle.text, {flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={{fontSize: 22, fontWeight: 400}}>Card Balance: $</Text>
          {/* <Image source={coin} style={buyGiftStyle.coin}/> */}
          <Text style={{fontSize: 22, fontWeight: 500, color: '#208B3A'}}>{balance}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <View style={buyGiftStyle.select}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddFunds', {})
          }>
              <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 20, color: 'white', fontWeight: 500, textAlign: 'center', lineHeight: 28}}>Add Funds{"\n"}
                  <MaterialIcons style={buyGiftStyle.backArrow} name="add-circle" size={28} color={'white'}
                      onPress={() =>
                        navigation.goBack(null)
                      }
                  />
                  </Text>
                  
              </View>
          </TouchableOpacity>
        </View>
        <View style={buyGiftStyle.select}>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate('BuyGift', {})
          }>
              <View style={{flexDirection: 'column'}}>
                  <Text style={{fontSize: 20, color: 'white', fontWeight: 500, textAlign: 'center', lineHeight: 28}}>Buy a Gift{"\n"}
                  <MaterialCommunityIcons style={buyGiftStyle.backArrow} name="gift" size={28} color={'white'}
                      onPress={() =>
                      navigation.goBack(null)
                      }
                  />
                  </Text>
                  
              </View>
          </TouchableOpacity>
        </View>
        <Text style={{position: 'absolute', width: 290, textAlign: 'center', top: 327, fontSize: 18}}>
            Turn Preesh Points to Preesh card money redeemable at any of our Preesh partners.</Text>
      </View>
      <View style={buyGiftStyle.redeem}>
          <TouchableOpacity style={{flexDirection: 'row'}}
          onPress={() =>
            navigation.navigate('RedeemGift', {})
          }>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 22, color: 'white', fontWeight: 500, textAlign: 'center', lineHeight: 30}}>Redeem a Gift
                  <Text> </Text>
                  <MaterialCommunityIcons style={buyGiftStyle.backArrow} name="gift" size={30} color={'white'}
                      onPress={() =>
                      navigation.goBack(null)
                      }
                  />
                  </Text>
                  
              </View>
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
    padding: 5,
    width: 150,
    top: 230,
    margin: 8,
    // marginTop: 235,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#208B3A',
    // top: 175,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 5,
  },
  redeem: {
    top: 325,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    width: 200,
    elevation: 5,
    backgroundColor: '#2DC653',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    borderRadius: 5,

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
  text: {
    // borderWidth: 1,
    // borderColor: '#B7EFC5',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    // color: '#10451D',
    margin: 8,
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