import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();

const Notifications = ( {navigation} ) => {
  return (
    <SafeAreaView>
        <Text style={aboutStyles.title}>About Preesh</Text>
        <AntDesign style={aboutStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.navigate('Profile', {})
                  }
        />
        <View style={aboutStyles.select}><TouchableOpacity>
            <Text style={aboutStyles.text}>Check us out on instagram</Text>
        </TouchableOpacity>
        </View>
        <View style={aboutStyles.select}>
            <TouchableOpacity onPress={() => Linking.openURL('http://preeshrewards.com')}>
            <Text style={aboutStyles.text}>preeshrewards.com</Text>
        </TouchableOpacity>
        </View>
        <View style={aboutStyles.select}><TouchableOpacity>
            <Text style={aboutStyles.text}>Legal</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const aboutStyles = StyleSheet.create({
    backArrow: {
        left: '8%',
        top: 80,
        position: 'absolute',
        height: 24
    },
    select: {
        padding: 20,
        margin: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: '#f9f9f9',
        top: 80,
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        top: 80,
        position: 'absolute',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        color: '#404040'
    }
});

export default Notifications;