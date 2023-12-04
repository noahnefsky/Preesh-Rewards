import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Clipboard, Linking} from 'react-native';
import logo from '../../../assets/logo.png'
import world from '../../../assets/world.png'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

AntDesign.loadFont();
MaterialCommunityIcons.loadFont();

let code = "PREESH-NOAH25FRIEND"
let link = "https://preeshrewards.com/"
let subject = "Join Preesh and earn 25 preesh points right away!"
let emailMessage = "Preesh is helping to make tipping a much more enjoyable " +
                    "and rewarding process for all parties involved. Earn 25 Preesh points right away " +
                    `when you sign up with this link: ${link} and use this code: ${code}` 
const Invite = ( {navigation} ) => {
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = () => {
        Clipboard.setString(code);
      };
      function getSMSDivider() {
        return Platform.OS === "ios" ? "&" : "?";
      }
  return (
    <SafeAreaView>
        <Image source={logo} style={inviteStyles.logo}/>
        <Text style={inviteStyles.title}>Invite a friend</Text>
        <AntDesign style={inviteStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.navigate('Profile', {})
                  }
        />
        <View style={inviteStyles.greenBack}></View>
        <Image source={world} style={inviteStyles.world}/>
        <Text style={inviteStyles.message}>Share your code with a friend. When they sign up for 
        Preesh using your code, they will receive 25 Preesh Points- and so will you! </Text>
        <Text style={inviteStyles.yourCode}>Your code:</Text>
        <View style={inviteStyles.codeContainer}>
            <TouchableOpacity 
            onPress={() => copyToClipboard()}
            style={{height: 61, width: 270, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={inviteStyles.code}>{code}</Text>
            </TouchableOpacity>
        </View>
        <Text style={inviteStyles.copyMessage}>Click above to copy to clipboard</Text>
        <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{borderBottomWidth: 1, borderTopWidth: 1, alignItems: 'center', borderRightWidth: 1,
                    borderColor: '#A39E9E', top: 562, width: '50%', height: 85, justifyContent: 'center'}}>
                <MaterialCommunityIcons name="email" size={35} color={'black'}
                onPress={() =>
                    Linking.openURL(`mailto:?subject=${subject}&body=${emailMessage}`)
                  }
                />
                <Text style={{paddingTop: 5}}>Email</Text>
            </View>
            <View style={{borderBottomWidth: 1, borderTopWidth: 1, alignItems: 'center',
                    borderColor: '#A39E9E', top: 562, width: '50%', height: 85, justifyContent: 'center'}}>
                <AntDesign name="message1" size={35} color={'black'}
                onPress={() =>
                    Linking.openURL(`sms:${getSMSDivider()}body=${emailMessage}`)
                  }
                />
                <Text style={{paddingTop: 5}}>Text</Text>
            </View>
        </View>
    </SafeAreaView>
  );
};

const inviteStyles = StyleSheet.create({
    backArrow: {
        left: '8%',
        top: 97,
        position: 'absolute',
        height: 24
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        top: 97,
        position: 'absolute',
        alignSelf: 'center'
    },
    greenBack: {
        backgroundColor: '#B7EFC5',
        top: 124,
        height: 142,
        position: 'absolute',
        width: '100%',
    },
    logo: {
        width: 109,
        height: 34,
        position: 'absolute',
        left: '10.25%',
        top: 46,
    },
    world: {
        width: 189,
        height: 189,
        top: 124,
        position: 'absolute',
        alignSelf: 'center'
    },
    message: {
        fontWeight: 400,
        fontSize: 15,
        alignSelf: 'center',
        top: 320,
        position: 'absolute',
        width: 327,
        textAlign: 'center',
    },
    yourCode: {
        fontWeight: 400,
        fontSize: 14,
        position: 'absolute',
        top: 427,
        alignSelf: 'center',
    },
    codeContainer: {
        position: 'absolute',
        top: 451,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#208B3A',
        height: 61,
        width: 270
    },
    code: {
        color: '#208B3A',
        fontSize: 15,
        fontWeight: 'normal',
    },
    copyMessage: {
        fontSize: 11,
        fontWeight: 400,
        alignSelf: 'center',
        top: 521,
        position: 'absolute'
    }
});

export default Invite;