import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Button, SafeAreaView,StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onPressHandler =()=> {
    setSubmitted(!submitted);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}> 
      <StatusBar style='auto' />
      <View style={styles.container}>
        <Text style={styles.text}>Please write your name: </Text>
        <TextInput 
          style={styles.input} 
          placeholder='Enter your name...'
          onChangeText={(value)=>setName(value)}
          multiline
          keyboardType="name-phone-pad"
        />
        <Button 
          title={submitted ? "clear" : 'submit'}
          onPress={onPressHandler}
        />
        {submitted && 
          <Text style={styles.text}>
            Your are registered as {name}
          </Text>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    margin: 10
  },
  input: {
    borderWidth: 1,
    width: 200,
    border: "#555",
    borderRadius: 5,
    padding: 10,
  }
});
