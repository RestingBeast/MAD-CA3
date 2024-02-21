import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ToastAndroid,
} from 'react-native';

import realm, {
  getAllTasks,
  addTask,
  getTaskById,
  deleteTaskById,
  updateCheckedById,
  deleteAllTasks,
} from './Database';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import MainButton from './Components/MainButton';
import CustomPopup from './Components/CustomPopup';
import DualButtons from './Components/DualButtons';
import moment from 'moment';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: moment().add(8, 'hours').format('dddd'),
      monthYr: moment().add(8, 'hours').format('Do MMMM YYYY'),
      time: moment().add(8, 'hours').format('hh:mm a'),
    };

    this.textStyle = {
      fontSize: 30,
      color: 'black',
      lineHeight: 35,
    };
  }

  componentDidMount() {
    this.updateTime = setInterval(
      () =>
        this.setState({
          day: moment().add(8, 'hours').format('dddd'),
          monthYr: moment().add(8, 'hours').format('Do MMMM YYYY'),
          time: moment().add(8, 'hours').format('hh:mm a'),
        }),
      5000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateTime);
  }

  render() {
    return (
      <View>
        <Text style={this.textStyle}>{this.state.day}</Text>
        <Text style={this.textStyle}>{this.state.monthYr}</Text>
        <Text style={this.textStyle}>{this.state.time}</Text>
      </View>
    );
  }
}

export default function Todolist() {
  const [taskData, setTaskData] = useState(getAllTasks());
  const [task, setTask] = useState('');
  const [visible, setVisible] = useState(false);

  const deleteChecked = () => {
    console.log(taskData);
    for (var i = 0; i < taskData.length; i++) {
      if (taskData[i].isChecked == true) {
        deleteTaskById(taskData[i].id);
        // deleteAllTasks()
      }
    }

    setTaskData(getAllTasks());
  };

  const addValidatedTask = () => {
    if (task.length === 0) {
      // check for space
      ToastAndroid.showWithGravityAndOffset(
        'Field must not be empty!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250,
      );
    } else {
      addTask(task);
      setTask('');
      setVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: '60%', width: '20%', resizeMode: 'contain'}}
            source={require('./images/mainicons/to-do-list-icon.png')}
          />
          <View style={{marginLeft: 5, justifyContent: 'center'}}>
            <Time />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <InfoLine
            text="Remove completed tasks"
            src={require('./images/buttons/bin-icon.png')}
          />
        </View>
      </View>
      <View style={{marginTop: 18}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
            Tasks left
          </Text>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#2F1693',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{color: 'white', fontSize: 30}}>
              {taskData.length}
            </Text>
          </View>
        </View>
        <View style={{height: 350}}>
          <FlatList
            persistentScrollbar={true}
            data={taskData}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CheckBox
                  task={item.task}
                  id={item.id}
                  checked={item.isChecked}
                />
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          position: 'absolute',
          bottom: 75,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <MainButton
          event={deleteChecked}
          imgSize={45}
          color={'#FFBE28'}
          size={74}
          borderRad={74 / 2}
          mb={0}
          imgSrc={require('./images/buttons/bin-icon.png')}
        />
        <CustomPopup
          visible={visible}
          containerStyle={{
            backgroundColor: '#EBDBFF',
            justifyContent: 'space-evenly',
            width: '90%',
            height: 270,
            borderRadius: 30,
            elevation: 20,
            paddingHorizontal: 40,
            borderColor: 'black',
            borderWidth: 1,
            elevation: 20,
          }}>
          <View
            style={{
              backgroundColor: '#DBBFFF',
              width: 300,
              height: 120,
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
            }}>
            <TextInput
              onChangeText={inputTask => {
                setTask(inputTask);
              }}
              placeholder="Enter Task"
              style={{fontSize: 35, paddingBottom: 8}}
            />
          </View>
          <DualButtons
            leftText={'Add'}
            rightText={'Cancel'}
            leftEvent={addValidatedTask}
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

export function CheckBox({checked, task, id}) {
  const [checkBoxState, setCheckBoxState] = useState(checked);
  const toggleCheckboxState = () => {
    setCheckBoxState(!checkBoxState);
    updateCheckedById(id, !checkBoxState);
  };
  return (
    <BouncyCheckbox
      TouchableComponent={Pressable}
      isChecked={checkBoxState}
      style={checkBoxState ? styles.taskDone : styles.task}
      onPress={toggleCheckboxState}
      text={task}
      iconStyle={{
        borderRadius: 10,
        height: 45,
        width: 45,
        borderColor: 'transparent',
      }}
      textStyle={{color: checkBoxState ? '#495057' : 'black', fontSize: 30}}
      fillColor="#C8E6C9"
      unfillColor="white"
      checkIconImageSource={require('./images/todolistPage/tick-icon.png')}
    />
  );
}

export function InfoLine({text, src}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Image
        source={src}
        resizeMode="center"
        style={{aspectRatio: 1.1, resizeMode: 'contain'}}
      />
      <Text
        style={{
          marginLeft: 10,
          fontSize: 25,
          color: 'black',
          width: 250,
          lineHeight: 24,
        }}>
        {text}
      </Text>
    </View>
  );
}

export function NavTab() {
  return (
    <View style={styles.navcontainer}>
      <View style={styles.imageactive}>
        <Image
          style={{
            width: '55%',
            height: '69%',
            marginBottom: 10,
          }}
          source={require('./images/mainicons/to-do-list-icon.png')}
        />
      </View>
      <TouchableOpacity>
        <Image
          style={styles.imagepass}
          source={require('./images/mainicons/passwords-icon.png')}
        />
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B00DB',
  },
  topSection: {
    height: '26%',
    backgroundColor: '#D6CAF0',
    alignItems: 'center',
    marginBottom: 5,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 17,
    paddingRight: 60,
    padding: 10,
    borderRadius: 17,
    backgroundColor: '#DBBFFF',
  },
  taskDone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 17,
    paddingRight: 60,
    padding: 10,
    borderRadius: 17,
    backgroundColor: '#DBACFF',
  },
  navcontainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFBE28',
    width: '100%',
    height: 50,
  },
  image: {
    width: 38,
    height: 38,
  },
  imagepass: {
    width: 42,
    height: 42,
  },
  imagehome: {
    width: 38,
    height: 32,
  },
  imageactive: {
    marginBottom: 10,
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
});
