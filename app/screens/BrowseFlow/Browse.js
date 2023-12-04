import React, { useRef, useState, useEffect } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import coin from '../../../assets/coin.png';
import logo from '../../../assets/logo.png';
import Popup from '../DealPopup';
import Search from './Search';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


MaterialIcons.loadFont();
Feather.loadFont();
                
const Browse = ( {navigation} ) => {
    const browseTitle = "Browse Places";
    const popularTitle = "Most Popular";
    const favoritesTitle = "Your Favorites";
    const savedTitle = "Saved Deals"

    const { savedDealsState } = useSelector(state => state.saveDeal);
    const { mostPopularState } = useSelector(state => state.mostPopular);
    const { favouritesState } = useSelector(state => state.favourites);
    const { browseDealsState } = useSelector(state => state.browseDeals);    

    const [isBlur, setBlur] = useState(false);
    const [title, setTitle] = useState("");

    const [reward, setReward] =useState(null)
    const [searching, setSearching] = useState(false)
    const [searchText, setSearchText] = useState("")
    const handleClickedStateChange = (newState) => {
        setSearching(newState);
        if (!searching) {
            setSearchText("")
        }
  };

  const handleSearchStateChange = (query) => {
    setSearchText(query)
};

const handleBlurStateChange = (newState, reward) => {
    
    setReward(reward)
    setBlur(newState)
};
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
  const handlePress = (reward, title) => {
    setBlur(true);
    setReward(reward)
    setTitle(title);
  }
  const { imagesState } = useSelector(state => state.images);

  const [images, setImages] = useState(imagesState);


  return (
    <SafeAreaView>
        <View style={{width: '100%', alignItems: 'center'}}>
        <Image source={logo} style={savedDealsStyles.logo}/>
        {isBlur ? <Popup argument={[reward, title]}/>: null}
        {isBlur ?
      <Feather
      onPress={() => {
        setBlur(false);
        
      }}
      style={{top: '5%', left: '85%', position: 'absolute'}} color={'#10451D'} name="x" size={30}/> : null}
        {/* Search */}
        {!isBlur ?
        <SearchBar
        onClickedStateChange={handleClickedStateChange}
        onSearchStateChange={handleSearchStateChange}
        isSearching={searchText}
        />: null}
        {searching && !isBlur?
        <Search 
        onRewardStateChange={handleBlurStateChange}
        // onRewardChange={handleRewardChange}
        searchText={searchText}/> : (
        <ScrollView style={[{top: 75}, isBlur ? { opacity: 0, opacityAnimation} : null]}>
            {/* Browse Places */}
            <View style={{top: 0}}>
                <Text style={{marginLeft: 10, fontWeight: 600, fontSize: 17}}>Browse Places</Text>
                <ScrollView horizontal={true} style={{height: 250, margin: 10}} showsHorizontalScrollIndicator={false}>
                {browseDealsState.map((reward) => {
                    return (
                    <View style={savedDealsStyles.dealView}>
                        <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={savedDealsStyles.picture}/>
                        <View style={savedDealsStyles.points}>
                            <Text style={savedDealsStyles.pointsText}>{reward.points} Preesh </Text>
                            <Image source={coin} style={savedDealsStyles.coin}/>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                            <Text style={{fontWeight: 400, fontSize: 15}}>{reward.restaurantName}</Text>
                            <Text style={{fontWeight: 400, fontSize: 13, color: '#155D27'}}>{reward.description}</Text>
                            </View>
                            <MaterialIcons
                            onPress={() =>
                                handlePress(reward, browseTitle)
                            }
                            name="qr-code" size={24} style={{top: 0, marginEnd: 1}}/>
                        </View>
                        </View>
                    );
                })}
                </ScrollView>
                <Pressable
                style={[savedDealsStyles.viewAll]}
                onPress={() =>
                    navigation.navigate('RewardListGeneral', {browseTitle})
                }
                >
                    <Text style={{color: 'white'}}>View All →</Text>
                </Pressable>
                <View style={[savedDealsStyles.line, {top: 210}]}></View>
            </View>

            
            {/* Most Popular */}
            <View style={{top: -65}}>
                <Text style={{marginLeft: 10, fontWeight: 600, fontSize: 17}}>Most Popular</Text>
                <ScrollView horizontal={true} style={{height: 250, margin: 10}} showsHorizontalScrollIndicator={false}>
                {mostPopularState.map((reward) => {
                    return (
                    <View style={savedDealsStyles.dealView}>
                        <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={savedDealsStyles.picture}/>
                        <View style={savedDealsStyles.points}>
                            <Text style={savedDealsStyles.pointsText}>{reward.points} Preesh </Text>
                            <Image source={coin} style={savedDealsStyles.coin}/>
                        </View>
                        <View style={{flexDirection: 'row', gap: 20}}>
                            <View>
                            <Text style={{fontWeight: 400, fontSize: 15}}>{reward.restaurantName}</Text>
                            <Text style={{fontWeight: 400, fontSize: 13, color: '#155D27'}}>{reward.description}</Text>
                            </View>
                            <MaterialIcons
                            onPress={() =>
                                handlePress(reward, popularTitle)
                            }
                            name="qr-code" size={24} style={{top: 0}}/>
                        </View>
                        </View>
                    );
                })}
                </ScrollView>
                <Pressable
                style={savedDealsStyles.viewAll}
                onPress={() =>
                    navigation.navigate('RewardListGeneral', {popularTitle})
                }
                >
                    <Text style={{color: 'white'}}>View All →</Text>
                </Pressable>
                <View style={[savedDealsStyles.line, {top: 210}]}></View>
            </View>
            
            {/* Your Favourites */}
            <View style={{top: -130}}>
                <Text style={{marginLeft: 10, fontWeight: 600, fontSize: 17}}>Your Favorites </Text>
                <ScrollView horizontal={true} style={{height: 250, margin: 10}} showsHorizontalScrollIndicator={false}>
                {favouritesState.map((reward) => {
                    return (
                    <View style={savedDealsStyles.dealView}>
                        <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={savedDealsStyles.picture}/>
                        <View style={savedDealsStyles.points}>
                            <Text style={savedDealsStyles.pointsText}>{reward.points} Preesh </Text>
                            <Image source={coin} style={savedDealsStyles.coin}/>
                        </View>
                        <View style={{flexDirection: 'row', gap: 20}}>
                            <View>
                            <Text style={{fontWeight: 400, fontSize: 15}}>{reward.restaurantName}</Text>
                            <Text style={{fontWeight: 400, fontSize: 13, color: '#155D27'}}>{reward.description}</Text>
                            </View>
                            <MaterialIcons
                            onPress={() =>
                                handlePress(reward, favoritesTitle)
                            }
                            name="qr-code" size={24} style={{top: 0}}/>
                        </View>
                        </View>
                    );
                })}
                </ScrollView>
                <Pressable
                style={savedDealsStyles.viewAll}
                onPress={() =>
                    navigation.navigate('RewardListGeneral', {favoritesTitle})
                }
                >
                    <Text style={{color: 'white'}}>View All →</Text>
                </Pressable>
                <View style={[savedDealsStyles.line, {top: 210}]}></View>
            </View>

            {/* Saved Deals */}
            <View style={{top: -195}}>
                <Text style={{marginLeft: 10, fontWeight: 600, fontSize: 17}}>Saved Deals</Text>
                <ScrollView horizontal={true} style={{height: 250, margin: 10}} showsHorizontalScrollIndicator={false}>
                {savedDealsState.map((reward) => {
                    return (
                    <View style={savedDealsStyles.dealView}>
                        <Image source={reward.restaurantName in images ? { uri: images[reward.restaurantName] } : null} style={savedDealsStyles.picture}/>
                        <View style={savedDealsStyles.points}>
                            <Text style={savedDealsStyles.pointsText}>{reward.points} Preesh </Text>
                            <Image source={coin} style={savedDealsStyles.coin}/>
                        </View>
                        <View style={{flexDirection: 'row', gap: 20}}>
                            <View>
                            <Text style={{fontWeight: 400, fontSize: 15}}>{reward.restaurantName}</Text>
                            <Text style={{fontWeight: 400, fontSize: 13, color: '#155D27'}}>{reward.description}</Text>
                            </View>
                            <MaterialIcons
                            onPress={() =>handlePress(reward, savedTitle)
                            }
                            name="qr-code" size={24} style={{top: 0}}/>
                        </View>
                        </View>
                    );
                })}
                </ScrollView>
                <Pressable
                style={savedDealsStyles.viewAll}
                onPress={() =>
                    navigation.navigate('RewardListGeneral', {savedTitle})
                }
                >
                    <Text style={{color: 'white'}}>View All →</Text>
                </Pressable>
                <View style={[savedDealsStyles.line, {top: 210}]}></View>
            </View>
        </ScrollView>)}
        

        
        </View>
    </SafeAreaView>
  );
};

const savedDealsStyles = StyleSheet.create({
    dealView: {
        height: 129,
        width: 140,
        flexDirection: 'column',
        marginRight: 10
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
    line: {
        // borderWidth: StyleSheet.hairlineWidth,
        height: 3,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderColor: 'rgba(0, 0, 0, 0.25)'
    },
    viewAll: {
        width: 82,
        height: 25,
        backgroundColor: '#155D27',
        position: 'absolute',
        top: 175,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        left: 293
    },
    logo: {
        width: 109,
        height: 34,
        position: 'absolute',
        left: '10.25%',
        // top: 46,
    },
    containerStyle: {
        backgroundColor: 'transparent',
        top: 50,
        height: 38,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    inputContainerStyle: {
        borderRadius: 30,
        height: 38,
        width: 351,
        borderColor: 'transparent'
    }
});

export default Browse;