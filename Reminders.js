import React, {Component, useEffect, useRef, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Animated
} from "react-native";
import PrimaryButton from "./Components/PrimaryButton";
import CustomPopup from "./Components/CustomPopup";
import moment from "moment";
import PushNotification from "react-native-push-notification";

import realm, {
  getAllReminders,
  deleteReminderById,
} from './Database'

function DropDown({children, number, activeLabel, inactiveLabel, active, event }) {
  const animationHeight = useRef(new Animated.Value(50)).current;

  const [hasReminder, setHasReminder] = useState((number != 0));
  useEffect(()=>{
    if(number!=0){
      setHasReminder(true);
    }else{
      setHasReminder(false);
    }
  },[number])

  // const  toggleActive = () => {
  //   setActive(!active);
  // }

  const collapseView = () => {
      Animated.timing(animationHeight, {
        duration: 700,
        toValue: 50,
        useNativeDriver: false
      }).start();
  }
  
  const expandView = () => {
      Animated.timing(animationHeight, {
        duration: 700,
        toValue: 60 + 110 * number,
        useNativeDriver: false
      }).start();
  }

  useEffect(() => {
    if (active) {
      expandView()
      
    } else {
      collapseView()
    }
  }, [active])

  return(
  <Animated.View style = {{
    alignSelf:'center',
    width: "92%", 
    height: animationHeight,
    maxHeight: 360,
    borderRadius: 24,
    backgroundColor: "#DBBFFF", 
    marginBottom: 30
  }}>
    <View style = {hasReminder ? active ? styles.upcomingTitle : styles.inactiveTitle : {paddingTop: 5}}>
      {hasReminder && 
        <TouchableOpacity onPress={event}>
          <Image style = {{
            marginLeft: active ? 19 : 10, 
            height:active ? 10 : 17, 
            width:active ? 17 : 10
            }}
            source={active? require('./images/remindersPage/arrowdown-icon.png') : require("./images/remindersPage/arrowright-icon.png")}/>
        </TouchableOpacity>}
      {hasReminder?
        <View style = {{marginLeft:45 , flexDirection: 'row'}}>
          <Text style={{fontWeight: '600',fontSize: 30, color: active ? 'white' : 'black'}}>{activeLabel}</Text>
            <View style = {active ? styles.numCircle : {height: 42, 
                  width: 42, 
                  borderRadius: 21, 
                  backgroundColor: '#D99CFF', 
                  alignItems: 'center', 
                  marginLeft: 12}}>
            <Text style = {{fontWeight: '600', fontSize: 30, color: active ? 'white' : 'black'}}>{number}</Text>
          </View>
        </View> : <Text style = {{textAlign: 'center',fontWeight: 'bold',fontSize: 26, color: 'black'}}>{inactiveLabel}</Text>
      }
    </View>
    <View style = {{marginTop: 27, flex: 1}}>
      {children}
    </View>
    
  </Animated.View>
  )
}
  


