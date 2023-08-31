import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Alert, Button, Pressable, SafeAreaView,StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

export default function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onPressHandler =()=> {
    if (name.length > 3) {
      setSubmitted(!submitted);
    }
    else {
      // Alert.alert("Warning", "The name must be longer than 3 characters", [
      //   {text: "OK"},
      //   {text: "Cancel"},
      //   {text: "Do not show again"}
      // ], { cancelable: true, })
      ToastAndroid.show("The name must be at least 3 characters", ToastAndroid.SHORT)
    }
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
        <Pressable
          onPress={onPressHandler}
          hitSlop={{ top:10, bottom:10, left:10, right:10 }}
          andriod_ripple={{color: "00f"}}
          style={({pressed})=> [
            { backgroundColor: pressed ? "#dddddd" : "00ff00" },
          ]}
        >
          <Text style={styles.tet}>
            {submitted ? "Clear" : "Submit"}
          </Text>
        </Pressable>
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
