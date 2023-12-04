
import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../assets/logo.png'
import wallet from '../../assets/AppleWallet.png'
import { QRCode } from 'react-native-custom-qr-codes-expo';

const code = "6132 7279 5118 3797"
const Scan = () => {
  return (
    <SafeAreaView>
      <View style={scanStyles.container}>
        <Image source={logo} style={scanStyles.logo}/>
        <View style={scanStyles.line}></View>
      </View>
      <View style={{alignSelf: 'center', top: 250, position: 'absolute'}}>
        <QRCode size={200} content={code}/>
      </View>
      <Text style={scanStyles.code}>{code}</Text>
      <Text style={scanStyles.message}>Scan to collect rewards</Text>
      <Image source={wallet} style={scanStyles.wallet}/>
    </SafeAreaView>
  );
};

const scanStyles = StyleSheet.create({
  container: {
    width: 339,
    height: 500,
    top: 100,
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
  wallet: {
    width: 166.1,
    height: 51.49,
    top: 625,
    alignSelf: 'center',
    position: 'absolute'
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
    top: 522,
    alignSelf: 'center',
    color: '#545454'
  },
  code: {
    fontSize: 15,
    fontWeight: 600,
    position: 'absolute',
    top: 462,
    alignSelf: 'center',
    color: '#545454'
  }
});

export default Scan;