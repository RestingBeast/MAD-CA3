import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function DualButtons({leftText, rightText, leftEvent, rightEvent, padding, mt, mb, leftSize, rightSize,}) {
  
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: mt? mt : 0, marginBottom: mb? mb : 0 , paddingHorizontal: padding? padding : 0}}>
            <TouchableOpacity onPress={leftEvent} style={{backgroundColor: '#70FFA9', width: leftSize, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center',borderWidth: 1, borderColor: '#000000'}}>
              <Text style={{fontSize: 27}}>{leftText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={rightEvent} style={{backgroundColor: '#FFA6A6', width: rightSize, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center',borderWidth: 1, borderColor: '#000000'}}>
              <Text style={{fontSize: 27}}>{rightText}</Text>
            </TouchableOpacity>
          </View>
    );
}



