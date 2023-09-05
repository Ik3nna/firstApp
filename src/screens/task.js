import { StyleSheet, TextInput, Text, View } from 'react-native'
import React, { useState } from 'react';
import CustomButton from '../components/customButton';

export default function Task() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
        multiline
        value={desc}
        onChangeText={(value)=>setDesc(value)}
      />
      <CustomButton 
        title="Save Task"
        color="#1eb900"
        style={{ width: "100%" }}
        onPress
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