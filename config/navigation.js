import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator, createTopTabNavigator } from 'react-navigation';
import * as Routes from '../screens/index'
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

const AuthNavigator = createStackNavigator({
    Login: {
        screen : Routes.Login,
        navigationOptions: {
            header: null
        }
    }
})


const TopTabNavigator = createBottomTabNavigator({
  Easy: {
      screen: Routes.EasyScore
  },
  Medium: {
      screen: Routes.MediumScore
  },
  Hard: {
      screen: Routes.HardScore
  },
},
{
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let IconComponent = Ionicons;
              let iconName;
              if (routeName === 'Easy') {
                iconName = `ios-chatbubbles`;
                // Sometimes we want to add badges to some icons. 
                // You can check the implementation below.
              //   IconComponent = HomeIconWithBadge; 
              } 
              else if (routeName === 'Medium') {
                iconName = `ios-options`;
              }
              else if (routeName === 'Hard') {
                  iconName = `ios-options`;
                }
      
              // You can return any component that you like here!
              return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
          }),
          tabBarOptions: {
            activeTintColor: '#686de0',
            inactiveTintColor: '#30336b',
            style:{
                backgroundColor:'#F1F1FD',

            }
          },
      }
)


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Routes.Home
    },
    "High Score": {
        screen: TopTabNavigator
    },
},
{
            defaultNavigationOptions: ({ navigation }) => ({
              tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                  iconName = `ios-chatbubbles`;
                  // Sometimes we want to add badges to some icons. 
                  // You can check the implementation below.
                //   IconComponent = HomeIconWithBadge; 
                } else if (routeName === 'High Score') {
                  iconName = `ios-options`;
                }
        
                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor} />;
              },
            }),
            tabBarOptions: {
              activeTintColor: '#686de0',
              inactiveTintColor: '#30336b',
              style:{
                  backgroundColor:'#F1F1FD',

              }
            },
        }
)





const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    Home: {
        screen: TabNavigator
    },
    Game: {
      screen: Routes.Game
    },
    Score: {
      screen: Routes.Score
    }
})

export default createAppContainer(MainNavigator);