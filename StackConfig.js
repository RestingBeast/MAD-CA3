import React, {useEffect} from "react";

import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SecurityConfig from "./SecurityConfig";
import SecurityQns from "./SecurityQns";

const ConfigStack = createStackNavigator();

export default function StackConfig({ navigation, route }){
  useEffect(() => {
    if(getFocusedRouteNameFromRoute(route) == 'Security Questions'){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }else{
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }
  })
  
  return(
      <ConfigStack.Navigator screenOptions = {{headerShown: false}}>
        <ConfigStack.Screen name="ConfigStack" component = {SecurityConfig} />
        <ConfigStack.Screen name="Security Questions" component = {SecurityQns} />
      </ConfigStack.Navigator>
  )
}