import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from './src/screens/home';
import Login from './src/screens/login';
import Map from './src/screens/map';
import RNCamera from './src/screens/camera';

// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
          <Stack.Screen name="Home" component={Home} /> 
          <Stack.Screen name="Map" component={Map} /> 
          <Stack.Screen name="Camera" component={RNCamera} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


