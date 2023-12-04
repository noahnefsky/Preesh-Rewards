
import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../assets/logo.png'
import { QRCode } from 'react-native-custom-qr-codes-expo';
import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();

const code = "6132 7279 5118 3797"
const Scan = ( {navigation} ) => {
  return (
    <SafeAreaView>
    <Text style={scanStyles.title}>Preesh Card</Text>
      <AntDesign style={scanStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                  navigation.goBack(null)
                  }
        />
      <View style={scanStyles.container}>
        <Image source={logo} style={scanStyles.logo}/>
        <View style={scanStyles.line}></View>
      </View>
      <View style={{alignSelf: 'center', top: 292, position: 'absolute'}}>
        <QRCode size={250} content={code}/>
      </View>
      <Text style={scanStyles.code}>{code}</Text>
      <Text style={scanStyles.message}>Scan to collect rewards</Text>
      {/* <Button title="Add to Wallet" onPress={addToWallet} /> */}
    </SafeAreaView>
  );
};

const scanStyles = StyleSheet.create({
  container: {
    width: 339,
    height: 550,
    top: 130,
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: '#208B3A',
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute'
  },
  logo: {
    width: 250,
    height: 78,
    top: 17,
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
  line: {
    height: 5,
    backgroundColor: '#208B3A',
    top: 122,
    width: 339,
    position: 'absolute'
  },
  message: {
    fontSize: 15,
    fontWeight: 400,
    position: 'absolute',
    top: 602,
    alignSelf: 'center',
    color: '#545454'
  },
  code: {
    fontSize: 15,
    fontWeight: 400,
    position: 'absolute',
    top: 542,
    alignSelf: 'center',
    color: '#545454'
  }
});

export default Scan;