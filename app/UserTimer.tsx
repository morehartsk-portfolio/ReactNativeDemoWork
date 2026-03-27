import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, Button, Modal, Vibration, StyleSheet} from "react-native";
//turn into two pages??

const UserTimer = () => {
	const [time, setTime] = useState(0);
	const [userHours, setHours] = useState('');
	const [userMins, setMins] = useState('');
	const [userSecs, setSecs] = useState('');
	const [isRunning, setRunning] = useState(false);
	const [isStarted, setStarted] = useState(false);
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
	
	function handleUserTime(){
		
		
		setTime((userHours*3600) + (userMins*60) + (userSecs*1));
	}
	
		function clickStart(){
		interval.current = setInterval(() => {
			setTime((time) => ((time > 0) ? time -1 : time));
		}, 1000);
		setRunning(true);
		setStarted(true);
}
const clickSR = (isReset: boolean) =>{
		clearInterval(interval.current);
		setRunning(false);
	if(isReset){
		setTime(0);
		setHours('');
		setMins('');
		setSecs('');
		setStarted(false);
	}
}


	const RenderButtons =()=>{
		return(<View>
	{isRunning ?
	(<Button onPress={() => clickSR(false)} title="Stop" color = "#110088"></Button>):
	(<>
	<Button onPress={clickStart} title={(isStarted) ? "Resume" : "Start"} color = "#110088"></Button>
<Button onPress={() => clickSR(true)} title="Reset" color = "#110088"></Button>
<Button onPress={handleUserTime} title="Set Time" color = "#110088"></Button>
</>)
	}
	</View>);
	}
	
	return (
	<View>
	<RenderButtons />
	
		<TextInput
		  value={userHours}
          onChangeText={setHours}
          placeholder="HRS"
          keyboardType="numeric"
        />
		<TextInput
		  value={userMins}
          onChangeText={setMins}
          placeholder="MINS"
          keyboardType="numeric"
        />
		<TextInput
		  value={userSecs}
          onChangeText={setSecs}
          placeholder="SECS"
          keyboardType="numeric"
        />
		<Text> {toDisplayFormat(time)} </Text>
 

</View>
	);
}

export default UserTimer;