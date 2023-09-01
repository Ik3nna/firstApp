import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Home from './src/screens/home';
import About from './src/screens/about';

// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';

// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route})=>({
            tabBarIcon: ({ focused, size, color })=>{
              let iconName;
              if (route.name === "Home") {
                iconName="home";
                size=focused ? 25 : 20;
                // color=focused && "blue"
              } else if (route.name === "About") {
                iconName="info-circle";
                size=focused ? 25 : 20;
                // color=focused && "blue"
              }
              return (
                <FontAwesome name={iconName} size={size} color={color} />
              )
            }
          })}
          // activeColor='#f0edf6'
          // inactiveColor='#3e2465'
          // barStyle={{ backgroundColor: "#694fad" }}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: "black",
            labelStyle: { fontSize: 20 },
          }}
        >
          <Tab.Screen name="Home" component={Home} /> 
          <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


