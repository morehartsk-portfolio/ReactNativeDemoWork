import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, Button, Modal, Vibration} from "react-native";


const UserTimer = () => {
	const [time, setTime] = useState(0);
	const [userHours, setHours] = useState('');
	const [userMins, setMins] = useState('');
	const [userSecs, setSecs] = useState('');
	const [isRunning, setRunning] = useState(false);
	const [isStarted, setStarted] = useState(false);
	const [hasTime, setHasTime] = useState(false);
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
		setHasTime(true);
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
		setHasTime(false);
	}
}

	
	
	return (
	<View>
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
<Button disabled={isRunning || !hasTime} onPress={clickStart} title={(isStarted) ? "Resume" : "Start"} color = "#110088"></Button>
<Button disabled={isRunning || !hasTime} onPress={() => clickSR(true)} title="Reset" color = "#110088"></Button>
<Button disabled={isRunning || isStarted} onPress={handleUserTime} title="Set Time" color = "#110088"></Button>

<Button  disabled={!isRunning} onPress={() => clickSR(false)} title="Stop" color = "#110088"></Button>

</View>
	);
}

export default UserTimer;