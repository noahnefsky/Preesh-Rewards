
import React, { useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import coin from '../../../assets/coin.png';
import giftCard from '../../../assets/giftCard.png';
import logo from '../../../assets/logo.png';
import meter from '../../../assets/meter.png';
import rewardExamples from '../../../assets/rewardExamples.png';


MaterialIcons.loadFont();
FontAwesome.loadFont();

// at 100 deg=-45, height = 108, left = 120
// at 200 deg=0, height =88, left = 169
// at 300 deg=45, height =88, left = 218
let arrowHeight = 88.0
let angle = 0.0
let arrowLeft = 169.0


const Home = ({ navigation }) => {
  const { firstName, lastName, phone, email, image, points, status } = useSelector(state => state.saveInfo);
  loyaltyColor = '#cd7f32' // bronze
  if (status === "SILVER") loyaltyColor = '#808080'
  else if (status === "GOLD") loyaltyColor = '#d4af37'
  else if (status === "PLATINUM") loyaltyColor = '#CBCAC8'

  // Set the ticker
  // This was meh, redo at some point and meter (don't use image)
  if (points < 200 && points >= 100) {
    angle = -0.45 * Math.abs(points - 200)
    arrowHeight = 88 + 20 / 100 * Math.abs(points - 200)
    arrowLeft = 169 - 49 / 100 * Math.abs(points - 200)
  } else if (points > 200 && points <= 300) {
    angle = 0.45 * Math.abs(points - 200)
    arrowHeight = 88 + 20 / 100 * Math.abs(points - 200)
    arrowLeft = 169 + 49 / 100 * Math.abs(points - 200)
  } else if (points <= 50) {
    // at 0: height = 157, angle = -90, left = 99
    // 60 =2, 70=3, 80 = 5, 90=8
    angle = -90 + 0.45 * points
    arrowHeight = 157 - 49 / 100 * points
    arrowLeft = 99 + 4.5 / 50 * points
  } else if (points > 50 && points < 100) {
    let adder = 0;
    if (points < 60) {
      adder = 2 / 60 * points;
    } else if (points <= 70) {
      adder = 2 + 1 / 70 * points;
    } else if (points <= 80) {
      adder = 3 + 2 / 80 * points;
    } else if (points <= 85) {
      adder = 5 + 3 / 90 * points - 1
    } else if (points <= 99) {
      adder = 8
    }
    angle = -90 + 0.45 * points
    arrowHeight = 157 - 49 / 100 * points
    if (points > 90) arrowHeight = 157 - 49 / 100 * 90
    arrowLeft = 99 + 4.5 / 50 * points + adder
  } else if (points <= 399 && points > 300) {
    // at 0: height = 157, angle = -90, left = 99
    // 60 =2, 70=3, 80 = 5, 90=8
    angle = 90 - 0.45 * Math.abs(points - 400)
    arrowHeight = 157 - 49 / 100 * Math.abs(points - 400)
    arrowLeft = 238 - 20 / 100 * Math.abs(points - 400)
    if (points <= 370) arrowLeft = 241 - 20 / 100 * Math.abs(points - 400)
    if (points <= 310) arrowLeft -= 1
  } else if (points == 400) {
    angle = 90
    arrowHeight = 157
    arrowLeft = 238
  }

  const opacityAnimation = useRef(new Animated.Value(0.2)).current;
  const opacityStyle = { opacity: opacityAnimation };

  const animateElement = () => {

    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  };


  const [imageVisible, setImageVisible] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleImage = () => {
    if (imageVisible) {
      setImageVisible(false);
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      setImageVisible(true);
      Animated.timing(heightAnim, {
        toValue: 254,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

  };

  const popularTitle = "Most Popular";
  const savedTitle = "Saved Deals"
  const [shouldShow, setShouldShow] = useState(true);
  const [upOrdown, setUpOrdown] = useState(true);
  const toggleOpen = () => {
    setUpOrdown(!(upOrdown));
    setShouldShow(!shouldShow);
    toggleImage()
  }

  return (
    <SafeAreaView style={{ width: '100%', alignItems: 'center' }}>
      {/* <View style={{width: '100%', alignItems: 'center'}}> */}
      <Image source={logo} style={homeStyles.logo} />
      <Text style={homeStyles.welcome}>Welcome {firstName}👋</Text>
      <View style={homeStyles.barContainer}>
        <View style={homeStyles.howItWorks}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HowItWorks', {})
            }
          ><Text style={homeStyles.text}>ⓘ</Text></TouchableOpacity>
          <Text style={homeStyles.text}>How It Works</Text>
        </View>
        <Pressable
          style={homeStyles.optionsText}
          onPress={toggleOpen}>
          <Text>Rewards Options</Text>
          {upOrdown ? (
            <MaterialIcons style={{ top: 0, position: 'absolute', left: 110 }} name="keyboard-arrow-down" size={19.88} color={'black'} />)
            : (<MaterialIcons style={{ top: 0, position: 'absolute', left: 110 }} name="keyboard-arrow-up" size={19.88} color={'black'} />)}
        </Pressable>
        <Image source={meter} style={homeStyles.meter} />
        <Text style={[homeStyles.pointMarkText, { left: 52, top: 163 }]}>0</Text>
        <Text style={[homeStyles.pointMarkText, { left: 75, top: 79 }]}>100</Text>
        <Text style={[homeStyles.pointMarkText, { alignSelf: 'center', top: 44 }]}>200</Text>
        <Text style={[homeStyles.pointMarkText, { left: 257, top: 79 }]}>300</Text>
        <Text style={[homeStyles.pointMarkText, { left: 293.5, top: 163 }]}>400</Text>
        <FontAwesome style={{
          top: arrowHeight, position: 'absolute', left: arrowLeft,
          transform: [{ rotate: `${angle}deg` }],
        }}
          name="caret-down" size={25} color={'black'} />
        <Image source={coin} style={homeStyles.coin} />
        <Text style={homeStyles.loyaltyStatus}>Loyalty Status:
          <Text style={{ color: loyaltyColor, fontWeight: 600 }}> {status}</Text></Text>
        <Text style={homeStyles.points}>{points}</Text>
        <Text style={homeStyles.preeshPoints}>Preesh Points</Text>
      </View>

      <Animated.View style={!upOrdown ? ({ ...homeStyles.tabContainer, ...homeStyles.blur, opacityAnimation }) : homeStyles.tabContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RewardListGeneral', { popularTitle })
          }
          style={homeStyles.tab1}>
          <Text style={homeStyles.tabLabel}>Most{'\n'}Popular</Text>
          <MaterialIcons style={homeStyles.tabIcon} name="favorite" size={39.62} color={'#208B3A'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RewardListGeneral', { savedTitle })
          }
          style={homeStyles.tab2}>
          <Text style={homeStyles.tabLabel}>Saved{'\n'}Deals</Text>
          <MaterialIcons style={homeStyles.tabIcon} name="bookmark" size={39.62} color={'#208B3A'} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.Image source={rewardExamples} style={[homeStyles.rewardExamples, { height: heightAnim }]} hide={true} />

      <Animated.View style={!upOrdown ? ({ ...homeStyles.cardContainer, ...homeStyles.blur, opacityAnimation }) : homeStyles.cardContainer}>
        <Image source={giftCard} style={homeStyles.card} />
        <Text style={homeStyles.cardUser}>{firstName + " " + lastName}</Text>
        <Text style={homeStyles.cardText}>Exchange your Preesh Points for gift card money redeemable
          at any of our Preesh partners.
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate('BuyGift', {})
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#208B3A' : '#155D27',
            },
            homeStyles.buyGift,
          ]}>
          <Text style={homeStyles.buyGiftText}>Buy a Gift</Text>
        </Pressable>
      </Animated.View>
      {/* </View> */}
    </SafeAreaView>
  );
};


