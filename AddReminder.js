import React, {Component, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid
} from "react-native";

import realm, {
  addReminder,
} from './Database'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import PushNotification from "react-native-push-notification";

export function craftDate(date, time) {
  return new Date(moment(date).format('MMMM D, YYYY') + " " + moment(time).format("hh:mm A")).getTime()
}

export function SelectDate({selectedTime, sendDate}){

  const [date, setDate] = useState("Select Date");
    
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var timeNow = moment(Date.now()).utcOffset('+0800');
    var currentDate = moment(timeNow).format('DD/MM/yyyy');
    var selectedDate = moment(date.getTime()).format('DD/MM/yyyy')
    if(selectedTime){
      // moment(selectedTime).format('hh:mm A')
      if(selectedDate == currentDate && craftDate(date, selectedTime) < moment(Date.now()).add(8, 'h').toDate().getTime()){
        ToastAndroid.showWithGravityAndOffset("Invalid date! The time chosen is in the past!.",
          ToastAndroid.LONG, 
          ToastAndroid.BOTTOM,
          0,
          900
        )
      }
      else if(selectedDate == currentDate && moment(selectedTime).format('hh:mm A') < moment(timeNow).add(30, 'm').format('hh:mm A')){
        ToastAndroid.showWithGravityAndOffset("Invalid date! The time chosen is less than 30minutes away!.",
          ToastAndroid.LONG, 
          ToastAndroid.BOTTOM,
          0,
          900
        )
      }
      else{
        setDate(selectedDate);
        sendDate(date)
      }
    }else{
      setDate(selectedDate);
      sendDate(date)
    }
    hideDatePicker();
  }

  
  
  
  return(
      <View style = {{
        height: "16%", 
        width: "80%", 
        borderRadius: 15, 
        backgroundColor: '#DBACFF', 
        alignSelf:"center", 
        marginBottom: 41
        }}>
        <View style = {{
          height: "40%", 
          borderTopLeftRadius: 15, 
          borderTopRightRadius: 15, 
          backgroundColor: '#AB41FF', 
          alignItems: 'center', 
          justifyContent:'center'
          }}>
          <Text style = {{fontSize: 33, color: 'white', fontWeight: '600', lineHeight: 37}}>
            Select Date
          </Text>
        </View>
        <View style = {{height: "55%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style = {{width: "72%",fontSize: 30, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
            {date}
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Image style = {{height: 45, width: 45}} source={require("./images/addReminder/dateselector-icon.png")} />
            <DateTimePickerModal
              isVisible = {isDatePickerVisible}
              mode="date"
              onConfirm = {handleConfirm}
              onCancel = {hideDatePicker}
              minimumDate={moment(Date.now()).add(8, 'h').toDate()}
            />
          </TouchableOpacity>
        </View>
      </View>
  )
}



export function SelectTime({selectedDate,sendTime}){
  //date = moment(Date.now()).format('DD/MM/yyyy');
  const [time, setTime] = useState("Select Time");
    
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    var currentDate = moment(Date.now()).utcOffset("+0800").toDate().getTime();
    var tmpDate = ""
    console.log("!*!*!*!*! Error Check !*!*!*!")
    console.log(new Date(craftDate(currentDate, time)).toString());
    console.log("**********************$%")
    if(selectedDate){
      console.log("pinkyyyyyyyyy")
      tmpDate = moment(selectedDate).format('DD/MM/yyyy');
      console.log("herrrrrrrrrrree")
    }
    if(tmpDate == moment(currentDate).format('DD/MM/yyyy') && craftDate(currentDate, time) < moment(Date.now()).add(8, 'h').add(30, 'm')){
      
      ToastAndroid.showWithGravityAndOffset(
        "Invalid time! Time selected should be at least 30 minutes from now.", 
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM,
        0,
        900
      )
    }else{
      setTime(moment(time.getTime()).format('hh:mm A'));
      
      sendTime(time)
    }
    hideTimePicker();
  }

  
  
  
  return(
    <View style = {{
      height: "16%", 
      width: "80%", 
      borderRadius: 15, 
      backgroundColor: '#DBACFF', 
      alignSelf:"center", 
      marginBottom: 41
      }}>
      <View style = {{
        height: "40%", 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        backgroundColor: '#AB41FF', 
        alignItems: 'center', 
        justifyContent:'center'
        }}>
        <Text style = {{fontSize: 33, color: 'white', fontWeight: '600', lineHeight: 37}}>
          Select Time
        </Text>
      </View>
      <View style = {{height: "55%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style = {{width: "72%",fontSize: 30, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
          {time}
        </Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Image style = {{height: 45, width: 45}} source={require("./images/addReminder/timeselector-icon.png")} />
          <DateTimePickerModal
            isVisible = {isDatePickerVisible}
            mode="time"
            onConfirm = {handleConfirm}
            onCancel = {hideTimePicker}
            //date={time == 'Select Time' ? moment(Date.now()).add(8, 'h').add(30, 'm').toDate() : moment(Date.now()).add(8, 'h').add(30, 'm').toDate()}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function AddReminder({ navigation }) {

  const [date, getDate] = useState(null)
  const [time, getTime] = useState(null)
  const [title, setTitle] = useState("")
  console.log("*****PASSED INTO CHECKER*******")
  console.log('Today: ')
  console.log(new Date(moment(Date.now()).add(8, 'h').add(30, 'm')))
  console.log('Selected: ')
  console.log(new Date(craftDate(date, moment(time))))
  console.log("*****************************")
  const addNotification = (title, reminderDatetime) => {
    console.log("**********at NOTIFICATION ************")
    console.log(new Date(reminderDatetime).toString())
    var diffTime = reminderDatetime - moment(Date.now()).add(8, 'h')
    console.log(diffTime)
    PushNotification.localNotificationSchedule({
      channelId: 'reminder-channel',
      id:  realm.objects('Reminder').max('id') ? realm.objects('Reminder').max('id')+1 : 0,
      message: title,
      date: new Date(Date.now() + diffTime),
      allowWhileIdle: true
    })
  }
  
  const addValidatedReminder = () => {
    if(date === null){
      ToastAndroid.showWithGravityAndOffset("Please select a date", 
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM,
        0,
        300
      )
    }
    else if(time === null){
      ToastAndroid.showWithGravityAndOffset(
        "Please select a time", 
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM,
        0,
        900
      )
    }
    else if(title.length === 0){ // check for space
      ToastAndroid.showWithGravityAndOffset(
        "Event field cannot be empty!", 
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM,
        0,
        900
      )
    }
    else if(title.length > 86){
      ToastAndroid.showWithGravityAndOffset(
        "Maximum character limit of 86 exceeded!Please shorten your event title", 
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM,
        0,
        900
      )
    }
    // new Date(moment(Date.now()).add(8, 'h').add(30, 'm'))
    else if(new Date(moment(Date.now()).add(8, 'h').add(30, 'm')) > new Date(craftDate(date, moment(time)))){
      
      ToastAndroid.showWithGravityAndOffset(
        "Date or time is no longer valid!",
        ToastAndroid.LONG, 
        ToastAndroid.BOTTOM,
        0,
        900
      )
    }
    else{
      addNotification(title, craftDate(date,time))
      addReminder(title, date, time);
      
      setTitle("");
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style = {{fontSize: 37, color: 'black', textAlign: 'center'}}>Add REMINDER</Text>
      </View>
      <View style = {styles.bottomSection}>
        <SelectDate selectedTime={time} sendDate={getDate}/>
        <SelectTime selectedDate={date} sendTime={getTime}/>
        <View style = {{height: "31%", width: "80%", borderRadius: 15, backgroundColor: '#DBACFF', alignSelf:"center"}}>
          <View style = {{height: 43, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: '#AB41FF', alignItems: 'center', justifyContent:'center'}}>
            <Text style = {{fontSize: 33, color: 'white', fontWeight: '600', lineHeight: 37}}>
              Event
            </Text>
          </View>
          <TextInput 
            placeholder="Enter Event" 
            returnKeyType="done" 
            blurOnSubmit={true} 
            multiline={true} 
            numberOfLines={3} 
            onChangeText={(inputTitle) => {setTitle(inputTitle)}}
            placeholderTextColor={"#949494"} 
            style = {{fontSize: 33, textAlign: 'center', textAlignVertical: 'top'
            }}/>
        </View>
        <View style = {{flexDirection: "row", marginTop: 60, justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={addValidatedReminder} style = {{
            backgroundColor: '#70FFA9', 
            height: 40, 
            width: 80, 
            borderRadius: 17, 
            justifyContent: 'center'
            }}>
            <Text style = {{fontSize: 25, color: 'black', textAlign: 'center'}}>
              Add
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.goBack()}} style = {{
            backgroundColor: '#FFA6A6', 
            height: 40, 
            width: 100, 
            borderRadius: 17, 
            justifyContent: 'center'
            }}>
            <Text style = {{fontSize: 25, color: 'black', textAlign: 'center'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B00DB"
  },
  topSection: {
    flex: 1,
    backgroundColor : "#D6CAF0", 
    paddingVertical: 12
  },
  bottomSection:{
    flex: 14, 
    marginTop: 60
  }
});