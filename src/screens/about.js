import { useCallback } from 'react';
import { Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// styles
import globalStyle from '../components/globalStyle';

const About = ({ navigation, route }) => {
  const { itemName, id } = route.params;

  const onPressHandler = ()=> {
    navigation.navigate("Home")
  }

  const [fontsLoaded] = useFonts({
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
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
    <SafeAreaView style={[globalStyle.body]} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Text style={[globalStyle.text, styles.text]}>About</Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed})=> 
        [
          { backgroundColor: pressed ? "#ddd" : "#0f0" },
          globalStyle.button
        ]}
      >
        <Text>Go to Home page</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default About

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Thin"
  }
});