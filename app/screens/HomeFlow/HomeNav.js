
import React from 'react';
import {} from 'react';
import {} from 'react-native';
import HomeMain from './Home'
import HowItWorks from './HowItWorks'
import BuyGift from '../BuyGift'
import GiftCards from '../ProfileFlow/GiftCards'
import Processed from '../Processed'
import Checkout from '../Checkout'
import RewardListGeneral from '../RewardListGeneral'
import GiftHistory from '../GiftHistory'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();



const HomeNav = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
            name="HomeMain"
            component={HomeMain}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="HowItWorks"
            component={HowItWorks}
            options={{headerShown: false}}
        />
          <Stack.Screen
              name="BuyGift"
              component={BuyGift}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Processed"
              component={Processed}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="GiftCards"
              component={GiftCards}
              options={{headerShown: false}}
          />
          <Stack.Screen
            name="RewardListGeneral"
            component={RewardListGeneral}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="GiftHistory"
            component={GiftHistory}
            options={{headerShown: false}}
        />
      </Stack.Navigator>
  );
};


export default HomeNav;