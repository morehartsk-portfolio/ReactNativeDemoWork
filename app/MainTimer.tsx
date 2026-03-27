import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, Button, Modal, Vibration, StyleSheet} from "react-native";
import {TimeObject} from "./TimeObject";
import { useRoute } from '@react-navigation/native'; // Import useRoute hook for accessing route 
import { useNavigation } from '@react-navigation/native';


const MainTimer = () => {
  const navigation = useNavigation();
  const route = useRoute();
	console.log("Not an octopus: " + route.params.userTime);
	const [time, setTime] = useState((3600) + (60) + (1));
	const [isRunning, setRunning] = useState(false);
	let interval = useRef(null);
	
	function formatTime(digs: number){
		return (digs < 10) ? `0${digs}` : `${digs}`;
	}
	function toDisplayFormat(rawTime:number){
		let rHours = Math.floor(rawTime/3600);
		let rMins = Math.floor((rawTime%3600)/60);
		let rSecs = (rawTime%3600)%60;
		return `${formatTime(rHours)}:${formatTime(rMins)}:${formatTime(rSecs)}`;
	}
	const goToMainTimer = () => {
        navigation.navigate('IdleTimer', {
        });
    };
	
		function clickStart(){
		interval.current = setInterval(() => {
			setTime((time) => ((time > 0) ? time -1 : time));
		}, 1000);
		setRunning(true);
}
const clickSR = (isReset: boolean) =>{
		clearInterval(interval.current);
		setRunning(false);
	if(isReset){
		setTime(0);
		goToMainTimer();
	}
}



	const RenderButtons =()=>{
		return(<View>
	<Button onPress={() => clickSR(false)} title={(isRunning) ? "Stop" : "Resume"} color = "#110088"></Button>
	
	<Button onPress={clickStart} title={(isRunning) ? "Resume" : "Start"} color = "#110088"></Button>
<Button onPress={() => clickSR(true)} title="Reset" color = "#110088"></Button>

	</View>);
	}
	
	return (
	<View>
		<Text> {toDisplayFormat(time)} </Text>
				<Text> {props.hours}:{props.minutes}:{props.seconds} </Text>
	<RenderButtons />
	
 

</View>
	);
}

export default MainTimer;