const homeStyles = StyleSheet.create({
  blur: {
    opacity: 0.2
  },
  logo: {
    width: 109,
    height: 34,
    position: 'absolute',
    left: '10.25%',
    top: 46,
  },
  welcome: {
    fontWeight: 800,
    fontSize: 24,
    lineHeight: 28,
    color: '#10451D',
    position: 'absolute',
    top: 108,
    left: '5%',
  },
  barContainer: {
    width: 352,
    height: 220,
    top: 105,
    // left: 19,
    borderRadius: 5,
    backgroundColor: 'white',
    // position: 'absolute',
    shadowOpacity: 0.25,
    shadowRadius: 3.43,
    shadowOffset: { width: 0, height: 1.72 }
  },
  meter: {
    height: 227.68,
    width: 228.5887908935547,
    position: 'absolute',
    top: 56.32,
    alignSelf: 'center',
  },
  howItWorks: {
    height: 24,
    width: 107,
    left: 15,
    top: 8,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5,
  },
  optionsText: {
    left: 210,
    height: 24,
    top: 8,
    width: 110,
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  coin: {
    height: 19,
    width: 12,
    left: 7,
    top: 170,
  },
  loyaltyStatus: {
    left: 25,
    top: 153.5,
    fontWeight: 400,
    fontSize: 13.5,
    lineHeight: 15.23,
  },
  rewardExamples: {
    // height: 254,
    width: 353,
    left: '4.85%',
    top: 193,
    position: 'absolute',
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 400,
  },
  pointMarkText: {
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 11.72,
    position: 'absolute',
    color: '#10451D',
  },
  points: {
    fontSize: 34,
    fontWeight: 400,
    lineHeight: 39.84,
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    color: '#10451D'
  },
  preeshPoints: {
    fontSize: 10.5,
    fontWeight: 700,
    lineHeight: 11.72,
    top: 160,
    position: 'absolute',
    alignSelf: 'center',
    color: '#10451D'
  },
  tab1: {
    height: 67.91999816894531,
    width: 129.37142944335938,
    borderRadius: 24.25714111328125,
    borderColor: '#10451D',
    borderWidth: 0.81,
  },
  tab2: {
    height: 67.91999816894531,
    width: 129.37142944335938,
    borderRadius: 24.25714111328125,
    borderColor: '#10451D',
    borderWidth: 0.81,
    flexDirection: 'column',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30.9,
    // position: 'absolute',
    top: '39%',
    alignSelf: 'center',
  },
  tabIcon: {
    left: 80,
    top: -18.7,
  },
  tabLabel: {
    left: 16.17,
    top: 17.79,
    fontWeight: 700,
    fontSize: 13.75,
    lineHeight: 16.11
  },
  cardContainer: {
    height: 190,
    width: 352,
    // left: 20,
    top: '42%',
    // position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 2, height: 2 },
  },
  card: {
    height: 110.4,
    width: 165.59,
    left: 93.205,
    top: 11.54,
    borderRadius: 16
  },
  cardUser: {
    fontWeight: 600,
    fontSize: 7.5,
    color: 'white',
    top: -15,
    left: 110
  },
  cardText: {
    height: 47,
    width: 343,
    fontWeight: 400,
    fontSize: 13.5,
    position: 'absolute',
    top: 127.865,
    lineHeight: 15.23,
    left: 15,
  },
  buyGift: {
    // backgroundColor: '#155D27',
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    width: 76,
    height: 25,
    paddingVertical: 5,
    paddingHorizontal: 5,
    position: 'absolute',
    left: 265,
    top: 160,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },
  buyGiftText: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 15.23,
    color: 'white'
  },

});

export default Home;