import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";
import Filter from "./screens/Filter";
import UserProfile from "./screens/UserProfile";
import OtherProfile from "./screens/OtherProfile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarOptions = {
  tabBarActiveTintColor: "#ce1694",
  tabBarInactiveTintColor: "black",
  tabBarLabelStyle: { fontSize: 16 },
};

const getTabBarIcon =
  (route) =>
  ({ color, size }) => {
    const iconNames = {
      Activity: "compass-sharp",
      Profile: "person-sharp",
    };

    const iconName = iconNames[route.name] || "home";
    return <Icon name={iconName} size={size} color={color} />;
  };

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: getTabBarIcon(route),
      ...tabBarOptions,
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

const App = () => (
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

export default App;
