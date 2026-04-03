import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, TouchableHighlight, Button, Modal, Vibration, StyleSheet} from "react-native";
import {TimeObject} from "./TimeObject";
import { useRoute } from '@react-navigation/native'; // Import useRoute hook for accessing route 
import { useNavigation } from '@react-navigation/native';


const TestTimer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {timeSet, message} = route.params;
  let currTimerSet = (3600*timeSet.hours) + (60*timeSet.minutes) + (1*timeSet.seconds);
	const [time, setTime] = useState(currTimerSet);
	const [isRunning, setRunning] = useState(false);
	const [isStarted, setStarting] = useState(false);
const [buttonText, setButtonText] = useState("Start");
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
	const goToIdleTimer = () => {
        navigation.navigate('IdleTimer', {
			lastTime: timeSet,
        });
    };
	
		function clickStart(){
		interval.current = setInterval(() => {
			setTime((time) => ((time > 0) ? time -1 : time));
		}, 1000);
		setRunning(true);
		setStarting(true);
		setButtonText("Stop");
			
}

const clickSR = (isReset: boolean) =>{
		clearInterval(interval.current);
		setRunning(false);
		setButtonText("Resume");
	if(isReset){
		setTime(currTimerSet);
		setStarting(false);
	}
}



function handleStartClick(){
	if(isRunning){
		clickSR(false);
	}else{
		clickStart();
	}
	
}



	return (
	<View>
		<Text> {toDisplayFormat(time)} </Text>
	<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={handleStartClick}>
  <Text>{buttonText}</Text>
</TouchableHighlight>
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => clickSR(true)}>
  <Text>Reset</Text>
</TouchableHighlight>
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => goToIdleTimer()}>
  <Text>Edit Timer</Text>
</TouchableHighlight>
	
 

</View>
	);
}

export default TestTimer;