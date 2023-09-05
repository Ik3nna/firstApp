import { StyleSheet, TextInput, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import CustomButton from '../components/customButton';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../redux/todo-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Task({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
    }
  }

  const saveTask = ()=> {
    if (title.length == 0) {
      Alert.alert("Warning", "Please write your task title.")
    } else {
      let task = { title: title, desc: desc }
      dispatch(todoActions.addTodo(task));
      Alert.alert("Success", "Task saved successfully!!")
      setTitle("");
      setDesc("");
      navigation.goBack();
    }
  }

  useEffect(()=>{
    AsyncStorage.setItem("Tasks", JSON.stringify(todos));
  }, [todos])
  
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
  }
})