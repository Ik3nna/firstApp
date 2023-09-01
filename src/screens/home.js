import { Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';

const Home = ({ navigation }) => {
  const onPressHandler = ()=> {
    navigation.navigate("About")
  }
    
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="auto" />
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
    </SafeAreaView>
  )
}

export default Home;

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