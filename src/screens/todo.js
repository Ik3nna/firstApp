import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Todo = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='auto' />
        <View style={styles.body}>

        </View>
    </SafeAreaView>
  )
}

export default Todo;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})