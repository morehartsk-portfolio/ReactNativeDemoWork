import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MyButton from "./App";
import MyModal from "./MyModal";
import MyInput from "./MyInput";
import MyLocation from "./MyLocation";
import MyAlarm from "./MyAlarm";
import MyTimer from "./MyTimer";
import UserTimer from "./UserTimer";
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
	<UserTimer hours = {1} minutes = {0} seconds = {0}/>
    </View>
	
  );
}
