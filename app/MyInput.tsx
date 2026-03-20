import React, {useState} from "react";
import {View, Text, TextInput, Button} from "react-native";

type MyTimeSet = {
minutes: number;
}
const MyInput = () => {
	const [num,onChangeNumber] = React.useState('');
	function checkNum(){
		if(num < 15 || num > 60){
			alert("Invalid range!");
		}else{
			alert("Ok!");
		}
	}
	return (
	<View>
	<TextInput value={num} placeholder = "Enter Number here" onChangeText={newNum => onChangeNumber(newNum)} keyboardType="numeric" />
	<Button onPress={checkNum} title="Evaluate!" color = "#809708"></Button>
	</View>
	);
}

export default MyInput;