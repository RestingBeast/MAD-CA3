import React, {Component, useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Modal,
  Animated,
  TextInput,
  Button,
  Alert
} from "react-native";

import realm, {
    getAllUrls,
    addUrl,
    deleteUrlById,
} from './Database'

import PrimaryButton from "./Components/PrimaryButton";
import MainButton from "./Components/MainButton";
import CustomPopup from "./Components/CustomPopup"; 

export function InfoLine({text,imageSrc}){
  return(
    <View style = {{flexDirection: 'row', marginTop:18}}>
      <Image 
        source = {imageSrc} 
        resizeMode="center" 
        style={{
          aspectRatio: 1.2, 
          resizeMode: 'contain'
        }}
      />
      <Text 
        style = {
          {fontSize: 26, color: 'black', marginLeft: 7}
      }>
        {text}
      </Text>
    </View>
  )
}


export function TextOptionIcon({url, srcUrl, id, deleteUrl}){
  console.log("here " + id)
  const removeUrl = () => {
    deleteUrl(id)
    console.log("removed")
  }
  if(url.length > 12){
    const [visible, setVisible] = useState(false)

    const sendToUrl = () => {
      Linking.openURL(srcUrl);
      setVisible(false);
    }
    return(
      <View style = {{flexDirection: 'row',justifyContent: 'center', position: 'absolute', right: 10}}>
      <CustomPopup 
        visible={visible} 
        containerStyle={{
        backgroundColor: '#DBBFFF',
        justifyContent: 'space-evenly',
        width: '90%',
        height: 130,
        borderRadius: 20,
        elevation: 20,}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>{url}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={sendToUrl} style={{backgroundColor: '#70FFA9', width: 140, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center', borderColor: '#000000'}}>
              <Text style={{fontSize: 27}}>Go to url</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {setVisible(false)}} style={{backgroundColor: '#FFA6A6', width: 100, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center', borderColor: '#000000'}}>
              <Text style={{fontSize: 27}}>Back</Text>
            </TouchableOpacity>
          </View>
        </CustomPopup>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Image 
          style = {{height: "100%", resizeMode: 'contain'}}
          source = {require("./images/urlPage/view-icon.png")} 
        />
        </TouchableOpacity>
      <TouchableOpacity onPress={removeUrl}>
        <Image 
        resizeMode= 'center'
          style={{aspectRatio: 0.9, resizeMode: 'contain'}}
          source = {require("./images/buttons/remove-icon.png")} 
        />
      </TouchableOpacity>
      </View>
    )
  }else{
    return(
      <TouchableOpacity 
        onPress={removeUrl} 
        style={{position: 'absolute', right: 10}}>
      <Image 
      resizeMode= 'center'
        style={{aspectRatio: 0.9, resizeMode: 'contain'}}
        source = {require("./images/buttons/remove-icon.png")} 
        />
      </TouchableOpacity>
    )
  }
}

export function UrlLine({url, id, deleteUrl}){
  const [error, setError] = useState(false);

  var srcUrl;
  if(url.startsWith('https://')){
    srcUrl = url;
  }else{
    srcUrl = 'https://' + url;
  }
  // favicon image source
  var imgsrc = srcUrl + '/favicon.ico';

  return(
    <TouchableOpacity
    onPress={()=>{Linking.openURL(srcUrl)}}
      style = {{
      flexDirection: 'row',
      alignItems:'center',
      alignSelf:'center',
      width: "87%", 
      height: 50,
      borderRadius: 20,
      backgroundColor: "#DBBFFF", 
      marginBottom: 20
      }}>
      <Image
        onError={({ nativeEvent: {error} }) => setError(true)}
        source = {error? require("./images/urlPage/file.png") : {uri: imgsrc}} 
        resizeMode="center" 
        style={{
          aspectRatio: 1.5, 
          resizeMode: 'contain', 
          width:"14%",
          marginLeft: 5, 
          marginRight:3
        }}
      />
      <View style={{height: "100%", width: 1, backgroundColor: "black"}}></View>
        <Text ellipsizeMode="tail" numberOfLines={1} style = {{maxWidth: 205, fontSize: 30, color: 'black', marginLeft: 10}}>
          {url}
        </Text>
      <TextOptionIcon url={url} srcUrl={srcUrl} id={id} deleteUrl = {deleteUrl}/>
    </TouchableOpacity>
  )
}

function FavouriteUrls() {
  const [urlData, setUrlData] = useState(getAllUrls)
  const [url, setUrl] = useState(""); // for popup textInput
  const [visible, setVisible] = useState(false);

  const deleteUrl = (id) => {
    deleteUrlById(id);
    setUrlData(getAllUrls());
  }

  const enableVisible = () => {
    setVisible(true);
  }

  const addValidatedUrl = () => {
    if(url.includes(" ") || url.length === 0){ // check for space
      Alert.alert("Field must not be empty or contain a space")
    }else{
      addUrl(url);
      setUrl("");
      setVisible(false)
    }
  }
  
  return (
    <View style={styles.container}>
        <View style={{flex: 5.3, paddingLeft: 5, alignItems: 'center', paddingRight: 5, backgroundColor : "#D6CAF0", paddingBottom: 20}}>
          <Image style={{height: "45%", resizeMode: 'contain', marginTop: 10}} source={require("./images/mainicons/url-icon.png")}/>
          <View>
            <InfoLine imageSrc = {require("./images/buttons/remove-icon.png")} text = "Remove URL"/>
            <InfoLine imageSrc = {require("./images/urlPage/view-icon.png")} text = "View URL"/>
          </View>
        </View>
        <View style = {{flex: 10, marginTop: 18}}>
            <FlatList 
              persistentScrollbar={true}
              data={urlData}
              keyExtractor={item => item.id}
              renderItem = {({item}) => {
                
                return(<UrlLine url = {item.url} id = {item.id} deleteUrl={deleteUrl}/>)
              }}
            />
        </View>

        <CustomPopup 
          visible={visible} 
          containerStyle={{
          backgroundColor: '#EBDBFF',
          width: '90%',
          height: 200,
          borderRadius: 20,
          justifyContent: 'space-evenly',
          elevation: 20,}}>
          <View style={{backgroundColor:'#DBBFFF', width: '90%', height: 55, alignSelf: 'center', borderRadius: 14, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput 
              onChangeText={(inputUrl)=>{setUrl(inputUrl)}} 
              placeholder="Enter Url" 
              style={{fontSize: 35, paddingBottom: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity onPress={addValidatedUrl} style={{backgroundColor: '#70FFA9', width: 100, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center', borderColor: '#000000'}}>
              <Text style={{fontSize: 27}}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {setVisible(false)}} style={{backgroundColor: '#FFA6A6', width: 100, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center', borderColor: '#000000'}}>
              <Text style={{fontSize: 27}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CustomPopup>

        <MainButton event={(enableVisible)} imgSize = {35} color={"#FFBE28"} size={74} borderRad={74/2} mb={20} imgSrc = {require("./images/buttons/plus-icon.png")} />
        <View style={styles.navbar}>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B00DB"
  },
  button: {
    width: 74,
    height: 74,
    borderRadius: 74 / 2,
    backgroundColor: "#FFBE28",
    alignSelf:'center', 
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20 // space between navbar and button
  },
  buttonAlignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navbar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#FFBE28",
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5
    
  },
  image : {
    width: 38,
    height: 38,
  },
  imagepass : {
    width: 42,
    height: 42
  },
  imagehome: {
   width: 38,
   height: 32,
  },
  imagetodo :{
   width: 28,
   height: 35
 },
  active: {
    width:74, 
    height:74, 
    borderRadius:35, 
    backgroundColor: "#FFBE28", 
    alignItems:'center',
    justifyContent:'center',
    alignSelf:  'center'
  }
});

export default FavouriteUrls;