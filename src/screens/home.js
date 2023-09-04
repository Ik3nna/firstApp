import { useCallback, useEffect, useState, useRef } from 'react';
import { Text, Pressable, StyleSheet, SafeAreaView, Alert, TextInput, View, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// styles
import globalStyle from '../components/globalStyle';
import { FlatList } from 'react-native-gesture-handler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const DATA = [
    {
      title: 'United States',
      subtitle: "New York",
      latitude: "40.71692902600371",
      longitude: "-74.01542790234286"
    },
    {
      title: 'Australia',
      subtitle: "Sydney",
      latitude: "-33.86995736018323",
      longitude: "151.19994316536426"
    },
    {
      title: 'Germany',
      subtitle: "Berlin",
      latitude: "52.520721013691364",
      longitude: "13.399979163230219"
    },
    {
      title: 'France',
      subtitle: "Paris",
      latitude: "48.85691728176082",
      longitude: "2.3532377365677513"
    },
  ];

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView style={[globalStyle.body, ]} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Text style={[globalStyle.text, styles.text]}>Welcome Ikenna</Text>

      <Pressable
        style={({pressed})=> 
          [
            { backgroundColor: pressed ? "#ddd" : "#0080ff" },
            globalStyle.button
          ]}
        onPress={()=> navigation.navigate("Camera")}
      >
        <Text>Open camera</Text>
      </Pressable>

      <FlatList 
        keyExtractor={(item, index)=> index.toString()}
        data={DATA}
        renderItem={({item})=>(
          <TouchableOpacity onPress={async () => { await schedulePushNotification(item), navigation.navigate("Map", { city: item.subtitle, lat: item.latitude, long: item.longitude  }) }}>
            <View style={styles.view}>
              <Text style={styles.mainText}>{item.title}</Text>

              <Text style={styles.text}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default Home;

async function schedulePushNotification (item) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${item.title} ${"\n"}Please share this information to me`,
      body: item.subtitle,
      data: { customData: 'Please share this information to me' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Thin"
  },
  view: {
    width: 300,
    margin: 7,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#cccccc",
    padding: 20
  },
  mainText: {
    fontSize: 30,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: "#999999",
    margin: 10
  }
});