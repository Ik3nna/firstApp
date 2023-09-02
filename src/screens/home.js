import { useCallback } from 'react';
import { Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// styles
import globalStyle from '../components/globalStyle';

const Home = ({ navigation }) => {
  const onPressHandler = ()=> {
    navigation.navigate("About")
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
    <SafeAreaView style={[globalStyle.body, ]} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Text style={[globalStyle.text, styles.text]}>Home</Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed})=> 
        [
          { backgroundColor: pressed ? "#ddd" : "#0f0" },
          globalStyle.button
        ]}
      >
        <Text>Go to About page</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
    text: {
      fontFamily: "Roboto-Thin"
    }
});