import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Image, Text, TextInput, Pressable, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyle from "../components/globalStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation })=> {
    const [name, setName] = useState("");

    useEffect(()=>{
        getData();
      },[]);
    
      const getData = ()=> {
        try {
          AsyncStorage.getItem("Username").then(value => {
            if (value != null) {
              navigation.navigate("Home")
            }
          })
        } catch (error) {
          console.log(error);
        }
      }

    const setData = async ()=> {
        if (name.length === 0) {
            Alert.alert("Warning", "Please enter your name!!")
        }
        else {
            try {
                await AsyncStorage.setItem("Username", name);
                navigation.navigate("Home")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <SafeAreaView style={styles.body}>
            <StatusBar style="auto" />

            <Image style={styles.image} source={require("../../assets/splash.png")} />

            <Text style={styles.text}>Async Storage</Text>

            <TextInput 
                style={styles.input}
                placeholder="Enter your name"
                onChangeText={(value)=>setName(value)}
            />

            <Pressable
                style={({pressed})=> 
                [
                { backgroundColor: pressed ? "#ddd" : "#0f0" },
                globalStyle.button
                ]}
                onPress={setData}
            >
                <Text>Login</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default Login;

const styles= StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#0080ff",
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    text: {
        fontSize: 30,
        color: "#ffffff",
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
})