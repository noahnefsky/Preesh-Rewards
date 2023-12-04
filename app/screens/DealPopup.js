
import { React, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { useDispatch, useSelector } from 'react-redux';
import coin from '../../assets/coin.png';
import logo from '../../assets/logo.png';
import { saveDeal } from '../Slices/SavedDealsSlice';


const Popup = ( {argument} ) => {
  const deal = argument[0];
  const title = argument[1];
  const { imagesState } = useSelector(state => state.images);

  const [image, setImage] = useState(imagesState[deal.restaurantName]);

  
  const dispatch = useDispatch();
  
  const handleSave = () => {
    dispatch(saveDeal({ deal:  deal, unsave: saved, dealType: title}));
    setSaved(!saved);
  }  

  const [saved, setSaved] = useState(deal.saved);

  return (
    <View style={scanStyles.container}>
      <Image source={logo} style={scanStyles.logo}/>
      <View>
      <Image source={image ? { uri: image } : null} style={scanStyles.restaurantImage} />
        <View style={scanStyles.points}>
           <Text style={scanStyles.pointsText}>{argument.points} Preesh </Text>
           <Image source={coin} style={scanStyles.coin}/>
        </View>
        <View style={{}}>
          <Text></Text>
        </View>
      </View>
      <View style={{backgroundColor: '#B7EFC5', borderRadius: 10, alignSelf: 'center', height: 31, width: 134, top: 3, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{deal.description}</Text>
      </View>
      <View style={{alignSelf: 'center', top: 300, position: 'absolute'}}>
        <QRCode size={129} content={deal.code}/>
      </View>
      <Text style={[scanStyles.code, {top: 435}]}>{deal.code}</Text>
      <Text style={[scanStyles.code, {top: 455}]}>Scan to use rewards</Text>
      { saved ?
      (<Pressable
      onPress={handleSave}
      style={[scanStyles.save]}><Text style={{color: 'white', fontWeight: 'bold'}}>Unsave</Text></Pressable>):
      <Pressable
      onPress={handleSave}
      style={[scanStyles.save]}><Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text></Pressable>}
    </View>
  );
};

const scanStyles = StyleSheet.create({
    logo: {
        width: 218,
        height: 68,
        alignSelf: 'center',
        top: 7,
      },
      save: {
        backgroundColor: '#208B3A',
        position: 'absolute',
        top: 480,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        alignSelf: 'center'
      },
      restaurantImage: {
        width: 339,
        height: 174,
        alignSelf: 'center',
        top: 12,
      },
    code: {
        fontSize: 13,
        fontWeight: 400,
        position: 'absolute',
        alignSelf: 'center',
        color: '#545454'
    },
    container: {
      height: 510,
      width: 339,
      top: 70,
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    points: {
      flexDirection: 'row',
      position: 'absolute',
      top: 150,
      backgroundColor: '#B7EFC5',
      padding: 5,
      borderRadius: 10,
      left: 5
    },
    pointsText: {
      fontWeight: 700,
      fontSize: 14,
      color: '#208B3A'
    },
    coin: {
      height: 19,
      width: 12,
    }
});

export default Popup;