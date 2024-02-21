import React, {useEffect} from "react";

import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Passwords from "./Passwords";
import StackConfig from "./StackConfig";

const PasswordStack = createStackNavigator();

export default function StackPassword({ navigation, route }){
  useEffect(() => {
    if(getFocusedRouteNameFromRoute(route) == 'Security Config'){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }else{
      navigation.setOptions({tabBarStyle: {backgroundColor: '#FFBE28', position: 'absolute'}});
    }
  })
  
  return(
      <PasswordStack.Navigator screenOptions = {{headerShown: false}}>
        <PasswordStack.Screen name="PasswordStack" component = {Passwords} />
        <PasswordStack.Screen name="Security Config" component = {StackConfig} />
      </PasswordStack.Navigator>
  )
}