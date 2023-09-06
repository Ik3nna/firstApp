import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { todoActions } from '../redux/todo-slice';

SplashScreen.preventAutoHideAsync();

// icons
import { FontAwesome5 } from '@expo/vector-icons'; 

const Todo = ({ navigation }) => {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.body} onLayout={onLayoutRootView}>
      <StatusBar style='auto' />
      <FlatList
        data={tasks}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({ item })=> (
          <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Task", { itemId: item.id})}>
            <View style={styles.item_row}>
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
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Task")}>
        <FontAwesome5 name={'plus'} size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  )
}

export default Todo;

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
    paddingHorizontal: 10,
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