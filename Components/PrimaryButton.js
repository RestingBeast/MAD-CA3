import React, {Component} from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

function PrimaryButton({event}) {
  
    return (
      <TouchableOpacity onPress={event} style={styles.button}>
        <Image style={{height:34, width: 34}} source = {require('../images/buttons/plus-icon.png')} />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 74,
        height: 74,
        borderRadius: 74 / 2,
        backgroundColor: "#FFBE28",
        alignSelf:'center', 
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 20 // space between navbar and button
    }
})

export default PrimaryButton;