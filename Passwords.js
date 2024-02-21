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
  FlatList,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';

import realm, {
  addPassword,
  getAllPasswords,
  deletePasswordById,
  pinExists,
  getPin,
  editPin,
  addPin,
  addQuestion,
} from './Database';

import PinInput from './Components/PinInput';
import Clipboard from '@react-native-clipboard/clipboard';
import DualButtons from './Components/DualButtons';
import MainButton from './Components/MainButton';
import CustomPopup from './Components/CustomPopup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ForgotPin from './Components/forgotPin';

export default function Passwords({ navigation }) {
  const [passwordData, setPasswordData] = useState(getAllPasswords());
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [requiredPIN, setRequiredPIN] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [pinVisible, setPinVisible] = useState(false);
  const [forgotPin, setForgotPin] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [changePin, setChangePin] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [goToConfig, setGoToConfig] = useState(false);

  const deletePassword = id => {
    deletePasswordById(id);
    setPasswordData(getAllPasswords());
  };

  const addValidatedPassword = () => {
    if (title.length === 0 || username.length === 0 || password.length === 0) {
      // check for space
      ToastAndroid.showWithGravityAndOffset(
        'Field(s) must not be empty!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250,
      );
    } else {
      addPassword(title, username, password, requiredPIN);
      setTitle('');
      setUsername('');
      setPassword('');
      setRequiredPIN(false);
      setVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <PromptPin />
      <View style={styles.topSection}>
        <Image
          style={{ height: '45%', resizeMode: 'contain', marginTop: 5 }}
          source={require('./images/mainicons/passwords-icon.png')}
        />
        <View style={{ alignItems: 'flex-start', alignSelf: 'center' }}>
          <InfoLine
            text="Remove Password"
            src={require('./images/buttons/remove-icon.png')}
          />
          <InfoLine
            text="Security Configuration"
            src={require('./images/buttons/security-config-icon.png')}
          />
        </View>
      </View>
      <SafeAreaView style={{ marginTop: 5 }}>

        <FlatList
          persistentScrollbar={true}
          data={passwordData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <Password
                  id={item.id}
                  title={item.title}
                  deletePassword={deletePassword}
                  showPopUp={() => {
                    if (item.requiredPIN) {
                      setPinVisible(true);
                    } else {
                      setPopupVisible(true);
                    }
                    setSelectedID(item.id);
                  }}
                />
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
                  <Text style={{ fontSize: 37, color: 'black', textAlign: 'center' }}>Enter your 6-digit PIN</Text>
                  <PinInput code={getPin()} handlePinInput={() => {
                    setPopupVisible(true);
                    setPinVisible(false);
                  }} close={() => {
                    setPinVisible(false);
                  }} forgot={() => {
                    setForgotPin(true)
                    setPinVisible(false);
                  }} />
                </CustomPopup >
                <CustomPopup
                  visible={forgotPin}
                  containerStyle={{
                    backgroundColor: '#EBDBFF',
                    justifyContent: 'space-evenly',
                    width: '90%',
                    height: 460,
                    paddingHorizontal: 14,
                    borderRadius: 20,
                    elevation: 20,
                  }}>
                  <ForgotPin
                    handleInput={() => {
                      setShowPin(true);
                      setForgotPin(false);
                    }}
                    close={() => {
                      setForgotPin(false);
                      setPinVisible(true);
                    }} />
                </CustomPopup>
                <CustomPopup
                  visible={showPin}
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
                      setChangePin(true);
                    }}>
                      <Text style={{ fontSize: 27 }}>Change it</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      backgroundColor: '#FFA6A6', width: 80, height: 45, justifyContent: 'center', borderRadius: 20,
                      alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1
                    }}
                      onPress={() => {
                        setShowPin(false);
                      }}>
                      <Text style={{ fontSize: 27 }}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </CustomPopup>
                <CustomPopup
                  visible={changePin}
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
                    setChangePin(false);
                  }} />
                </CustomPopup>
                <PopUpPassword
                  visible={popupVisible}
                  setVisible={() => {
                    setPopupVisible(false);
                  }}
                  title={getAllPasswords()[selectedID].title}
                  username={getAllPasswords()[selectedID].username}
                  password={getAllPasswords()[selectedID].password}
                />
              </View>
            );
          }}
        />

      </SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          position: 'absolute',
          bottom: 70,
          justifyContent: 'space-between',
          paddingHorizontal: 35,
        }}>
        <CustomPopup
          visible={goToConfig}
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
          <Text style={{ fontSize: 37, color: 'black', textAlign: 'center' }}>Enter your 6-digit PIN</Text>
          <PinInput code={getPin()} handlePinInput={() => {
            setGoToConfig(false);
            navigation.navigate('Security Config')
          }} close={() => {
            setGoToConfig(false);
          }} forgot={() => {
            setForgotPin(true)
            setGoToConfig(false);
          }} />
        </CustomPopup >
        <MainButton
          imgSize={50}
          color={'#FFBE28'}
          size={74}
          borderRad={74 / 2}
          mb={0}
          event={() => setGoToConfig(true)}
          imgSrc={require('./images/buttons/security-config-icon.png')}
        />
        <CustomPopup
          visible={visible}
          containerStyle={{
            backgroundColor: '#EBDBFF',
            justifyContent: 'space-evenly',
            width: '90%',
            height: '60%',
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
            Add Password
          </Text>
          <View style={styles.textInputStyle}>
            <TextInput
              onChangeText={inputTitle => {
                setTitle(inputTitle);
              }}
              placeholder="Account Title"
              style={{ fontSize: 25, paddingBottom: 8 }}
            />
          </View>
          <View style={styles.textInputStyle}>
            <TextInput
              onChangeText={inputUsername => {
                setUsername(inputUsername);
              }}
              placeholder="Username"
              style={{ fontSize: 25, paddingBottom: 8 }}
            />
          </View>
          <View style={styles.textInputStyle}>
            <TextInput
              onChangeText={inputPassword => {
                setPassword(inputPassword);
              }}
              placeholder="Password"
              style={{ fontSize: 25, paddingBottom: 8 }}
            />
          </View>
          <BouncyCheckbox
            TouchableComponent={Pressable}
            isChecked={requiredPIN}
            onPress={() => {
              setRequiredPIN(!requiredPIN);
            }}
            text="Required PIN to view"
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
          <DualButtons
            leftText={'Save'}
            rightText={'Cancel'}
            leftEvent={addValidatedPassword}
            rightEvent={() => setVisible(false)}
            leftSize={100}
            rightSize={100}
          />
        </CustomPopup>
        <MainButton
          event={() => setVisible(true)}
          imgSize={35}
          color={'#FFBE28'}
          size={74}
          borderRad={74 / 2}
          mb={0}
          imgSrc={require('./images/buttons/plus-icon.png')}
        />
      </View>
    </View>
  );
}

