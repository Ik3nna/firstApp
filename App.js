import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Splash from './src/screens/splash';
import Map from './src/screens/map';
import RNCamera from './src/screens/camera';
import Todo from './src/screens/todo';
import Done from './src/screens/done';

// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash '>
        <Stack.Screen name="Splash" component={Splash } options={{ headerShown: false }} /> 
        <Stack.Screen name="Todo" component={Todo} /> 
        <Stack.Screen name="Done" component={Done} />
        <Stack.Screen name="Map" component={Map} /> 
        <Stack.Screen name="Camera" component={RNCamera} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


