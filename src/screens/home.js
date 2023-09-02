import { useCallback, useEffect, useState } from 'react';
import { Text, Pressable, StyleSheet, SafeAreaView, Alert, TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import globalStyle from '../components/globalStyle';

const Home = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [name, setName] = useState("");

  useEffect(()=>{
    getData();
  },[]);

  const getData = ()=> {
    try {
      AsyncStorage.getItem("Username").then(value => {
        if (value != null) {
          setName(value);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const updateData = async ()=> {
    if (name.length === 0) {
        Alert.alert("Warning", "Please enter your name!!")
    }
    else {
        try {
            await AsyncStorage.setItem("Username", name);
            Alert.alert("Success", "Your name has been updated")
        } catch (error) {
            console.log(error)
        }
    }
  }

  const removeData = async ()=> {
    try {
      await AsyncStorage.removeItem("Username");
      navigation.navigate("Login")
    } catch (error) {
      console.log(error)
    }
  }

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={[globalStyle.body, ]} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Text style={[globalStyle.text, styles.text]}>Welcome {name}</Text>

      <TextInput 
        style={styles.input}
        value={name}
        placeholder="Update your name"
        onChangeText={(value)=>setName(value)}
      />

      <Pressable
        style={({pressed})=> 
        [
          { backgroundColor: pressed ? "#ddd" : "#0f0" },
          globalStyle.button
        ]}
        onPress={updateData}
      >
        <Text>Update your name</Text>
      </Pressable>

      <Pressable
        style={({pressed})=> 
        [
          { backgroundColor: pressed ? "#ddd" : "#0f0" },
          globalStyle.button, { marginTop: 10 }
        ]}
        onPress={removeData}
      >
        <Text>Delete your name</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
    text: {
      fontFamily: "Roboto-Thin"
    },
    input: {
      width: 300,
      height: 50,
      borderWidth: 1,
      borderColor: "#555",
      borderRadius: 10,
      textAlign: "center",
      fontSize: 20,
      marginTop: 130,
      marginBottom: 20,
      backgroundColor: "#ffffff"
  }
});