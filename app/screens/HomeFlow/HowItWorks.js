import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/logo.png'
import coin from '../../../assets/coin.png'
import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();

const HowItWorks = ( {navigation} ) => {
  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <Image source={logo} style={howItWorksStyles.logo}/>
      <AntDesign style={howItWorksStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.navigate('HomeMain', {})
                  }
        />
      <Text style={[howItWorksStyles.title, {top: 112,}]}>How it works</Text>
      <Text style={[howItWorksStyles.explanation, {top: 150,}]}>Start collecting Preesh Points for rewards when you
leave tips for takeout orders or dining in. The more
Preesh Points you collect the more rewards you 
can receive, so let’s get tipping!</Text>
    <Text style={[howItWorksStyles.title, {top: 283,}]}>Loyalty Status</Text>
    <Text style={[howItWorksStyles.explanation, {top: 318,}]}>The Preesh Loyalty program allows members to 
collect points and level up in ‘status’ which then 
unlocks better rewards!</Text>
    <View style={[howItWorksStyles.barContainer, {top: 413}]}>
    <Text style={howItWorksStyles.status}>Bronze</Text>
        <View style={howItWorksStyles.barGreen}>
            <Text style={howItWorksStyles.pointsText}>100</Text>
            <Image source={coin} style={howItWorksStyles.coin}/>
        </View>
    </View>
    <View style={[howItWorksStyles.barContainer, {top: 479}]}>
    <Text style={howItWorksStyles.status}>Silver</Text>
        <View style={howItWorksStyles.barGreen}>
            <Text style={howItWorksStyles.pointsText}>200</Text>
            <Image source={coin} style={howItWorksStyles.coin}/>
        </View>
    </View>
    <View style={[howItWorksStyles.barContainer, {top: 545}]}>
    <Text style={howItWorksStyles.status}>Gold</Text>
        <View style={howItWorksStyles.barGreen}>
            <Text style={howItWorksStyles.pointsText}>300</Text>
            <Image source={coin} style={howItWorksStyles.coin}/>
        </View>
    </View>
    <View style={[howItWorksStyles.barContainer, {top: 611}]}>
    <Text style={howItWorksStyles.status}>Platinum</Text>
        <View style={howItWorksStyles.barGreen}>
            <Text style={howItWorksStyles.pointsText}>400</Text>
            <Image source={coin} style={howItWorksStyles.coin}/>
        </View>
    </View>
    </SafeAreaView>
  );
};

const howItWorksStyles = StyleSheet.create({
    logo: {
      width: 109,
      height: 34,
      position: 'absolute',
      left: '10.25%',
      top: 46,
    },
    backArrow: {
        left: '8%',
        top: 112,
        position: 'absolute',
        height: 24
    },
    title: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 24
    },
    explanation: {
        position: 'absolute',
        width: 344,
        height: 96,
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 24
    },
    barContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 331,
        height: 51,
        alignSelf: 'center',
        borderRadius: 5,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 },
        justifyContent: 'center'
    },
    barGreen: {
        backgroundColor: '#10451D',
        width: 54,
        height: 51,
        left: 0,
        top: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    pointsText: {
        fontWeight: 600,
        fontSize: 15,
        left: 4,
        color: 'white',
        top: 18,
    },
    coin: {
        height: 16.5,
        width: 11,
        left: 37,
        tintColor: 'white',
    },
    status: {
        fontWeight: 600,
        fontSize: 17,
        left: 67,
        position: 'absolute',
    }
});

export default HowItWorks;