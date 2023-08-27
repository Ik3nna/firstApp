import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Button, FlatList, Linking, Pressable, RefreshControl, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {name: "Item 1"},
    {name: "Item 2"},
    {name: "Item 3"},
    {name: "Item 4"},
    {name: "Item 5"},
    {name: "Item 6"},
    {name: "Item 7"},
    {name: "Item 8"},
    {name: "Item 9"},
    {name: "Item 10"},
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const [count, setCount] = useState(1)

  const [Data, setData] = useState([
    {
      title: `Title ${count}`,
      data: [`Item ${count}-1`, `Item ${count}-2`, `Item ${count}-3`]
    }
  ])

  const onRefresh = ()=> {
    setRefreshing(true);
    setCount(prevCount => prevCount + 1)
    setData([...Data, { title: `Title ${count + 1}`, data: [`Item ${count + 1}-1`, `Item ${count + 1}-2`, `Item ${count + 1}-3`] }]);
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}> 
      <SectionList 
        keyExtractor={(item, index)=>index.toString()}
        sections={Data}
        renderItem={({item})=>(
          // <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          // </View>
        )}
        renderSectionHeader={({section})=>(
          <View style={styles.item}>
            <Text style={styles.text}>{section.title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* <FlatList
        keyExtractor={(item, index)=> index.toString()}
        data={items}
        renderItem={({item})=>(
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} />
        }
      /> */}
      {/* <ScrollView 
        style={styles.container} 
        refreshControl={<RefreshControl 
        refreshing={refreshing} 
        />}
      >
        <StatusBar style="black" />
        {items.map((item)=>{
          return(
            <View key={item.key} style={styles.item}>
              <Text style={styles.text}>{item.item}</Text>
            </View>
          )
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    
  },
  item: {
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  text: {
    fontSize: 40,
    fontStyle: "italic",
    margin: 10
  }
});
