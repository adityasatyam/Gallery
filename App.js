import React, { Component } from 'react';
import {Text} from 'react-native';
import Camera from './Camera';
import Gallery from './Gallery'
import ViewImage from './ViewImage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

class App extends Component {
  state = {  }
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Gallery" component={Gallery}/>
        <Stack.Screen name="ViewImage" component={ViewImage}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

export default App;