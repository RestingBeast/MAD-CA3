/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';

import realm, {
  getPin,
  editPin,
} from './Database';

import PinInput from './Components/PinInput';
import CustomPopup from './Components/CustomPopup';
import ForgotPin from './Components/forgotPin';

export default function SecurityConfig({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [getPinInput, setGetPinInput] = useState(true);
  const [forgotPin, setForgotPin] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          style={{ height: 80, width: 71 }}
          source={require('./images/buttons/security-config-icon.png')}
        />
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text style={{ color: 'black', fontSize: 40, paddingHorizontal: 10 }}>
            Security
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              paddingHorizontal: 10,
              lineHeight: 30,
            }}>
            Configuration
          </Text>
        </View>
      </View>
      <SafeAreaView>
        <View style={{ display: 'flex' }}>
          <TouchableOpacity style={styles.button} onPress={() => {
            setVisible(true);
          }}>
            <Text style={styles.text1}>View/Change PIN</Text>
          </TouchableOpacity>
          <CustomPopup
            visible={visible}
            containerStyle={{
              backgroundColor: '#EBDBFF',
              justifyContent: 'space-evenly',
              width: '90%',
              height: 150,
              paddingHorizontal: 14,
              borderRadius: 20,
              elevation: 20,
            }}>
            <Text style={{ fontSize: 32, textAlign: 'center', color: 'black' }}>Your PIN is {getPin()}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 25, }}>
              <TouchableOpacity style={{
                backgroundColor: '#70FFA9', width: 150, height: 45, justifyContent: 'center', borderRadius: 20,
                alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1
              }} onPress={() => {
                setPinVisible(true);
              }}>
                <Text style={{ fontSize: 27 }}>Change it</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                backgroundColor: '#FFA6A6', width: 80, height: 45, justifyContent: 'center', borderRadius: 20,
                alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1
              }}
                onPress={() => {
                  setVisible(false);
                }}>
                <Text style={{ fontSize: 27 }}>Back</Text>
              </TouchableOpacity>
            </View>
          </CustomPopup>
          <CustomPopup
            visible={pinVisible}
            containerStyle={{
              backgroundColor: '#EBDBFF',
              justifyContent: 'space-evenly',
              width: '100%',
              height: 600,
              borderRadius: 30,
              elevation: 20,
              borderColor: 'black',
              borderWidth: 1,
              paddingTop: 20
            }}>
            <Text style={{ fontSize: 37, color: 'black', textAlign: 'center' }}>Enter a 6-digit PIN</Text>
            <PinInput completeEvent={(inputPin) => {
              editPin(inputPin);
              setShowInput(false);
              setPinVisible(false);
            }} />
          </CustomPopup>
          <TouchableOpacity
            onPress={() => navigation.navigate('Security Questions')}
            style={styles.button}>
            <Text style={styles.text1}>View/Add Security Questions</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          width: '70%',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 20,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbutton}>
          <Text style={styles.text}>Back to passwords</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function InfoLine({ text, src }) {
  return (
    <View style={{ flexDirection: 'row', margin: 10 }}>
      <Image
        source={src}
        resizeMode="center"
        style={{ aspectRatio: 1.5, resizeMode: 'contain' }}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export function Button({ src }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={src} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B00DB',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#D6CAF0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 60,
  },
  text: {
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  text1: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 30,
    paddingHorizontal: 10,
  },
  backbutton: {
    paddingVertical: 10,
    backgroundColor: '#FFA6A6',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 10,
    height: 80,
    borderRadius: 10,
    width: '85%',
    backgroundColor: '#DBBFFF',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
