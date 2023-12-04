import React from 'react';
import {View, Text} from 'react-native';
import Profile from './Profile'
import EditAccount from './EditAccount'
import About from './About'
import History from './History'
import GiftCards from './GiftCards'
import Promotions from './Promotions'
import Invite from './Invite'
import AddFunds from './AddFunds'
import BuyGift from '../BuyGift'
import ScanCard from './ScanCard'
import Processed from '../Processed'
import Checkout from '../Checkout'
import RedeemGift from './RedeemGift'
import RewardListGeneral from '../RewardListGeneral';
import GiftHistory from '../GiftHistory'
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainProfile = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="EditAccount"
              component={EditAccount}
              options={{headerShown: false}}
          />
          <Stack.Screen
            name="RewardListGeneral"
            component={RewardListGeneral}
            options={{headerShown: false}}
        />
          <Stack.Screen
              name="About"
              component={About}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Invite"
              component={Invite}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Promotions"
              component={Promotions}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="History"
              component={History}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Notifications"
              component={History}
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
              name="GiftCards"
              component={GiftCards}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Processed"
              component={Processed}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="AddFunds"
              component={AddFunds}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="RedeemGift"
              component={RedeemGift}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="ScanCard"
              component={ScanCard}
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

export default MainProfile;