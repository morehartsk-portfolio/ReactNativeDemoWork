import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, TouchableHighlight, Button, Modal, Vibration, StyleSheet} from "react-native";
import {TimeObject} from "./TimeObject";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; // Import useRoute hook for accessing route 


function MainTimer(){
	const navigation = useNavigation();
	const route = useRoute();
  const {timeSet} = route.params;
  let currTimerSet = 60*convertDigit(timeSet);
	const [time, setTime] = useState(currTimerSet);
	const [isRunning, setRunning] = useState(true);
	const [hasReset, setResetFlag] = useState(false);
		
	function formatTime(digs: number){
		return (digs < 10) ? `0${digs}` : `${digs}`;
	}	
	function convertDigit(digs: number){
		return (isNaN(digs)) ? 0 : digs;
	}
	function toDisplayFormat(rawTime:number){
		let rHours = Math.floor(rawTime/3600);
		let rMins = Math.floor((rawTime%3600)/60);
		let rSecs = (rawTime%3600)%60;
		return `${formatTime(rHours)}:${formatTime(rMins)}:${formatTime(rSecs)}`;
	}
	const goToIdleTimer = () => {
        navigation.navigate('IdleTimer', {

        });
    };
	
	const toggleTimer = () => {
		setRunning(!isRunning);
		setResetFlag(false);
	}


const clickSR = () =>{
		setTime(currTimerSet);
		setResetFlag(true);
}


function handleButtonText(){
	if(isRunning){
		return "Stop";
	}else{
		return (hasReset) ? "Start" : "Resume";
		
	}
	
}
function HandleButtonDisplay(){
	return (!isRunning ?
		<>
				<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => clickSR()}>
  <Text>Reset</Text>
</TouchableHighlight>
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => goToIdleTimer()}>
  <Text>Edit Timer</Text>
</TouchableHighlight>
		</> : null);
}

useEffect(() => {
    let interval = null;
    if (isRunning) {
		
      interval = setInterval(() => {
        setTime(time => ((time > 0) ? time - 1 : time));
      }, 1000);
    }else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

	return (
	<View>
		<Text> {toDisplayFormat(time)} </Text>
	<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={toggleTimer}>
  <Text>{handleButtonText()}</Text>
</TouchableHighlight>
	<HandleButtonDisplay />
 

</View>
	);
}

export default MainTimer;