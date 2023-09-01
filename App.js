import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Alert, Button, Modal, Pressable, SafeAreaView,StyleSheet, Text, TextInput, Image, View, ImageBackground } from 'react-native';

export default function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onPressHandler =()=> {
    if (name.length > 3) {
      setSubmitted(!submitted);
    }
    else {
      setShowWarning(true);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}> 
      <StatusBar style='auto' />
      <ImageBackground style={styles.container} source={{ uri: "https://cdn.pixabay.com/photo/2013/07/12/12/35/texture-145968_960_720.png" }}>
        <Modal
          visible={showWarning}
          transparent
          onRequestClose={()=>
            setShowWarning(false)
          }
          animationType="slide"
        >
          <View style={styles.centered_view}>
            <View style={styles.warning_title}>
              <Text>WARNING!!!</Text>
            </View>

            <View style={styles.warning_body}>
              <Text>The name must be longer than 3 characters</Text>
            </View>

            <Pressable onPress={()=>setShowWarning(false)}>
              <Text>OK</Text>
            </Pressable>

            {/* <View style={styles.warning_modal}>
              
            </View> */}
          </View>
        </Modal>
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
          <Text style={styles.text}>
            {submitted ? "Clear" : "Submit"}
          </Text>
        </Pressable>
        {submitted ?
          <Text style={styles.text}>
            Your are registered as {name}
          </Text> :
          <Image 
            style={styles.image}
            source={require("./assets/icon.png")}
            resizeMode="stretch"
          />
        }
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffffff",
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
  },
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099"
  },
  warning_title: {
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  warning_body: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  image: {
    width: 100,
    height: 100
  }
});
