import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import Filter from './components/Filter';
import UserProfile from './components/UserProfile';
import OtherProfile from './components/OtherProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Activity') {
            iconName = 'compass-sharp';
          } else if (route.name === 'Profile') {
            iconName = 'person-sharp';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ce1694',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 16 },
      })}
    >
      <Tab.Screen 
        name="Activity" 
        component={Home} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfile} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen 
          name="HomeTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Filter" 
          component={Filter} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="OtherProfile" 
          component={OtherProfile} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
