import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, SafeAreaView, Image, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import globalStyle from "../components/globalStyle";
import * as SplashScreen from 'expo-splash-screen';
import { useFocusEffect } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const Splash = ({ navigation })=> {
    const [fontsLoaded] = useFonts({
        'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
    });
    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("My Tasks")
        }, 2000);
    },[])

    useFocusEffect(
        useCallback(() => {
          const timer = setTimeout(() => {
            navigation.navigate("My Tasks");
          }, 2000);
    
          return () => clearTimeout(timer); 
        }, [navigation])
    );
    
    if (!fontsLoaded) {
        return null;
    }

    return(
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <View style={styles.body}>
                <Image style={styles.image} source={require("../../assets/checklist.png")} />

                <Text style={[globalStyle.customFontBig, styles.text]}>Nduks To-Do List</Text>
            </View>
        </SafeAreaView>
    )
}

export default Splash;

const styles= StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0080ff",
    },
    image: {
        width: 150,
        height: 150,
        margin: 20
    },
    text: {
        fontSize: 40,
        color: "#ffffff",
    }
})