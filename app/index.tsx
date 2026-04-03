import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import IdleTimer from "./IdleTimer";

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
	<IdleTimer />
    </View>
	
  );
}
