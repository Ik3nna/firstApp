import { Pressable, StyleSheet, Text} from 'react-native'
import React from 'react'

export default function CustomButton({ title, style, color, onPressFunction }) {
  return (
    <Pressable
        onPress={onPressFunction}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        android_ripple={{ color: "#00000050" }}
        style={({ pressed })=>[
            { backgroundColor: pressed ? '#dddddd' : color },
            styles.button,
            { ...style }
        ]}
    >
        <Text style={styles.text}>
            {title}
        </Text>   
    </Pressable>
  )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
    },
})