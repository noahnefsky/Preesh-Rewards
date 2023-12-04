import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import coin from '../../../assets/coin.png';
import { useSelector } from 'react-redux';


AntDesign.loadFont();
MaterialIcons.loadFont();
Feather.loadFont();

const Search = ( {searchText, onRewardStateChange} ) => {  
    const { imagesState } = useSelector(state => state.images);
    const [images, setImages] = useState(imagesState);
    const { browseDealsState } = useSelector(state => state.browseDeals);
    let results = browseDealsState.filter(o => o.restaurantName.toLowerCase().includes(searchText.toLowerCase()));
    if (searchText == "") {
        results = []
    }
    const [reward, setReward] = useState(null)

    const handlePress = (newState, reward) => {
        searchText = ""
        results = []
        setReward(reward);
        onRewardStateChange(newState, reward);
      }      

  return (
    <View style={{top: 65, width: '100%'}}>
        <ScrollView 
        showsVerticalScrollIndicator={false}>
        {results.map((reward) => {
        
         return (
            <View style={historyStyles.orders}>
                <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={historyStyles.picture}/>
                <View style={{flexDirection: 'column', gap: 2, top: 9}}>
                    <Text style={{fontWeight: 600, fontSize: 15}}>{reward.restaurantName}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 700, fontSize: 14, color: '#208B3A'}}>{reward.points} Preesh </Text>
                        <Image source={coin} style={historyStyles.coin}/>
                    </View>
                    <Text>"{reward.rewardDescription}"</Text>
                    <Text>{reward.date}</Text>
                </View>
                <MaterialIcons name="qr-code" size={34} style={{left: 35}} color={"#155D27"}
                  onPress={() => {
                    handlePress(true, reward);
                  }}/>
            </View>
         );
      })}
      <View style={{height:250}}></View>
      </ScrollView>
      {/* )} */}
 </View>
  );
};

const historyStyles = StyleSheet.create({
    backArrow: {
        left: 29,
        top: 80,
        position: 'absolute',
        height: 24,
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        top: 90,
        position: 'absolute',
        alignSelf: 'center'
    },
    orders: {
        paddingHorizontal: 15,
        paddingVertical: 1,
        borderWidth: 2,
        borderColor: 'lightgrey',
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    picture: {
        height: 50,
        width: 75,
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
});

export default Search;