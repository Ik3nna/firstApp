import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from './src/screens/home';
import About from './src/screens/about';

// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator 
          screenOptions={{
            drawerPosition: "right",
            drawerType: "front",
            overlayColor: "#00000099",
            drawerHideStatusBarOnOpen: true,
            swipeEdgeWidth: 500,
            drawerStyle: { backgroundColor: "yellow" },
            gestureHandlerProps: false,
            headerTitleAlign: "center"
          }}
        >
          <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: ()=>(<FontAwesome name="home" size={24} />) }} /> 
          <Drawer.Screen name="About" component={About} initialParams={{ itemName: "Item from Drawer", id: 12 }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


