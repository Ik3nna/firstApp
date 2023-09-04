import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// icons
import { FontAwesome5 } from '@expo/vector-icons'; 

const Todo = ({ navigation }) => {
  return (
    <View style={styles.body}>
      <StatusBar style='auto' />
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
    }
})