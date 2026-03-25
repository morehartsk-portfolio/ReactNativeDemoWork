import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, Alert, Button, Modal, Vibration} from "react-native";


const MyInputAgain = () => {
	const [userHours, setHours] = useState(0);
	const [userMins, setMins] = useState(0);
	const [userSecs, setSecs] = useState(0);
	const [displayTime, setDisplayTime] = useState(null);
	function formatDigits(toFormat: number){
		return (toFormat < 10) ? `0${toFormat}` : `${toFormat}`;
	}
	function handleDisplay(){
		setDisplayTime(`${formatDigits(userHours)}:${formatDigits(userMins)}:${formatDigits(userSecs)}`);
	}
	return (
	<View>
		<TextInput
		
		  onChangeText={setHours}
          placeholder="HRS"
          keyboardType="numeric"
        />
		<TextInput
		  onChangeText={setMins}
          placeholder="MINS"
          keyboardType="numeric"
        />
		<TextInput
		  onChangeText={setSecs}
          placeholder="SECS"
          keyboardType="numeric"
        />
		
<Button onPress={handleDisplay} title="Submit time" color = "#110088"></Button>
<Text>{displayTime}</Text>

</View>
	);
}


export default MyInputAgain;