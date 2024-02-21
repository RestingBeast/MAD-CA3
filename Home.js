import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { NavigationContainer, TabActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainButton from "./Components/MainButton";

// Custom Primary Button Config
const IMGSIZE = 80;
const GREEN = "#70FFA9";
const BUTTONSIZE = 125;
const BORDERRAD = 38;
const MB = 15;

export default function Home({ navigation }) {
  const jumpToUrl = TabActions.jumpTo('Url');
  const jumpToPasswords = TabActions.jumpTo('Passwords');
  const jumpToTodolist = TabActions.jumpTo('To-do-List');
  const jumpToReminders = TabActions.jumpTo('Reminders');
  return (
    <View style={styles.container}>
      <ImageBackground source={require("./images/homePage/homeBg.png")} style = {styles.image} resizeMode="cover">
        <Text style={styles.heading}>Favourites</Text>
        <View style={{paddingLeft: 65, paddingRight: 65}}>
          <View style = {styles.buttonAlignStyle}>
            <MainButton imgSize={IMGSIZE} color={GREEN} size={BUTTONSIZE} borderRad={BORDERRAD} mb={MB} centered={false} event={()=>{navigation.navigate('Url')}} imgSrc= {require("./images/mainicons/url-icon.png")} text = "URL" />
            <MainButton imgSize={IMGSIZE} color={GREEN} size={BUTTONSIZE} borderRad={BORDERRAD} mb={MB} centered={true} event={()=>{navigation.dispatch(jumpToPasswords)}} imgSrc= {require("./images/mainicons/passwords-icon.png")} text = "PASSWORDS" />
          </View>
          <View style = {styles.buttonAlignStyle}>
            <MainButton imgSize={IMGSIZE} color={GREEN} size={BUTTONSIZE} borderRad={BORDERRAD} mb={MB} centered={true} event={()=>{navigation.dispatch(jumpToTodolist)}} imgSrc= {require("./images/mainicons/to-do-list-icon.png")} text = "TO-DO LIST" />
            <MainButton imgSize={IMGSIZE} color={GREEN} size={BUTTONSIZE} borderRad={BORDERRAD} mb={MB} centered={true} event={()=>{navigation.dispatch(jumpToReminders)}} imgSrc= {require("./images/mainicons/bell-icon.png")} text = "REMINDERS" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B00DB"
  },
  image: {
    flex: 1,
  },
  buttonAlignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    color: "#FFC928",
    fontSize: 60,
    marginTop: 36,
    marginBottom: 186,
    textAlign: "center",
    textShadowColor: '#000000', 
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 1 },
    fontFamily: "Risque-Regular"
  }
});