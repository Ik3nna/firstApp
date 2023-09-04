import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Done() {
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <Text>Done</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})