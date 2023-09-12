import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from './src/screens/splash';
import Task from './src/screens/task';
import Todo from './src/screens/todo';
import Done from './src/screens/done';

import { Provider } from 'react-redux';
import store from './src/redux';

// icons
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return(
    <Tab.Navigator 
      screenOptions={
        ({ route }) => ({ 
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "Todo") {
              iconName = "sticky-note";
              size = focused ? 25 : 20;
            } else if (route.name === "Done") {
              iconName = "notes-medical";
              size = focused ? 25 : 20;
            }
            return(
              <FontAwesome5 name={iconName} size={size} color={color} />
            )
          },
          tabBarActiveTintColor: "#0080ff",
          tabBarInactiveTintColor: "#777777",
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold"}
        })
      }
    >
      <Tab.Screen name="Todo" component={Todo} options={{ headerShown: false }} />
      <Tab.Screen name='Done' component={Done} options={{ headerShown: false }}  />
    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='Splash'>
          <RootStack.Screen name="Home" component={Splash } options={{ headerShown: false }} /> 
          <RootStack.Screen name='My Tasks' component={HomeTabs} />
          <RootStack.Screen name='Task' component={Task} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


