import { useCallback } from 'react';
import { Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Home = ({ navigation }) => {
  const onPressHandler = ()=> {
    navigation.navigate("About")
  }

  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
    
  return (
    <SafeAreaView style={styles.body} onLayout={onLayoutRootView}>
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
      fontWeight: "bold",
      fontFamily: "Roboto-Black"
    },
    button: {
      padding: 10,
      borderRadius: 10,
    }
});