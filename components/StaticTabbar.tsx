import * as React from "react";
import {
  View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions,
} from "react-native";
import  MaterialCommunityIcons   from "@expo/vector-icons/MaterialCommunityIcons";

import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get("window");
interface Tab {
  name: string;
}

interface StaticTabbarProps {
  tabs: Tab[];
  value: Animated.Value;
  state:any
  descriptors:any
  navigation:any
}

export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {
  values: Animated.Value[] = [];
   page=[
    "Home",      
     "Follows",  
    "Chat",      
    "Profile"    
   ];

   tabs = [
    {
      name: "home",
    },
    {
      name: "heart",
    },
    {
      name: "chat",
    },
    {
      name: "emoticon-excited",
    },
  ];
  constructor(props: StaticTabbarProps) {
    super(props);
    const { tabs } = this.props;
    this.values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0));
  }

  onPress = (index: number) => {
    const { value, tabs } = this.props;
    const tabWidth = width / tabs.length;
    Animated.sequence([
      Animated.parallel(
        this.values.map(v => Animated.timing(v, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })),
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          useNativeDriver: true,
        }),
        Animated.spring(this.values[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    
  }

  render() {
    const { onPress } = this;
    const { value,state,descriptors, navigation} = this.props;
    return (
      <View style={styles.container}>
        {state.routes.map((route:any, index:number) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const onPress = (num:number) => {
          console.log('rotes ' + state.index);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          this.onPress(num);
        };
          const tabWidth = width / this.tabs.length;
          const cursor = tabWidth * index;
          
         
          const opacity = value.interpolate({
            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
          });
          const translateY = this.values[index].interpolate({
            inputRange: [0, 1],
            outputRange: [64, 0],
            extrapolate: 'clamp',
          });
          const opacity1 = this.values[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });
          return (
            <React.Fragment key={index}>
              <TouchableWithoutFeedback 
                      key={index}
                     // testID={options.tabBarTestID}
                      onPress={() =>{
                        onPress(index);  }}>
                <Animated.View style={[styles.tab, { opacity }]}>
                  <MaterialCommunityIcons name={this.tabs[index].name} color="black" size={25} />
                </Animated.View>
              </TouchableWithoutFeedback>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: -15,
                  left: tabWidth * index,
                  width: tabWidth,
                  height: 64,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: opacity1,
                  transform: [{ translateY }],
                }}
              >
                <View style={styles.activeIcon}>
                  <MaterialCommunityIcons name={this.tabs[index].name} color="blue" size={25} />
                </View>
              </Animated.View>
            </React.Fragment>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
