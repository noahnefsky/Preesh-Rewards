import React, { useRef, useState } from 'react';
import { Animated, Easing, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import coin from '../../assets/coin.png';
import Popup from './DealPopup';

AntDesign.loadFont();
MaterialIcons.loadFont();
Feather.loadFont();

const RewardListGeneral = ( {route, navigation} ) => {
    const { imagesState } = useSelector(state => state.images);

    const [images, setImages] = useState(imagesState);
  
    const { savedDealsState } = useSelector(state => state.saveDeal);
    const { browseTitle, popularTitle, favoritesTitle, savedTitle} = route.params;
    
    let rewards = savedDealsState;
    let title = "Browse Deals";
    if (popularTitle) {
      const { mostPopularState } = useSelector(state => state.mostPopular);
      rewards = mostPopularState;
      title = popularTitle;
    } else if (favoritesTitle) {
      const { favouritesState } = useSelector(state => state.favourites);
      rewards = favouritesState;
      title = favoritesTitle;
    } else if (browseTitle) {
      const { browseDealsState } = useSelector(state => state.browseDeals);
      rewards = browseDealsState;
      title = browseTitle;
    }
    


    
    let splitIndex = rewards.length / 2;
    let rewards1 = rewards.slice(0, splitIndex);
    let rewards2 = rewards.slice(splitIndex+1);

    
    // if (popularTitle) 
    if (savedTitle) title = savedTitle;

    const [isBlur, setBlur] = useState(false);
    const [reward, setReward] =useState(null)
    const opacityAnimation = useRef(new Animated.Value(0.2)).current;
    const opacityStyle = { opacity: opacityAnimation };
    const animateElement = () => {

    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.ease
    }).start(() => {
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }).start()
    })
  };
  const handlePress = (reward) => {
    setBlur(true);
    setReward(reward)
  }
  return (
    <SafeAreaView style={{width: '100%', alignItems: 'center'}}>
      {isBlur ? <Popup argument={[reward, title]}/>: null}
      {isBlur ?
      <Feather
      onPress={() =>
        setBlur(false)
      }
      style={{top: '10%', left: '85%', position: 'absolute'}} color={'#10451D'} name="x" size={30}/> : null}
      <Text style={savedDealsStyles.title}>{title}</Text>
        <AntDesign style={savedDealsStyles.backArrow} name="arrowleft" size={24} color={'black'}
                onPress={() =>
                    navigation.goBack(null)
                  }
        />
        <MaterialIcons name="filter-list" size={24} style={savedDealsStyles.filterIcon}/>
      <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        savedDealsStyles.dealsContainer, 
        isBlur ? { opacity: 0.2, opacityAnimation} : null,
      ]}>
        <View style={{flexDirection: 'row', gap: 30}}>
        <View style={{width:140}}>
          {rewards1.map((reward) => {
          return (
            <View style={savedDealsStyles.dealView}>
              <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={savedDealsStyles.picture}/>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{fontWeight: 400, fontSize: 15}}>{reward.restaurantName}</Text>
                  <Text style={savedDealsStyles.descriptionText}>{reward.description}</Text>
                </View>
                  <MaterialIcons name="qr-code" size={24} style={{top: 0, marginEnd: 1}}
                  onPress={() =>
                    handlePress(reward)
                  }/>
              </View>
              <View style={savedDealsStyles.points}>
                        <Text style={savedDealsStyles.pointsText}>{reward.points} Preesh </Text>
                        <Image source={coin} style={savedDealsStyles.coin}/>
              </View>
            </View>
          );
        })}
        <View style={{height:100}}></View>
      </View>
      <View style={{width:140}}>
      {rewards2.map((reward) => {
         return (
          <View style={savedDealsStyles.dealView}>
            <Image source={images ? { uri: images[reward.restaurantName] } : null} style={savedDealsStyles.picture}/>
            <View style={savedDealsStyles.points}>
                        <Text style={savedDealsStyles.pointsText}>{reward.points} Preesh </Text>
                        <Image source={coin} style={savedDealsStyles.coin}/>
              </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{fontWeight: 400, fontSize: 15}}>{reward.restaurantName}</Text>
                  <Text style={savedDealsStyles.descriptionText}>{reward.description}</Text>
                </View>
                  <MaterialIcons
                  onPress={() =>
                    handlePress(reward)
                  }
                  name="qr-code" size={24} style={{top: 0, marginEnd: 1}}/>
              </View>
            </View>
         );
      })}
      </View>
      </View>
      <View style={{height:100}}></View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const savedDealsStyles = StyleSheet.create({
  blur: {
    opacity: 0.2
  },
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
  dealsContainer: {
      width: 310,
      top: 80,
  },
  dealView: {
    height: 129,
    width: 140,
    flexDirection: 'column',
    marginBottom: 7,
  },
  descriptionText: {
    fontWeight: 400,
    fontSize: 13,
    color: '#155D27'
  },
  points: {
    flexDirection: 'row',
    position: 'absolute',
    top: 64,
    backgroundColor: '#B7EFC5',
    padding: 4,
    borderRadius: 10,
    left: 2
  },
  pointsText: {
    fontWeight: 600,
    fontSize: 13,
    color: '#208B3A'
  },
  picture: {
    width: 140,
    height: 92
  },
  coin: {
    height: 19,
    width: 12,
  },
  filterIcon: {
    left: '75%',
    top: 80,
    position: 'absolute'
  }
});

export default RewardListGeneral;