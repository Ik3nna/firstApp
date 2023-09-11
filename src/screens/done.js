import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { todoActions } from '../redux/todo-slice';
import Checkbox from 'expo-checkbox';

SplashScreen.preventAutoHideAsync();

// icons
import { FontAwesome5 } from '@expo/vector-icons'; 

const Done = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Roboto-ThinItalic': require('../../assets/fonts/Roboto-ThinItalic.ttf'),
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const tasks = useSelector((state) => state.todo.todos_List);
  const dispatch = useDispatch();

  const handleDelete = (id)=> {
    dispatch(todoActions.deleteTodo(id));
    Alert.alert("Success", "Task removed successfully")
  }

  const checkTask = (id, newValue)=> {
    const index = tasks.findIndex((task)=> task.id === id);

    if (index > -1) {
      const updatedTasks = [...tasks]; // Create a new array
      updatedTasks[index] = { ...updatedTasks[index], done: newValue }; // Update the done property
      dispatch(todoActions.updateTodo({ id, ...updatedTasks[index] }));
      Alert.alert("Success", "Task state is changed.")
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.body} onLayout={onLayoutRootView}>
      <StatusBar style='auto' />
      <FlatList
        data={tasks.filter((task)=> task.done === true)}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=> (
          <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Task", { itemId: item.id})}>
            <View style={styles.item_row}>
              <View 
                style={[ 
                  { 
                    backgroundColor: 
                    item.color === "red" ? "#f28b82" :
                    item.color === "blue" ? "#aecbfa" :
                    item.color === "green" ? "#ccff90" : "#ffffff"
                  }, styles.color]} 
              />
              <Checkbox value={item.done} onValueChange={(newValue)=>{checkTask(item.id, newValue)}} />
              <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
              </View>
              <TouchableOpacity style={styles.delete} onPress={()=> handleDelete(item.id)}>
                <FontAwesome5 name="trash" size={25} color="#ff3636" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Done;

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0080ff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 5
  },
  item_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: "50",
    height: "50",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5
  },
  title: {
    color: "#000000",
    fontSize: 30,
    margin: 5,
    fontFamily: "Roboto-Black"
  },
  desc: {
    color: "#999999",
    fontSize: 20,
    margin: 5,
    fontFamily: "Roboto-ThinItalic"
  }
})