import React, { Component, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  TextInput,
  Button,
  Dimensions,
  Platform,
  LogBox
} from "react-native";
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigationState, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import 'react-native-pager-view'
import 'react-native-tab-view'
import 'react-native-gesture-handler';

import Home from "./Home";
import FavouriteUrls from "./FavouriteUrls";
import StackReminder from "./StackReminder";
import Todolist from "./Todolist";
import StackPassword from "./StackPassword"

// export default function App(){
//   return(
//     <FavouriteUrls/> 
//   )
// }

console.log(
  ` NOTES!!
  1. Finish Add Reminder validation
  2. Edit Reminder
  3. Box Shadow
  4. Dual Buttons comp
  5. Fin Primary Buttons

`);

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Tab = createBottomTabNavigator();

const todo_icon = require("./images/mainicons/to-do-list-icon.png")
const passwords_icon = require("./images/mainicons/passwords-icon.png")
const home_icon = require("./images/mainicons/home-icon.png")
const url_icon = require("./images/mainicons/url-icon.png")
const reminders_icon = require("./images/mainicons/bell-icon.png")

const ScreenArr = [
  { key: 1, name: 'To-do-List', screen: Todolist, icon: todo_icon, activeStyle: { height: 99, width: 45 }, inactiveStyle: { height: 40, width: 45 } },
  { key: 2, name: 'Passwords', screen: StackPassword, icon: passwords_icon, activeStyle: { height: 99, width: 70 }, inactiveStyle: { height: 99, width: 45 } },
  { key: 3, name: 'Home', screen: Home, icon: home_icon, activeStyle: { height: 99, width: 45 }, inactiveStyle: { height: 99, width: 45 } },
  { key: 4, name: 'Url', screen: FavouriteUrls, icon: url_icon, activeStyle: { height: 99, width: 65 }, inactiveStyle: { height: 99, width: 45 } },
  { key: 5, name: 'Reminders', screen: StackReminder, icon: reminders_icon, activeStyle: { height: 99, width: 70 }, inactiveStyle: { height: 99, width: 45 } },
]

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFBE28',
          },
        }}
      >
        {ScreenArr.map((item, index) => {
          return (
            <Tab.Screen name={item.name} component={item.screen} key={item.key} tabBarShowIcon={true}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={focused ? styles.active : styles.inactive} >
                    <Image style={focused ? item.activeStyle : item.inactiveStyle} resizeMode="contain" source={item.icon} />
                  </View>
                ),
                tabBarStyle: item.key === 3 ? { display: 'none' } : { backgroundColor: '#FFBE28', position: 'absolute' }
              }}
            />
          )
        })}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFBE28",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {

  }
})