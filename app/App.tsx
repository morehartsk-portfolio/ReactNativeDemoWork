import React, {useState} from "react";
import {Text, Button} from "react-native";

const hexDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

type ButtonProps = {
	myTitle: string;
	myColor: string;
}
function randomIndex(length:number){
	return Math.floor(Math.random()*length);
}
function randomColorGen(){
	let hexColor = "#";
	for(let i = 0; i < 6; i++){
		hexColor += hexDigits[randomIndex(hexDigits.length)];
	}
	return hexColor;
}

const MyButton = (props: ButtonProps) => {
	const [newColor, setColor] = useState(null);
	function clickBehavior(){
	//alert("Hello!");
	setColor(randomColorGen());
}
	return (
<Button onPress={clickBehavior} title={newColor ?? props.myTitle} color = {newColor ?? props.myColor}></Button>

	);
}

export default MyButton;