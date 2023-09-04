import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import globalStyle from '../components/globalStyle';

const Map = ({ route }) => {
  const { city, lat, long } = route. params;

  const initialRegion = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  return (
    <View style={styles.body}>
        <Text style={[globalStyle.text, styles.text]}>{city}</Text>
        <MapView style={styles.map} initialRegion={initialRegion} />
    </View>
  )
}

export default Map;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
    },
    text: {
        fontFamily: "Roboto-Thin"
    },
    map: {
        width: "100%",
        height: "100%"
    }
})