export function ReminderLine({id, reminder, date, time, deleteReminder, navigation}){

  const strDate = moment(date).format('DD/MM/yyyy');
  const strTime = moment(time).format('hh:mm a');
  var fullReminder = reminder;
  //reminder = reminder.length > 17 ? reminder.substring(0,16) + "..." : reminder
  const [visible, setVisible] = useState(false);
  const enableVisible = () => {
    setVisible(true);
  }
    var strEndTime = moment(date).format('MMMM D, YYYY') + " " + moment(time).format("hh:mm A")
    var startTime = moment(Date.now()).add(8, 'h');
    var endTime = moment(new Date(strEndTime))
    var diffTime = endTime.diff(startTime);
    var diffDuration = moment.duration(diffTime);

    console.log("diffDuration: " + diffDuration)
    var days = parseInt(diffDuration/(1000*60*60*24))
    var hours = diffDuration.hours()
    var minutes = diffDuration.minutes() + 1
    var strDiffTime = days + "days " + hours + "h " + minutes + "min";

  const removeReminder = () => {
    deleteReminder(id);
    PushNotification.getScheduledLocalNotifications(
      (arr) => {
        arr.forEach(
          notif => {
            if(notif.message == reminder && notif.id == id){
              PushNotification.cancelLocalNotification(notif.id)
            }
          })
      });
  }

  return(
    <View>
      <CustomPopup 
        visible={visible} 
        containerStyle={{
          backgroundColor: '#DBBFFF',
          justifyContent: 'space-evenly',
          width: '90%',
          height: 370,
          borderRadius: 20,
          elevation: 20,
          paddingHorizontal:40,
          borderColor: 'black',
          borderWidth: 1
        }}
      >
        <Text style={{fontSize: 30, textAlign: 'center'}}>{fullReminder}</Text>
        <Text style={{fontSize: 30, textAlign: 'left', lineHeight: 30}}>Date: {strDate}</Text>
        <Text style={{fontSize: 30, textAlign: 'left', lineHeight: 30}}>Time: {strTime}</Text>
        <Text style={{fontSize: 30, textAlign: 'left', lineHeight: 40}}>In {strDiffTime}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <TouchableOpacity onPress={()=> {navigation.navigate('Edit Reminder', {currTitle: reminder? reminder: "somethingNoRendered", currDate: moment(date).format('MMMM D, YYYY'), currTime: moment(time).format('hh:mm A'), id: id}) ;setVisible(false)}} style={{backgroundColor: '#70FFA9', width: 100, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center',borderWidth: 1, borderColor: '#000000'}}>
            <Text style={{fontSize: 27}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setVisible(false)}} style={{backgroundColor: '#FFA6A6', width: 100, height: 45, justifyContent: 'center', borderRadius: 20, alignItems:'center',borderWidth: 1, borderColor: '#000000'}}>
            <Text style={{fontSize: 27}}>Back</Text>
          </TouchableOpacity>
        </View>
      </CustomPopup>
      <TouchableOpacity onPress={enableVisible} style = {{
          flexDirection: 'row',
          alignSelf:'flex-start',
          alignItems: 'center',
          marginBottom:30,
          marginLeft: 20,
        }}>
          <View style = {{height: 14, width: 14, borderRadius: 7, backgroundColor: 'black', marginBottom: 21}}></View>
          <View style = {{marginLeft: 10}}>
            <Text ellipsizeMode="tail" numberOfLines={1} style = {{maxWidth:270, fontSize: 29, color: 'black'}}>{reminder}</Text>
            <View style = {{borderBottomColor: 'black', borderBottomWidth: 1, color: 'black'}}></View>
            <Text style = {{fontSize: 23, color: 'black', lineHeight: 29}}>{strDate}, {strTime}</Text>
            <Text></Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeReminder}>
        <Image style={{position: 'absolute', right: 10, bottom: 65}} source={require("./images/buttons/remove-icon.png")} />
      </TouchableOpacity>
  </View>
  )
}

class Time extends Component {
  constructor(props){
    super(props);
    this.state = {
      day: moment().add(8, 'hours').format('dddd'),
      monthYr: moment().add(8, 'hours').format('Do MMMM YYYY'),
      time: moment().add(8, 'hours').format('hh:mm a')
    }

    this.textStyle = {
      fontSize: 30, color:'black', lineHeight: 35
    }
  }

  componentDidMount(){
    this.updateTime = setInterval(
      () => this.setState({
        day: moment().add(8, 'hours').format('dddd'),
        monthYr: moment().add(8, 'hours').format('Do MMMM YYYY'),
        time: moment().add(8, 'hours').format('hh:mm a')
      }), 5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateTime);
  }

  render(){
    return (
      <View>
        <Text style = {this.textStyle}>{this.state.day}</Text>
        <Text style = {this.textStyle}>{this.state.monthYr}</Text>
        <Text style = {this.textStyle}>{this.state.time}</Text>
      </View>
    );
  }
}

