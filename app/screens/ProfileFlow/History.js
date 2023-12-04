import React, {useState} from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import coin from '../../../assets/coin.png';


AntDesign.loadFont();

const History = ( {navigation} ) => { 
    const { imagesState } = useSelector(state => state.images);
    const [images, setImages] = useState(imagesState);

    const { usedRewardsState } = useSelector(state => state.usedRewards);
  return (
    <SafeAreaView>
        <Text style={historyStyles.title}>Past Rewards Used</Text>
        <AntDesign style={historyStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.navigate('Profile', {})
                  }
        />
        
        {usedRewardsState.length ?
        (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{top: 80}}>
        {usedRewardsState.map((reward) => {
        
         return (
            <View style={historyStyles.orders}>
                <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={historyStyles.picture}/>
                <View style={{flexDirection: 'column', left:20, top: 7, gap: 5}}>
                    <Text style={{fontWeight: 600, fontSize: 15}}>{reward.restaurantName}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 700, fontSize: 14, color: '#208B3A'}}>{reward.points} Preesh </Text>
                        <Image source={coin} style={historyStyles.coin}/>
                    </View>
                    <Text>"{reward.description}"</Text>
                    <Text>{reward.date}</Text>
                </View>
            </View>
         );
      })}
      <View style={{height:200}}></View>
      </ScrollView>) : 
      (
        <View style={historyStyles.noRewardsContainer}>
            <Text style={historyStyles.noneUsedYet}>None Used Yet</Text>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={historyStyles.goEarn}>Go earn some Preesh </Text>
                <Image source={coin} style={historyStyles.coin}/>
                <Text style={historyStyles.goEarn}> and reward yourself!</Text>
            </View>
            <Text style={historyStyles.explanation}>To use a reward, just provide the reward's barcode to the cashier before payment.</Text>
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
        paddingHorizontal: 50,
        paddingVertical: 10,
        margin: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
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