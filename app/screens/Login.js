import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Pressable, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../assets/logo.png'
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();



const Login = ({navigation}) => {
  const [signIn, setSignIn] = useState(false); 
  const [createAccount, setCreateAccount] = useState(false); 

  const backArrowEvent = () => {
    setSignIn(false);
    setCreateAccount(false);
  }

  function handleState() {
    setCreateAccount(false);
    setSignIn(true);
 }

  return (
    <SafeAreaView style={loginStyles.container}>
      {signIn || createAccount ?
      <AntDesign style={loginStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={backArrowEvent}
        /> : null}
      <Image source={logo} style={loginStyles.logo}/>
      {signIn ? (<SignIn argument={navigation}/>) : 
      createAccount ? (<CreateAccount 
        change = {handleState}
        argument={[setSignIn, setCreateAccount]}/>) :
      (
      <View style={loginStyles.signIn}>
      <Pressable
      onPress={() =>
        setSignIn(true)
      }>
        <Text style={loginStyles.signInText}>Sign In</Text>
      </Pressable>
      <Pressable
       onPress={() =>
        setCreateAccount(true)
      }
      style={loginStyles.createAccount}>
        <Text style={loginStyles.createAccountText}>Create Account</Text>
      </Pressable></View>)}
      
    </SafeAreaView>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  signIn: {
    backgroundColor: '#10451D',
    borderRadius: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    width: 342,
    height: 50,
    position: 'absolute',
    left: 24,
    top: 344,
  },
  createAccount: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    width: 342,
    height: 50,
    position: 'absolute',
    top: 61,
    borderWidth: 1,
    borderColor:'#2D2F2D'
  },
  signInText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  createAccountText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#2D2F2D',
  },
  logo: {
    width: 310.97,
    height: 97,
    position: 'absolute',
    left: 39.51,
    top: 200,
  },
  backArrow: {
    left: '8%',
    top: 80,
    position: 'absolute',
    height: 24
  },
  blur: {
    position: 'absolute',
    width: 344,
    height: 120, 
    left: 22,
    top: 217,
  }
});

export default Login;