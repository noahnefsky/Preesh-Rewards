import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { usePromotion } from '../../Slices/UsePromotionSlice';
import Popup from './PromoPopup';

AntDesign.loadFont();
MaterialIcons.loadFont();
Feather.loadFont();

// Need to get list of promos with start and end dates
const Promotions = ( {navigation} ) => {
  const dispatch = useDispatch();
  const { promotionsState } = useSelector(state => state.usePromotion);

    const [promoPop, setPromoPop] = useState(null)

    const setButton = (promotionGiven) => {
      if (!promotionGiven.claimed) {
          dispatch(usePromotion({ promotion: promotionGiven }));
          // add actions adding this to saved promotions to use
      }
  }
  

  return (
    <SafeAreaView>
        {promoPop ? <Popup argument={promoPop}/>: null}
        {promoPop ?
      <Feather
      onPress={() =>
        setPromoPop(null)
      }
      style={{top: '25%', left: '84.5%', position: 'absolute'}} color={'#10451D'} name="x" size={30}/> : null}
        <Text style={promoStyles.title}>Promotions</Text>
        <AntDesign style={promoStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.navigate('Profile', {})
                  }
        />

    {!promoPop ?
        <ScrollView style={{paddingBottom: 100, top: 80}}>
        
        {promotionsState.map((promotion) => (
    <View /*key={promotion.index}*/ style={promoStyles.select}>
      <Text style={promoStyles.promoTitle}>{promotion.name}</Text>
      <Text style={promoStyles.promoDetail}>{promotion.description}</Text>
      <Button
        onPress={() => setButton(promotion)}
        color={promotion.claimed  ? 'white' : null}
        title={promotion.claimed ? 'Claimed' : 'Claim'}
      />
      {promotion.claimed ? (
        <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={() => setPromoPop(promotion)}
        >
          <MaterialIcons name="qr-code" size={32} style={{ alignSelf: 'center' }} color={'#208B3A'} />
          <Text style={{ fontWeight: 600 }}>Scan to use this promotion</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  ))}
    <View style={{height:100}}></View>
    </ScrollView> : null}
    </SafeAreaView>
  );
};

const promoStyles = StyleSheet.create({
    backArrow: {
        left: '8%',
        top: 80,
        position: 'absolute',
        height: 24
    },
    select: {
        padding: 40,
        margin: 8,
        borderWidth: 2,
        borderColor: '#208B3A',
        backgroundColor: '#B7EFC5',
        borderStyle: 'dotted',
        alignSelf: 'center'
    },
    title: {
        fontWeight: 600,
        fontSize: 18,
        top: 80,
        position: 'absolute',
        alignSelf: 'center'
    },
    promoTitle: {
        fontSize: 22,
        color: '#404040',
        fontWeight: 600
    },
    promoDetail: {
        fontSize: 15,
        color: '#404040',
        paddingTop: 10
    },
    redeem: {
        backgroundColor: '#208B3A',
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        width: 76,
        height: 25,
        paddingVertical: 8,
        paddingHorizontal: 5,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
      }
});

export default Promotions;