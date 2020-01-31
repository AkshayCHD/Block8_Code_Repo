# React Native

To create a react native application 
1) Download expo application in your app
2) ```npm install -g expo-cli```
3)```expo init book_manager```
4)```cd book_manager```

## Styling components

```
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBox: {
        height: 100,
        width: 100,
        backgroundColor: 'yellow'
    }
});

export default styles;
```
In component
```
<View style={Styles.container}>
```

# using hooks
it is almost same as being used in react, 
```
import React, { useState, useEffect } from 'react';
import QrScanner from  './Components/QrScanner/QrScanner'

import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
export default function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  useEffect(() => {

  }, [name])
  return (
    <View style={styles.container}>
      <Text>Enter Name:</Text>
      <TextInput style={styles.input} onChangeText={value => {setName(value)}}/>
      <Text>Enter Age:</Text>
      <TextInput 
        keyboardType='numeric' 
        style={styles.input} 
        onChangeText={value => setAge(value)}
      />
      <Text>name: {name}, age: {age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10, 
    width: 200
  }
})
```

## Scroll View
```
export default function App() {
  const [people, setPeople] = useState([
    { name: "Name1", key: 1},
    { name: "Name2", key: 2},
    { name: "Name3", key: 3},
    { name: "Name4", key: 4},
    { name: "Name5", key: 5},
    { name: "Name6", key: 6},
    { name: "Name4", key: 7},
    { name: "Name5", key: 8},
    { name: "Name6", key: 9}
  ])
  return (
    <View style={styles.container}>
      <ScrollView>
        {
          people.map(item => (
            <View key={item.key}>
              <Text key={item.key} style={styles.textStyle}>{item.name}</Text>
            </View>)
          )
        }
      </ScrollView>
    </View>
  );
}
```
## FlatList
```
 <FlatList
      numColumns={2}
      data={people}
      keyExtractor={(item) => item.key}
      renderItem={( {item}) => {
        console.log(item)
      return (<Text key={item.key} style={styles.textStyle}>{item.name}</Text>);
      }}
      />
```

we have to extract item property of the object suplied to renderItems as the, object looks like
```
Object {
  "index": 6,
  "item": Object {
    "key": 7,
    "name": "Name4",
  },
  "separators": Object {
    "highlight": [Function highlight],
    "unhighlight": [Function unhighlight],
    "updateProps": [Function updateProps],
  },
}

```
