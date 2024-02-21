import React, {Component, useEffect, useRef, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated
} from "react-native";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import PrimaryButton from "./Components/PrimaryButton";
import AddReminder from "./AddReminder"
import moment from "moment";

const ReminderStack = createStackNavigator();

export default function ReminderNav({ navigation, route }){
  useEffect(() => {
    if(getFocusedRouteNameFromRoute(route) == 'Add Reminder'){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    }else{
      navigation.setOptions({tabBarStyle: {backgroundColor: '#FFBE28', position: 'absolute'}});
    }
  })
  
  return(
      <ReminderStack.Navigator initialRouteName = 'Reminders' screenOptions = {{headerShown: false}}>
        <ReminderStack.Screen name="ReminderStack" component = {Reminders} />
        <ReminderStack.Screen name="Add Reminder" component = {AddReminder} />
      </ReminderStack.Navigator>
  )
}

function DropDown({children}) {
  const animationHeight = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(false)
  const  toggleActive = () => {
    setActive(!active);
  }

  const collapseView = () => {
      Animated.timing(animationHeight, {
        duration: 1000,
        toValue: 300,
        useNativeDriver: true
      }).start();
  }
  
  const expandView = () => {
      Animated.timing(animationHeight, {
        duration: 1000,
        toValue: 1000,
        useNativeDriver: true
      }).start();
  }
  useEffect(() => {
    console.log("pressed")
    if (active) {
      expandView()
      
    } else {
      collapseView()
    }
  }, [active])
  return(
    active ?
        <View style = {{
          alignSelf:'center',
          marginTop: 33,
          width: "92%", 
          flex: 1,
          borderRadius: 24,
          backgroundColor: "#DBBFFF", 
          marginBottom: 12
        }}>
          <View style = {styles.upcomingTitle}>
            <TouchableOpacity onPress={toggleActive}>
              <Image style = {{
                marginLeft: 18, 
                height:10, 
                width:17
                }}
                source={require('./images/remindersPage/arrowdown-icon.png')}/>
            </TouchableOpacity>
            <View style = {{marginLeft: 45, flexDirection: 'row'}}>
              <Text style={{fontWeight: '600',fontSize: 30, color: 'white'}}>Upcoming</Text>
              <View style = {styles.numCircle}>
                <Text style = {{fontWeight: '600', fontSize: 30, color: 'white'}}>{DATA.length}</Text>
              </View>
            </View>
          </View>
          <View style = {{marginTop: 27, flex: 1}}>
            {children}
          </View>
        </View>
          : // if inactive
          <View style = {{
            flexDirection: 'row',
            alignItems:'center',
            alignSelf:'center',
            width: "92%", 
            height: 50,
            borderRadius: 20,
            backgroundColor: "#DBBFFF",
            marginTop: 33
          }}>
            <TouchableOpacity onPress={toggleActive}>
              <Image style = {{
                marginLeft: 18, 
                height:17, 
                width:10
                }}
                source={require('./images/remindersPage/arrowright-icon.png')}/>
            </TouchableOpacity>
            <View style = {{marginLeft: 45, flexDirection: 'row'}}>
              <Text style={{fontWeight: '600',fontSize: 30, color: 'black'}}>Upcoming</Text>
              <View style = {{
                height: 42, 
                width: 42, 
                borderRadius: 21, 
                backgroundColor: '#D99CFF', 
                alignItems: 'center', 
                marginLeft: 12
              }}>
                <Text style = {{fontWeight: '600', fontSize: 30, color: 'black'}}>{DATA.length}</Text>
              </View>
            </View>
          </View>
  )
}
  


export function ReminderLine({reminder,date,time}){
  reminder = reminder.length > 17 ? reminder.substring(0,16) + "..." : reminder
  return(
    <View>
    <TouchableOpacity style = {{
        flexDirection: 'row',
        alignSelf:'flex-start',
        alignItems: 'center',
        marginBottom:30,
        marginLeft: 20,
      }}>
        <View style = {{height: 14, width: 14, borderRadius: 7, backgroundColor: 'black', marginBottom: 21}}></View>
        <View style = {{marginLeft: 10}}>
          <Text ellipsizeMode="tail" numberOfLines={1} style = {{fontSize: 29, color: 'black'}}>{reminder}</Text>
          <View style = {{borderBottomColor: 'black', borderBottomWidth: 1, color: 'black'}}></View>
          <Text style = {{fontSize: 23, color: 'black', lineHeight: 29}}>{date}, {time}</Text>
          <Text></Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity>
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

const DATA = [
  {
    id: '1',
    title: 'Mother\'s Birthday',
    date: "12/11/2021",
    time: "12am"
  },
  {
    id: '2',
    title: 'Medical appointment',
    date: "14/11/2021",
    time: "4:20pm"
  },
  {
    id: '3',
    title: 'Need to buy gift',
    date: "18/11/2021",
    time: "6pm"
  },
];

export function Reminders({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.topSection}>
          <Image style={{height:"60%", width:"20%", resizeMode:'contain'}} source={require("./images/mainicons/bell-icon.png")}/>
          <View style = {{marginLeft: 5,justifyContent: 'center'}}>
            <Time />
          </View>
        </View>

        <View style = {styles.bottomSection}>
          <View style = {styles.today}>
              <Text style={{
                fontWeight: 'bold', 
                marginLeft: 20, 
                fontSize: 26, 
                color: 'black',
                alignSelf: 'center'
              }}>No Reminders Today</Text>
          </View>
          <DropDown>
            <FlatList
            persistentScrollbar={true}
              data={DATA}
              keyExtractor={item => item.id}
              renderItem = {({item}) => {
                
                return(<ReminderLine reminder = {item.title} date = {item.date} time = {item.time}/>)
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
    height: "13%",
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