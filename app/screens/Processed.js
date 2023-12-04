import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Linking, TouchableOpacity, Clipboard, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../assets/logo.png'

MaterialCommunityIcons.loadFont();
AntDesign.loadFont();

let user = "Noah Nefsky"
// let userMessage = "Happy Birthday! I hope you have an amazing day and put this to good use:)"
let code = "6132 7279 5118 3797";
let subject = `You have received a gift from ${user}!`
let emailMessage = `To use this giftcard, go to gift cards in your` + `profile section and click redeem. Then just enter your code:\n${code}`

const Processed = ( {route, navigation} ) => {
    const gift = route.params;
    const [isGift] = useState(gift);   
    const [copiedText, setCopiedText] = useState('');

    function getSMSDivider() {
        return Platform.OS === "ios" ? "&" : "?";
      }

    const copyToClipboard = () => {
        Clipboard.setString(code);
    };

    return (
        <SafeAreaView>
            <Image source={logo} style={processedStyles.logo}/>
            <Text style={processedStyles.title}>Your payment has been processed!</Text>
        {!isGift ?
            (
                <View>
                    <Text style={processedStyles.description}>Please navigate to the gift cards page to see it.
                    If you previously had gift card money,
                    this purchase will be added to the total. </Text>
                 <TouchableOpacity
                 style={{justifyContent: 'center', backgroundColor: '#208B3A', width: 220, borderRadius: 15, alignSelf: 'center'}}
                 onPress={() =>
                    navigation.navigate('GiftCards', {})
                }
                 >
                     <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                         <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 50, color: 'white'}}>Go to my gift 
                         cards <MaterialCommunityIcons name="wallet-giftcard" size={28} color={'white'}/></Text>
                         
                     </View>
                 </TouchableOpacity>
                 </View>
            ) :
            (
                <View>
                    <Text style={processedStyles.description}>Share this gift below via email or text.
                    
                    To redeem this gift card, the person must redeem the code below.
                    </Text>
                    <TouchableOpacity onPress={() => copyToClipboard()}>
                        <View style={{flexDirection: 'column', alignItems: 'center', top: 50}}>
                            <Text style={processedStyles.code}>{code}</Text>
                            <View style={{flexDirection: 'row', marginTop: 5}}
                            onPress={() => copyToClipboard()}>
                                <Text style={processedStyles.copy}>Copy </Text>
                                <MaterialCommunityIcons name="content-copy" size={22} color={'#208B3A'}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
  <View style={{ borderBottomWidth: 1, borderTopWidth: 1, alignItems: 'center', borderRightWidth: 1, borderColor: '#A39E9E', top: 175, width: '50%', height: 85, justifyContent: 'center' }}>
    <MaterialCommunityIcons
      name="email"
      size={35}
      color={'#208B3A'}
      onPress={() =>
        Linking.openURL(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailMessage)}`)
      }
    />
    <Text style={{ paddingTop: 5 }}>Email</Text>
  </View>
  <View style={{ borderBottomWidth: 1, borderTopWidth: 1, alignItems: 'center', borderColor: '#A39E9E', top: 175, width: '50%', height: 85, justifyContent: 'center' }}>
    <AntDesign
      name="message1"
      size={35}
      color={'#208B3A'}
      onPress={() =>
        Linking.openURL(`sms:${getSMSDivider()}body=${encodeURIComponent(subject + "\n" + emailMessage)}`)
      }
    />
    <Text style={{ paddingTop: 5 }}>Text</Text>
  </View>
</View>

                </View>
            )
        }          
        </SafeAreaView>
)};

const processedStyles = StyleSheet.create({
    title: {
        fontSize: 19,
        fontWeight: 600,
        alignSelf: 'center',
        margin: 40,
        marginTop: 80,
        color: '#208B3A'
    },
    description: {
        fontSize: 16.5,
        fontWeight: 400,
        alignSelf: 'center',
        margin: 40,
        width: '85%',
        textAlign: 'center',
        lineHeight: 24
    },
    code: {
        fontSize: 28,
        fontWeight: 600,
        alignSelf: 'center',
        marginTop: 0
    },
    copy: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 500,
        color: '#208B3A',
        marginBottom: 40
    },
    logo: {
        width: 109,
        height: 34,
        position: 'absolute',
        left: 40,
        top: 46,
    }
});


export default Processed;
                