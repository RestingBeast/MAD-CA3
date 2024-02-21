import React, {useEffect} from "react";

import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import  Reminders from "./Reminders";
import AddReminder from "./AddReminder"
import EditReminder from "./EditReminder";

const ReminderStack = createStackNavigator();

export default function StackReminder({ navigation, route }){
  useEffect(() => {
    if(getFocusedRouteNameFromRoute(route) == 'Add Reminder' || getFocusedRouteNameFromRoute(route) == 'Edit Reminder'){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }else{
      navigation.setOptions({tabBarStyle: {backgroundColor: '#FFBE28', position: 'absolute'}});
    }
  })
  
  return(
      <ReminderStack.Navigator screenOptions = {{headerShown: false}}>
        <ReminderStack.Screen name="ReminderStack" component = {Reminders} />
        <ReminderStack.Screen name="Add Reminder" component = {AddReminder} />
        <ReminderStack.Screen name="Edit Reminder" component = {EditReminder} />
      </ReminderStack.Navigator>
  )
}