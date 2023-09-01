import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Pressable, StyleSheet, Text, View, } from 'react-native';

const Stack = createStackNavigator();

function Home ({ navigation }) {
  const onPressHandler = ()=> {
    navigation.navigate("About")
  }

  return(
    <View style={styles.body}>
      <Text style={styles.text}>Home</Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed})=> 
        [
          { backgroundColor: pressed ? "#ddd" : "#0f0" },
          styles.button
        ]}
      >
        <Text>Go to About page</Text>
      </Pressable>
    </View>
  )
}

function About ({ navigation }) {
  const onPressHandler = ()=> {
    // navigation.navigate("Home")
    navigation.goBack();
  }

  return(
    <View style={styles.body}>
      <Text style={styles.text}>About</Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed})=> 
        [
          { backgroundColor: pressed ? "#ddd" : "#0f0" },
          styles.button
        ]}
      >
        <Text>Go to Home page</Text>
      </Pressable>
    </View>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: ()=> null }}>
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 40,
    fontWeight: "bold"
  },
  button: {
    padding: 10,
    borderRadius: 10,
  }
});
