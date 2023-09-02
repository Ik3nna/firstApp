import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from './src/screens/home';
import Login from './src/screens/login';


// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Login'
          // screenOptions={{
          //   headerTitleAlign: "center",
          // }}
        >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
          <Stack.Screen name="Home" component={Home} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


