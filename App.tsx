import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Text, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import Tabbar from "./components/Tabbar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
interface AppProps {}

export default class App extends React.Component<AppProps> {
  render() {
    return (
    
<NavigationContainer >
        <TabSet />
        </NavigationContainer>
    );
  }
}
function homepage(){
  return(  <View style={styles.container}>
    <Text>Home</Text>
  </View>)
}
function Follows(){
  return(  <View style={styles.container}>
    <Text>Follow</Text>
  </View>)
}
function chat(){
  return(  <View style={styles.container}>
    <Text>Chat</Text>
  </View>)
}
function Profile(){
  return( <View style={styles.container}>
    <Text>profile</Text>
  </View>)
}

 const TabSet = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      tabBar={(props) => <Tabbar  {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={homepage} 
            options={{ headerShown: false }}/>
      <Tab.Screen name="Follows" component={Follows} options={{ headerShown: false }}/>
      <Tab.Screen name="Chat" component={chat} options={{ headerShown: false }}/>
      <Tab.Screen
        name="Profile"
        component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
  },
});

