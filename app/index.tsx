import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MyButton from "./App";
import MyModal from "./MyModal";
import MyInput from "./MyInput";
import MyLocation from "./MyLocation";
//most of this is me learning React with various exercises. I started learning on March 17, this is my progress so far.
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
	//<MyButton myTitle = "Not an octopus" myColor="#110088"/>
	//<MyModal myTitle = "Enter a number" myColor="#9C5166"/>
	//<MyInput />
	<MyLocation />
    </View>
	
  );
}
