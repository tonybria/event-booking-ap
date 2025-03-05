import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Featured from '../screens/Featured';
import Schedule from '../screens/Schedule';
import Tickets from '../screens/Tickets';
import Mine from '../screens/Mine';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Featured') {
              iconName = 'star';
            } else if (route.name === 'Schedule') {
              iconName = 'calendar-alt';
            } else if (route.name === 'Tickets') {
              iconName = 'ticket-alt';
            } else if (route.name === 'Mine') {
              iconName = 'user';
            }

            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            backgroundColor: '#222',
            borderTopWidth: 0,
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Featured" component={Featured} />
        <Tab.Screen name="Schedule" component={Schedule} />
        <Tab.Screen name="Tickets" component={Tickets} />
        <Tab.Screen name="Mine" component={Mine} />
        <Tab.Screen name="LoginScreen" component={LoginScreen} />
        <Tab.Screen name= "SignUpScreen" component={SignUpScreen} />
      </Tab.Navigator>
  
  );
};

export default Tabs;
