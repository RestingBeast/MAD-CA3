import React, {Component} from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";


export default function MainButton({text,imgSrc, imgSize, event, color, size, borderRad, mb}) {
    return (
      <TouchableOpacity 
        style={{
          backgroundColor: color, //"#70FFA9" for main, 
          height: size, // 125
          width: size, //125
          borderRadius: borderRad, //38
          marginBottom: mb, // 15
          alignSelf: "center",
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }} 
        onPress={event}
      > 
        <Image style = {{height: imgSize, width:imgSize, resizeMode: 'contain'}} source = {imgSrc} />
        {text && <Text
          style={{
            fontFamily: 'Risque-Regular',
            fontSize: 18,
            color: "black",
          }}>
          {text}
        </Text>}
      </TouchableOpacity>
    );
}
// imgSize is 80
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#70FFA9",
        height: 125,
        width: 125,
        borderRadius: 38,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonP: {
      width: 74,
      height: 74,
      borderRadius: 74 / 2,
      backgroundColor: "#FFBE28",
      alignSelf:'center', 
      alignItems:'center',
      justifyContent:'center',
      marginBottom: 20 // space between navbar and button
  }
});