export function InfoLine({ text, src }) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
      <Image
        source={src}
        resizeMode="center"
        style={{ aspectRatio: 1.2, resizeMode: 'contain' }}
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

export function NavTab() {
  return (
    <View style={styles.navcontainer}>
      <TouchableOpacity>
        <Image
          style={styles.imagetodo}
          source={require('./images/mainicons/to-do-list-icon.png')}
        />
      </TouchableOpacity>
      <View style={styles.imageactive}>
        <Image
          style={{
            width: '80%',
            height: '80%',
            marginBottom: 10,
          }}
          source={require('./images/mainicons/passwords-icon.png')}
        />
      </View>
      <TouchableOpacity>
        <Image
          style={styles.imagehome}
          source={require('./images/mainicons/home-icon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require('./images/mainicons/url-icon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require('./images/mainicons/bell-icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export function PopUpPassword({
  visible,
  setVisible,
  title,
  username,
  password,
}) {
  const [viewPassword, setViewPassword] = useState('****');
  const [hidePassword, setHidePassword] = useState(true);
  const copy = text => {
    Clipboard.setString(text);
    ToastAndroid.showWithGravityAndOffset(
      'Copied to Clipboard',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      250,
    );
  };

  return (
    <CustomPopup
      visible={visible}
      containerStyle={{
        backgroundColor: '#EBDBFF',
        justifyContent: 'space-evenly',
        width: '90%',
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
        {title}
      </Text>

      <View style={styles.passEntry}>
        <Text style={styles.passText}>{username}</Text>
        <TouchableOpacity onPress={() => copy(username)}>
          <Image source={require('./images/buttons/copy.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.passEntry}>
        <Text style={styles.passText}>{viewPassword}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              viewPassword == '****'
                ? setViewPassword(password)
                : setViewPassword('****');
              setHidePassword(!hidePassword);
            }}>
            <ImageSource hide={hidePassword} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => copy(password)}>
            <Image source={require('./images/buttons/copy.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setVisible();
          setHidePassword(true);
        }}
        style={{
          backgroundColor: '#FFA6A6',
          marginVertical: 25,
          width: 100,
          height: 45,
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 20,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#000000',
        }}>
        <Text style={{ fontSize: 27 }}>Back</Text>
      </TouchableOpacity>
    </CustomPopup>
  );
}

export function Password({ id, title, deletePassword, showPopUp }) {
  return (
    <TouchableOpacity style={styles.password} onPress={showPopUp}>
      <Text style={styles.text1}> {title} </Text>
      <TouchableOpacity onPress={() => deletePassword(id)}>
        <Image source={require('./images/buttons/remove-icon.png')} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export function ImageSource({ hide }) {
  if (hide) {
    return <Image source={require('./images/buttons/view-icon.png')} />;
  } else {
    return <Image source={require('./images/buttons/view-icon-2.png')} />;
  }
}

export function PromptPin() {

  const [visible, setVisible] = useState(!pinExists())
  const [showPinInput, setShowPinInput] = useState(false)
  const [showQnPrompt, setShowQnPrompt] = useState(false)
  const [showSecurityQn, setShowSecurityQn] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // For Security Qn
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
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
      setShowSecurityQn(false);
      setShowSuccess(true)
    }
  };

  const disableHint = () => {
    setHint('');
  }
  return (
    <View>

      {/* {Pin Input Prompt Popup} */}
      <CustomPopup
        visible={visible}
        containerStyle={{
          backgroundColor: '#DBBFFF',
          justifyContent: 'space-evenly',
          width: '90%',
          height: 200,
          borderRadius: 20,
          elevation: 20,
        }}>
        <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }}>You don't have a PIN.{"\n"}Please set your PIN now.</Text>
        <TouchableOpacity onPress={() => { setVisible(false); setShowPinInput(true) }} style={{ backgroundColor: '#70FFA9', width: 120, height: 45, justifyContent: 'center', borderRadius: 20, alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1 }}>
          <Text style={{ fontSize: 27 }}>Set PIN</Text>
        </TouchableOpacity>
      </CustomPopup>

      {/* {Pin Input Popup} */}
      <CustomPopup
        visible={showPinInput}
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
        <Text style={{ fontSize: 22, color: 'black', textAlign: 'center', marginBottom: 20 }}>that you can remember</Text>
        <PinInput completeEvent={(inputPin) => { addPin(inputPin); setShowPinInput(false); setShowQnPrompt(true); }} />
      </CustomPopup>

      {/* {set SecurityQn Prompt Popup} */}
      <CustomPopup
        visible={showQnPrompt}
        containerStyle={{
          backgroundColor: '#DBBFFF',
          justifyContent: 'space-evenly',
          width: '90%',
          height: 370,
          paddingHorizontal: 14,
          borderRadius: 20,
          elevation: 20,
        }}>
        <Text style={{ fontSize: 32, textAlign: 'center', color: 'black' }}>PIN set successfully!</Text>
        <Text style={{ fontSize: 32, textAlign: 'center', color: 'black', textAlign: 'left', paddingLeft: 26 }}>You need to create at least 1 security question in case you forget your PIN</Text>
        <TouchableOpacity onPress={() => { setShowQnPrompt(false); setShowSecurityQn(true) }} style={{ backgroundColor: '#70FFA9', width: 120, height: 45, justifyContent: 'center', borderRadius: 20, alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1 }}>
          <Text style={{ fontSize: 27 }}>Create</Text>
        </TouchableOpacity>
      </CustomPopup>

      {/* {Security Qn Popup} */}
      <CustomPopup
        visible={showSecurityQn}
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
        <TouchableOpacity onPress={() => addValidatedQuestion()} style={{ backgroundColor: '#70FFA9', width: 120, height: 45, justifyContent: 'center', borderRadius: 20, alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1 }}>
          <Text style={{ fontSize: 27 }}>Confirm</Text>
        </TouchableOpacity>
      </CustomPopup>

      {/* {Security Qn Success Popup} */}
      <CustomPopup
        visible={showSuccess}
        containerStyle={{
          backgroundColor: '#DBBFFF',
          justifyContent: 'space-evenly',
          width: '90%',
          height: 310,
          borderRadius: 20,
          elevation: 20,
        }}>
        <Text style={{ fontSize: 30, textAlign: 'center', color: 'black' }}>Security Question set successfully!{"\n\n"}You can create up to 5 questions</Text>
        <TouchableOpacity onPress={() => { setShowSuccess(false); }} style={{ backgroundColor: '#70FFA9', width: 70, height: 45, justifyContent: 'center', borderRadius: 20, alignItems: 'center', alignSelf: 'center', borderColor: '#000000', borderWidth: 1 }}>
          <Text style={{ fontSize: 27 }}>OK</Text>
        </TouchableOpacity>
      </CustomPopup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B00DB',
  },
  topSection: {
    backgroundColor: '#D6CAF0',
    alignItems: 'center',
    marginBottom: 20,
    height: '27%',
  },
  text: {
    color: 'black',
    fontSize: 26,
    paddingHorizontal: 10,
  },
  text1: {
    color: 'black',
    fontSize: 30,
    paddingHorizontal: 10,
  },
  navcontainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFBE28',
    width: '100%',
    height: 50,
  },
  image: {
    width: 38,
    height: 38,
  },
  imagehome: {
    width: 38,
    height: 32,
  },
  imagetodo: {
    width: 28,
    height: 35,
  },
  imageactive: {
    marginBottom: 5,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFBE28',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 74,
    height: 74,
    borderRadius: 74 / 2,
    backgroundColor: '#FFBE28',
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
  password: {
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 17,
    width: '85%',
    backgroundColor: '#DBBFFF',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxText: {
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'none',
  },
  passEntry: {
    flexDirection: 'row',
    backgroundColor: '#DBACFF',
    borderWidth: 1,
    marginTop: 20,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
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
  passText: {
    fontSize: 25,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