export default function Reminders({ navigation }) {

  const [activateToday, setActivateToday] = useState(false)
  const [activateUpcoming, setActivateUpcoming] = useState(false)
  const [reminderData, setReminderData] = useState(getAllReminders())
  const [todayReminders,setTodayReminders] = useState(null)
  const [upcomingReminders,setUpcomingReminders] = useState(null)

  const deleteReminder = (id) => {
    deleteReminderById(id);
    setReminderData(getAllReminders);
    loadData();
    if(todayReminders.length == 0){
      setActivateToday(false)
    }
    if(upcomingReminders.length == 0){
      setActivateUpcoming(false)
    }
    if(reminderData.length == 0){
      setActivateToday(false)
      setActivateUpcoming(false)
      PushNotification.cancelAllLocalNotifications()
    }
  }

  const initiateChannel = () => {
    PushNotification.createChannel(
      {
          channelId: 'reminder-channel',
          channelName: 'Reminder Channel'
      }
    )
  }

  

  useEffect(()=>{
    initiateChannel()
  }, [])
  

  useEffect(()=>{
    loadData()
  }, [reminderData])

  const loadData = () => {
    let todayArr = new Array();
    let upcomingArr = new Array();
    reminderData.forEach(reminder => {
      if(reminderData == null){
        return;
      }
      
      
      if(moment(Date.now()).add(8, 'h') > new Date(moment(reminder.date).format('MMMM D, YYYY') + " " + moment(reminder.time).format("hh:mm A")).getTime()){
        deleteReminderById(reminder.id)
      }
      else{
        if(moment(reminder.date).format("DD/MM/yyyy") == moment(Date.now()).utcOffset("+0800").format("DD/MM/yyyy")){
          todayArr.push(reminder)
        }else {
          upcomingArr.push(reminder)
        }
      }
    })

    var todaySorted = todayArr.sort((a,b) => craftDate(a.date, a.time) - craftDate(b.date, b.time));
    var upcomingSorted = upcomingArr.sort((a,b) => craftDate(a.date, a.time) - craftDate(b.date, b.time))
    setTodayReminders(todaySorted)
    setUpcomingReminders(upcomingSorted)
  }
  console.log("*****LIST OF NOTIFICATIONS**********")
  PushNotification.getScheduledLocalNotifications((arr) => console.log(arr))

  const craftDate = (date, time) => {
    return new Date(moment(date).format('MMMM D, YYYY') + " " + moment(time).format("hh:mm A")).getTime()
  }

  useEffect(()=>{
    navigation.addListener('focus', () => {
      setReminderData(getAllReminders);
    });
  }, [navigation])

  const toggleToday = () => {
    setActivateToday(!activateToday)
    setActivateUpcoming(false)
  }
  const toggleUpcoming = () => {
    setActivateToday(false)
    setActivateUpcoming(!activateUpcoming)
    
  }

  return (
    <View style={styles.container}>
        <View style={styles.topSection}>
          <Image style={{height:"60%", width:"20%", resizeMode:'contain'}} source={require("./images/mainicons/bell-icon.png")}/>
          <View style = {{marginLeft: 5,justifyContent: 'center'}}>
            <Time />
          </View>
        </View>

        <View style = {styles.bottomSection}>
        <Text style={{fontSize: 32, color: 'white', position: 'absolute', bottom: 50, paddingHorizontal: 45,}}>You can view/edit reminders by clicking on them!</Text>
          <DropDown active={activateToday} event={toggleToday} number={todayReminders ? todayReminders.length : 0} activeLabel="Today" inactiveLabel="No Reminders Today">
            <FlatList
              persistentScrollbar={true}
              data={todayReminders}
              keyExtractor={item => item.id}
              renderItem = {({item}) => {
                
                return(<ReminderLine navigation={navigation} id = {item.id} reminder = {item.title} date = {item.date} time = {item.time} deleteReminder={deleteReminder}/>)
              }}
            />
            </DropDown>
          <DropDown active={activateUpcoming} event={toggleUpcoming} number={upcomingReminders? upcomingReminders.length : 0} activeLabel="Upcoming" inactiveLabel="None Upcoming">
            <FlatList
              persistentScrollbar={true}
              data={upcomingReminders}
              keyExtractor={item => item.id}
              renderItem = {({item}) => {
                return(<ReminderLine navigation={navigation} id = {item.id} reminder = {item.title} date = {item.date} time = {item.time} deleteReminder={deleteReminder}/>)
              }}
            />
          </DropDown>
        </View>
        <PrimaryButton event={()=> {navigation.navigate('Add Reminder')}} />
        <View style={styles.navbar}></View>
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
  topSection: {
    flex: 2, 
    paddingLeft: 5, 
    alignItems: 'center', 
    paddingRight: 5, 
    backgroundColor : "#D6CAF0", 
    paddingBottom: 20,
    flexDirection: 'row',
    paddingTop: 20
  },
  bottomSection:{
    flex: 10, 
    marginTop: 27
  },
  inactiveTitle: {
    flexDirection: 'row',
    alignItems:'center',
    alignSelf:'center',
    width: "92%", 
    height: 50,
    borderRadius: 20,
    backgroundColor: "#DBBFFF",
  },
  today: {
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    width: "92%", 
    height: 50,
    borderRadius: 20,
    backgroundColor: "#DBBFFF",
  },
  upcoming: {
    alignSelf:'center',
    marginTop: 33,
    width: "92%", 
    flex: 1,
    borderRadius: 24,
    backgroundColor: "#DBBFFF", 
    marginBottom: 12
  },
  upcomingTitle: {
    height: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24, 
    backgroundColor: '#9E00FF', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  numCircle: {
    height: 42, 
    width: 42, 
    borderRadius: 21, 
    backgroundColor: '#2F1693', 
    alignItems: 'center', 
    marginLeft: 12
  },
  button: {
    width: 74,
    height: 74,
    borderRadius: 74 / 2,
    backgroundColor: "#FFBE28",
    alignSelf:'center', 
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 15 // space between navbar and button
  },
  buttonAlignStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navbar: {
    flex: 0.8,
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