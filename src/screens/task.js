import { StyleSheet, TextInput, Text, View, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/customButton';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../redux/todo-slice';
import Checkbox from 'expo-checkbox';

// icons
import { FontAwesome5} from '@expo/vector-icons'; 

export default function Task({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isChecked, setChecked] = useState(false);  
  const [color, setColor] = useState("white")

  const dispatch = useDispatch();

  const todos = useSelector((state)=>state.todo.todos_List);

  useEffect(()=>{
    getTask();
  },[])

  const getTask = ()=> {
    const Task = todos.find((task)=> task.id === route.params?.itemId)
    if (Task) {
      setTitle(Task.title);
      setDesc(Task.desc);
      setChecked(Task.done)
    }
  }

  const saveTask = async ()=> {
    if (title.length === 0) {
      Alert.alert("Warning", "Please write your task title.")
    } else {
      let task = { title: title, desc: desc, done: isChecked }
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
  
  return (
    <View style={styles.body}>
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
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    padding: 10
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
  }
})