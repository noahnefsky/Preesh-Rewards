import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux'; // Import Provider
import store from './app/ConfigureStore';
import BrowseNav from './app/screens/BrowseFlow/BrowseNav';
import HomeNav from './app/screens/HomeFlow/HomeNav';
import Login from './app/screens/Login';
import ProfileNav from './app/screens/ProfileFlow/ProfileNav';
import Scan from './app/screens/Scan';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



// Ignore all warnings
LogBox.ignoreAllLogs();

MaterialIcons.loadFont();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={() => ({
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#208B3A',
    })}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={32} color={color} />
          ),
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Home', { screen: 'HomeMain' });
          },
        })}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseNav}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="search" size={32} color={color} />
          ),
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Browse', { screen: 'BrowseMain' });
          },
        })}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="qr-code" size={32} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" size={32} color={color} />
          ),
          headerShown: false,
        }}
          listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Profile', { screen: 'Profile' });
          },
        })}
      />
    </Tab.Navigator>
  );
};

let isSignedIn = false //CHANGE to using backend check

const data1 = {
  name: '30% Off',
  description: "Free Fries",
  restaurantName: "Wendy's",
  date: "01-11-2023",
}
const data2 = {
  name: 50,
  description: "Free Burrito",
  restaurantName: "Chipotle",
  date: "01-01-2023",
}

const addDb = () => {
  // const userRef = firebase.firestore().collection('users').doc('1'); // Replace '1' with the actual user ID
  // const savedRewardsCollectionRef = userRef.collection('promotions');
  //   savedRewardsCollectionRef.add({
  //     claimed: sharedAccountDetail.promos[1].claimed,
  //     code: sharedAccountDetail.promos[1].code,
  //     description: sharedAccountDetail.promos[1].description,
  //     name: sharedAccountDetail.promos[1].name,
  //   });
  //   savedRewardsCollectionRef.add({
  //     claimed: sharedAccountDetail.promos[2].claimed,
  //     code: sharedAccountDetail.promos[2].code,
  //     description: sharedAccountDetail.promos[2].description,
  //     name: sharedAccountDetail.promos[2].name,
  //   });
}

const App = () => { 
  const auth = getAuth();  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
      {isSignedIn ? (
          <>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          </>
        ) : (
          <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  logo: {
    width: 109,
    height: 34,
    position: 'absolute',
    left: 40,
    top: 46,
  }
});

export default App;
