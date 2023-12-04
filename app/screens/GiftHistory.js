import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import coin from '../../assets/coin.png';
import { useSelector } from 'react-redux';


AntDesign.loadFont();
MaterialIcons.loadFont();

const History = ( {navigation} ) => {  
    const { giftsState } = useSelector(state => state.gifts);
  return (
    <SafeAreaView>
        <Text style={historyStyles.title}>Past Gifts</Text>
        <AntDesign style={historyStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.goBack()
                  }
        />
        
        {giftsState.length ?
        (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{top: 80}}>
        {giftsState.map((gift) => {
        
         return (
            <View style={historyStyles.orders}>
                <MaterialIcons style={{paddingHorizontal: 10}}name="card-giftcard" size={50} color={'#208B3A'}/>
                <View style={{flexDirection: 'column', left:20, gap: 5}}>
                    <Text style={{fontWeight: 600, fontSize: 15}}>{gift.datePurchased}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 700, fontSize: 14, color: '#208B3A'}}>{gift.points} Preesh </Text>
                        <Image source={coin} style={historyStyles.coin}/>
                    </View>
                    <Text style={{fontSize: 16}}>${gift.money}</Text>
                    <Text style={{fontWeight: 500}}>{gift.code}</Text>
                </View>
            </View>
         );
      })}
      <View style={{height:200}}></View>
      </ScrollView>) : 
      (
        <View style={historyStyles.noRewardsContainer}>
            <Text style={historyStyles.noneUsedYet}>You have never purchased a gift.</Text>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={historyStyles.goEarn}>Go earn some Preesh </Text>
                <Image source={coin} style={historyStyles.coin}/>
            </View>
            <Text style={historyStyles.goEarn}> and buy a gift for a loved one!</Text>
            <Text style={historyStyles.explanation}>To buy a gift, just go to the buy gift screen, choose an amount and checkout.</Text>
        </View>
      )}
 </SafeAreaView>
  );
};

const historyStyles = StyleSheet.create({
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
        alignSelf: 'center'
    },
    orders: {
        // paddingHorizontal: 50,
        paddingVertical: 10,
        margin: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        alignItems: 'center',
    },
    picture: {
        height: 80,
        width: 120,
        position: 'absolute',
        left: 10,
    },
    coin: {
        height: 19,
        width: 12,
      },
    goEarn: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 400,
        color: '#155D27'
    },
    explanation: {
        paddingTop: 15,
        width: 320,
        textAlign:"center",
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 400,
        color: 'black'
    },
    noneUsedYet: {
        alignSelf: 'center', fontSize: 18, fontWeight: 600, paddingBottom: 15, color: 'black'
    },
    noRewardsContainer: {
        margin: 10, padding: 35, top: 80, borderWidth: 1, backgroundColor: '#f9f9f9', borderColor: 'white'
    }
});

export default History;