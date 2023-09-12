import { StyleSheet, TextInput, Text, View, Alert, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import CustomButton from '../components/customButton';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../redux/todo-slice';
import Checkbox from 'expo-checkbox';
import { FontAwesome5} from '@expo/vector-icons'; 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { ScrollView } from 'react-native-gesture-handler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Task({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isChecked, setChecked] = useState(false);  
  const [color, setColor] = useState("white");

  const [showBellModal, setShowBellModal] = useState(false);
  const [bellTime, setBellTime] = useState("1");
  const [image, setImage] = useState("");

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const dispatch = useDispatch();

  const todos = useSelector((state)=>state.todo.todos_List);

  useEffect(()=>{
    getTask();

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);

  const getTask = ()=> {
    const Task = todos.find((task)=> task.id === route.params?.itemId);
    if (Task) {
      setTitle(Task.title);
      setDesc(Task.desc);
      setChecked(Task.done);
      setColor(Task.color);
      setImage(Task.image);
    }
  }

  const saveTask = async ()=> {
    if (title.length === 0) {
      Alert.alert("Warning", "Please write your task title.")
    } else {
      let task = { title: title, desc: desc, done: isChecked, color: color, image: image }
      const existingTaskIndex = todos.findIndex((task) => task.id === route.params?.itemId);
      if (existingTaskIndex !== -1) {
        // Update the existing task
        dispatch(todoActions.updateTodo({ id: route.params?.itemId, ...task }));
        Alert.alert("Success", "Task updated successfully!!")
      } else {
        // Add a new task
        dispatch(todoActions.addTodo(task));
        Alert.alert("Success", "Task saved successfully!!")
      }
     
      setTitle("");
      setDesc("");
      navigation.goBack();
    }
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: desc,
        data: { data: 'goes here' },
      },
      trigger: { seconds: parseInt(bellTime, 10) * 60 },
    });

    setShowBellModal(false);
  }
  
  return (
    <ScrollView>
      <View style={styles.body}>
        <Modal
          visible={showBellModal}
          transparent
          onRequestClose={()=>setShowBellModal(false)}
          animationType='slide'
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.bell_modal}>
              <View style={styles.bell_body}>
                <Text style={styles.text}>Remind me after</Text>
                <TextInput 
                  style={styles.bell_input}
                  keyboardType="numeric"
                  value={bellTime}
                  onChangeText={(value)=>setBellTime(value)}
                />
                <Text style={styles.text}>minute(s)</Text>
              </View>
              <View style={styles.bell_buttons}>
                <TouchableOpacity style={styles.bell_cancel_button} onPress={()=>setShowBellModal(false)}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bell_ok_button}  onPress={async () => { await schedulePushNotification()}}>
                  <Text style={styles.text}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>
        <TextInput 
          style={styles.input} 
          placeholder='Title'
          value={title}
          onChangeText={(value)=>setTitle(value)}
        />
        <TextInput 
          style={styles.input} 
          placeholder='Description'
          value={desc}
          multiline
          onChangeText={(value)=>setDesc(value)}
        />
        <View style={styles.color_bar}>
          <TouchableOpacity 
            style={styles.color_white} 
            onPress={()=>setColor("white")}
          >
            {color === "white" && <FontAwesome5 name={"check"} size={25} color="#000000" />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.color_red} 
            onPress={()=>setColor("red")}
          >
            {color === "red" && <FontAwesome5 name={"check"} size={25} color="#000000" />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.color_blue} 
            onPress={()=>setColor("blue")}
          >
            {color === "blue" && <FontAwesome5 name={"check"} size={25} color="#000000" />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.color_green} 
            onPress={()=>setColor("green")}
          >
            {color === "green" && <FontAwesome5 name={"check"} size={25} color="#000000" />}
          </TouchableOpacity>
        </View>
        <View style={styles.extra_row}>
          <TouchableOpacity style={styles.extra_button} onPress={()=>setShowBellModal(true)}>
            <FontAwesome5 name="bell" size={25} color={"#ffffff"} />
          </TouchableOpacity>
        </View>
        <View style={styles.checkbox_container}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={(value)=>setChecked(value)} />
          <Text style={styles.checkbox_text}>Is Done</Text>
        </View>
        <CustomButton 
          title="Save Task"
          color="#1eb900"
          style={{ width: "100%" }}
          onPressFunction={saveTask}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  centered_view: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  bell_modal: {
    width: 300,
    height: 200,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000000"
  },
  bell_body: {
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  bell_input: {
    width: 50,
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    margin: 10
  },
  bell_buttons: {
    flexDirection: "row",
    height: 50 
  },
  bell_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  bell_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    textAlign: "left",
    fontSize: 20,
    margin: 10,
  },
  color_bar: {
    flexDirection: "row",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#555555",
    marginVertical: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  color_red: {
    flex: 1,
    backgroundColor: "#f28b82",
    justifyContent: "center",
    alignItems: "center"
  },
  color_blue: {
    flex: 1,
    backgroundColor: "#aecbfa",
    justifyContent: "center",
    alignItems: "center"
  },
  color_green: {
    flex: 1,
    backgroundColor: "#ccff90",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  extra_row: {
    flexDirection: "row",
    marginVertical: 10
  },
  extra_button: {
    flex: 1,
    height: 50,
    backgroundColor: "#0080ff",
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox_container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  checkbox_text: {
    fontSize: 20,
    color: "#000000",
  },
  checkbox: {
    margin: 8
  },
  image: {
    width: 300,
    height: 300,
    margin: 20
  }
})


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}