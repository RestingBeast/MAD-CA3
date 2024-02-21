/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format

 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  FlatList,
  TextInput,
  ToastAndroid,
} from 'react-native';

import realm, {
  getAllQuestions,
  addQuestion,
  updateQuestionById,
} from './Database';
import CustomPopup from './Components/CustomPopup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DualButtons from './Components/DualButtons';
import MainButton from './Components/MainButton';
import { set } from 'react-native-reanimated';

export default function SecurityQns({ navigation }) {
  const [questionData, setQuestionData] = useState(getAllQuestions());
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  // const isSelected = (checkBoxState) => {
  //   let checked = !checkBoxState;
  //   setShowHint(checked);
  // }

  const addValidatedQuestion = () => {
    if (question.length === 0 || answer.length === 0) {
      // check for space
      ToastAndroid.showWithGravityAndOffset(
        'Field(s) must not be empty!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250,
      );
    } else {
      addQuestion(question, answer, hint, showHint);
      setQuestion('');
      setAnswer('');
      setHint('');
      setShowHint(false);
      setVisible(false);
    }
  };

  const editValidatedQuestion = () => {
    if (question.length === 0 || answer.length === 0) {
      ToastAndroid.showWithGravityAndOffset(
        'Data must not be the same!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250,
      );
    } else {
      updateQuestionById(question, answer, hint, showHint, selectedID);
      setQuestion('');
      setAnswer('');
      setHint('');
      setShowHint(false);
      setSelectedID(0);
      setPopup(false);
      setSelectedQuestion({});
      setQuestionData(getAllQuestions());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text1}>
          Security{'\n'}Questions({questionData.length}/5)
        </Text>
      </View>
      <SafeAreaView>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              paddingHorizontal: 45,
              fontWeight: '400',
            }}>
            Click on any questions to view or edit them!
          </Text>
          <View style={{ height: 430, width: "90%" }}>
            <FlatList
              persistentScrollbar={true}
              data={questionData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View>
                  <Question
                    question={item.question}
                    onPress={() => {
                      setPopup(true);
                      setSelectedID(item.id);
                      setSelectedQuestion(getAllQuestions()[item.id]);
                      setShowHint(item.showHint);
                    }}
                  />
                  <CustomPopup
                    visible={popup}
                    containerStyle={{
                      backgroundColor: '#EBDBFF',
                      justifyContent: 'space-evenly',
                      width: '90%',
                      height: '65%',
                      borderRadius: 30,
                      elevation: 20,
                      paddingHorizontal: 40,
                      borderColor: 'black',
                      borderWidth: 1,
                      elevation: 20,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 30,
                        paddingHorizontal: 10,
                      }}>
                      SECURITY QUESTION
                    </Text>
                    <View style={styles.textInputStyle}>
                      <TextInput
                        onChangeText={(inputQuestion) => {
                          setQuestion(inputQuestion);
                          console.log(question);
                        }}
                        defaultValue={selectedQuestion.question}
                        style={{ fontSize: 25, paddingBottom: 8 }}
                      />
                    </View>
                    <View style={styles.textInputStyle}>
                      <TextInput
                        onChangeText={(inputAnswer) => {
                          setAnswer(inputAnswer);
                          console.log(answer);
                        }}
                        defaultValue={selectedQuestion.answer}
                        style={{ fontSize: 25, paddingBottom: 8 }}
                      />
                    </View>
                    <BouncyCheckbox
                      TouchableComponent={Pressable}
                      isChecked={showHint}
                      onPress={() => {
                        setShowHint(!showHint);
                        if (showHint == false) {
                          setHint('');
                        }
                      }}
                      text="Hint(Optional)"
                      textStyle={styles.checkboxText}
                      iconStyle={{
                        borderRadius: 10,
                        height: 45,
                        width: 45,
                        borderColor: 'transparent',
                      }}
                      fillColor="#C8E6C9"
                      unfillColor="white"
                      checkIconImageSource={require('./images/todolistPage/tick-icon.png')}
                    />
                    <View style={styles.textInputStyle}>
                      <TextInput
                        editable={showHint}
                        onChangeText={(inputHint) => {
                          setHint(inputHint);
                        }}
                        defaultValue={selectedQuestion.hint}
                        placeholder="Hint"
                        style={{ fontSize: 25, paddingBottom: 8 }}
                      />
                    </View>
                    <DualButtons
                      leftText={'Save'}
                      rightText={'Cancel'}
                      leftEvent={() => editValidatedQuestion()}
                      rightEvent={() => {
                        setPopup(false)
                        setShowHint(false)
                      }}
                      leftSize={100}
                      rightSize={100}
                    />
                  </CustomPopup>
                </View>
              )}
            />
          </View>
        </View>
        <CustomPopup
          visible={visible}
          containerStyle={{
            backgroundColor: '#EBDBFF',
            justifyContent: 'space-evenly',
            width: '90%',
            height: '65%',
            borderRadius: 30,
            elevation: 20,
            paddingHorizontal: 40,
            borderColor: 'black',
            borderWidth: 1,
            elevation: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 30,
              paddingHorizontal: 10,
            }}>
            SECURITY QUESTION
          </Text>
          <View style={styles.textInputStyle}>
            <TextInput
              onChangeText={inputQuestion => {
                setQuestion(inputQuestion);
              }}
              placeholder="Your Question"
              style={{ fontSize: 25, paddingBottom: 8 }}
            />
          </View>
          <View style={styles.textInputStyle}>
            <TextInput
              onChangeText={inputAnswer => {
                setAnswer(inputAnswer);
              }}
              placeholder="Your Answer"
              style={{ fontSize: 25, paddingBottom: 8 }}
            />
          </View>
          <BouncyCheckbox
            TouchableComponent={Pressable}
            isChecked={showHint}
            onPress={() => {
              setShowHint(!showHint);
              if (showHint == false) {
                setHint('');
              }
            }}
            text="Hint(Optional)"
            textStyle={styles.checkboxText}
            iconStyle={{
              borderRadius: 10,
              height: 45,
              width: 45,
              borderColor: 'transparent',
            }}
            fillColor="#C8E6C9"
            unfillColor="white"
            checkIconImageSource={require('./images/todolistPage/tick-icon.png')}
          />
          <View style={styles.textInputStyle}>
            <TextInput
              editable={showHint}
              onChangeText={inputHint => {
                setHint(inputHint);
              }}
              placeholder="Hint"
              style={{ fontSize: 25, paddingBottom: 8 }}
            />
          </View>
          <DualButtons
            leftText={'Save'}
            rightText={'Cancel'}
            leftEvent={addValidatedQuestion}
            rightEvent={() => {
              setVisible(false)
              setShowHint(false)
            }}
            leftSize={100}
            rightSize={100}
          />
        </CustomPopup>
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
        <View style={styles.button}>
          {questionData.length != 5 && <MainButton
            event={() => setVisible(true)}
            imgSize={35}
            color={'#FFBE28'}
            size={74}
            borderRad={74 / 2}
            mb={0}
            imgSrc={require('./images/buttons/plus-icon.png')}
          />}
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbutton}>
          <Text style={styles.text}>Back</Text>
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

export function Question({ question, onPress }) {
  return (
    <TouchableOpacity style={styles.question} onPress={onPress}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
        {question}
      </Text>
    </TouchableOpacity>
  );
}

export function Button({ src, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}>
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
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 30,
    paddingHorizontal: 10,
    maxWidth: 500,
  },
  text1: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 40,
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
  question: {
    marginVertical: 15,
    paddingHorizontal: 20,
    height: 76,
    borderRadius: 10,
    width: 300,
    backgroundColor: '#DBBFFF',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    backgroundColor: '#DBBFFF',
    width: 300,
    alignSelf: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 13.51,
    elevation: 15,
  },
  checkboxText: {
    fontSize: 25,
    color: 'black',
    textDecorationLine: 'none',
  },
});
