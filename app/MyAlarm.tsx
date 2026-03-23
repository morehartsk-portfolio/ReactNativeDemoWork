import React, {useRef, useState} from "react";
import {View, Text, Alert, Button} from "react-native";

const MyAlarm = () => {
	const [time, setTime] = useState(0);
	let interval = useRef(null);
	const [isRunning, setIsRunning] = useState(false);
	function clickStart(){
		interval.current = setInterval(() => {
			setTime((time) => (time+1));
		}, 1000);
		setIsRunning(true);
}
const clickSR = (isReset: boolean) =>{
	if(isReset){
		setTime(0);
	}
		clearInterval(interval.current);
		setIsRunning(false);
}

	return (
	<View>
	<Text> Count: {time}</Text>
		{!isRunning ? (
		<>
<Button onPress={clickStart} title={(time != 0) ? "Resume" : "Start"} color = "#110088"></Button>
<Button onPress={() => clickSR(true)} title="Reset" color = "#110088"></Button>
	</>
	) : (	
<Button onPress={() => clickSR(false)} title="Stop" color = "#110088"></Button>
		)}

</View>
	);
}

export default MyAlarm;