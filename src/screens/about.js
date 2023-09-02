import { Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';

const About = ({ navigation, route }) => {
  const { itemName, id } = route.params;

  const onPressHandler = ()=> {
    navigation.navigate("Home")
  }
    
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="auto" />
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

      <Text style={styles.text}>{itemName}</Text>
    </SafeAreaView>
  )
}

export default About

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