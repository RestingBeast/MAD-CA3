/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from "react";
 import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity,
   SafeAreaView,
   Pressable
 } from "react-native";
 
 import moment from "moment";
 import BouncyCheckbox from "react-native-bouncy-checkbox";
 
 export default class App extends Component {
   render() {
     return (
       <View style = {styles.container}>
         <View style = {styles.topSection}>
           <Time src = {require("./images/Page/to-do-list-icon.png")}/>
           <InfoLine text = "Remove completed Tasks" src = {require("./images/Page/bin-icon.png")} />
         </View>
         <SafeAreaView>
           <Text style={{color: "white",
             fontSize: 20, textAlign: "center"}}>
             Tasks Left {" "}
             <Text style={{backgroundColor: "blue", alignItems: "center",
                color: "white", fontSize: 20, textAlign: "center",
                borderWidth: 1, borderRadius: 10}}> 2
             </Text>
           </Text>
           <View style = {{display: "flex",}}>
               <BouncyCheckbox isChecked = {true} style={styles.task}
                 text="Task 1" iconStyle={{borderColor : "black", borderRadius: 2}}
                 textStyle = {styles.text} fillColor =  "#C8E6C9" 
                 unfillColor="white"/>
                 <BouncyCheckbox isChecked = {false} style={styles.task}
                 text="Task 2" iconStyle={{borderColor : "black", borderRadius: 2}}
                 textStyle = {styles.text} fillColor =  "#C8E6C9" 
                 unfillColor="white"/>
                 <BouncyCheckbox isChecked = {false} style={styles.task}
                 text="Task 3" iconStyle={{borderColor : "black", borderRadius: 2}}
                 textStyle = {styles.text} fillColor =  "#C8E6C9" 
                 unfillColor="white"/>
            </View>
         </SafeAreaView>
         <View style = {{display: "flex", flexDirection: "row", width: "100%", 
         position: "absolute",bottom: 70, justifyContent: "space-between", paddingHorizontal: 10}}>
           <Button src = {require("./images/buttons/bin-icon.png")} />
           <Button src = {require("./images/buttons/plus-icon.png")} />
         </View>
         
         <NavTab /> 
       </View>
     );
   }
 }
 
 export function Time({src}) {
   return (
     <View style = {{flexDirection: "row", marginTop: 10}}>
       <Image source = {src}/>
       <Text style = {styles.text}>
         {moment().format('dddd')} {"\n"}
         {moment().format('Do MMMM YYYY')} {"\n"}
         {moment().format('hh:mm a')} {"\n"}
       </Text>
     </View>
   );
 }
 
 export function InfoLine({text, src}) {
   return(
     <View style = {{flexDirection: "row", margin: 10}}>
       <Image source = {src} resizeMode = "center" style={{aspectRatio: 1.5, resizeMode: "contain"}} />
       <Text style = {styles.text}>{text}</Text>
     </View>
   );
 }
 
 export function Button({src}) {
   return (
     <TouchableOpacity style={styles.button}>
       <Image source = {src} />
     </TouchableOpacity>
   );
 }
 
 export function NavTab() {
   return (
     <View style = {styles.navcontainer}>        
         <TouchableOpacity style={styles.imageactive}>
            <Image source={require("./images/navigation/to-do-list-icon.png")} style = {styles.image1}/>
         </TouchableOpacity>

         <TouchableOpacity>
            <Image source={require("./images/navigation/password-icon.png")} style = {styles.image}/>
         </TouchableOpacity>

         <TouchableOpacity>
            <Image source={require("./images/navigation/home-icon.png")} style = {styles.image}/>
         </TouchableOpacity>

         <TouchableOpacity>
            <Image source={require("./images/navigation/url-icon.png")} style = {styles.image}/>
         </TouchableOpacity>

         <TouchableOpacity>
            <Image source={require("./images/navigation/bell-icon.png")} style = {styles.image}/>
         </TouchableOpacity>
       </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#7B00DB"
   },
   topSection: {
     backgroundColor: "#D6CAF0",
     alignItems: "center",
     marginBottom: 5,
   },
   text :{
     color: "black",
     fontSize: 20,
     paddingHorizontal: 10
   },
   task :{
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between",
     marginVertical: 10,
     marginHorizontal: 50,
     padding: 10,
     borderRadius: 6,
     backgroundColor: "#DBBFFF",
   },
   navcontainer :{
     position: "absolute",
     bottom: 0,
     display: "flex",
     flexDirection: "row",
     justifyContent: "space-evenly",
     backgroundColor: "#FFBE28",
     width: "100%",
     height:55
   },
   image : {
     width: 35,
     height: 40,
     marginVertical: 5
   },
   image1 : {
    width: 40,
    height: 50
  },
   imageactive: {
    marginBottom: 10,
     width:76,
     height:76,
     borderRadius:38,
     backgroundColor: "#FFBE28", 
     alignSelf:'center', 
     alignItems:'center',
     justifyContent:'center',
   },
   button :{
     width: 80,
     height: 80,
     borderRadius: 80 / 2,
     backgroundColor: "#FFBE28",
     alignSelf:'center', 
     alignItems:'center',
     justifyContent:'center',
   }
 });