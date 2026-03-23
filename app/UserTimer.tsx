import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, Alert, Button, Modal, Vibration} from "react-native";

type MyTime = {
	hours: number;
	minutes: number;
	seconds: number;
};

const UserTimer = (props: MyTime) => {
	const [time, setTime] = useState(0);
	const [userTime, setUserTime] = useState({
		hours:0, minutes:0, seconds: 0
	});
	const [isRunning, setRunning] = useState(false);
	const [isStarted, setStarted] = useState(false);
	let interval = useRef(null);
	const [isOpen, setOpen] = useState(false);
	
	function setUserHours(e){
	setUserTime({...userTime,
	hours: e});
	}
	function setUserMins(e){
	setUserTime({...userTime,
	minutes: e});
	}
	function setUserSecs(e){
	setUserTime({...userTime,
	seconds: e});
	}
	function formatTime(digs: number){
		return (digs < 10) ? `0${digs}` : `${digs}`;
	}
	function toDisplayFormat(rawTime:number){
		let rHours = Math.floor(rawTime/3600);
		let rMins = Math.floor((rawTime%3600)/60);
		let rSecs = (rawTime%3600)%60;
		return `${formatTime(rHours)}:${formatTime(rMins)}:${formatTime(rSecs)}`;
	}
	
	const HandleTimerInput =()=>{
	
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
		setUserTime({hours:0,minutes:0,seconds:0});
		setStarted(false);
	}
}

	return (
	<View>
		{!isRunning ? (
		<>
<Button onPress={clickStart} title={(isStarted) ? "Resume" : "Start"} color = "#110088"></Button>
<Button onPress={() => clickSR(true)} title="Reset" color = "#110088"></Button>
<Button onPress={() => setOpen(true)} title="Set Time" color = "#110088"></Button>
<Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={() => {
			setOpen(!isOpen);
          }}>
          <View>
		  <Text> Enter a time here</Text>
			  <TextInput
          onChangeText={setUserHours}
          value={userTime.hours}
          placeholder="Hours"
          keyboardType="numeric"
        />
		
              <Button
                onPress={() => {
					setTime(userTime.hours*3600 + userTime.minutes*60 + userTime.seconds);
				setOpen(!isOpen)}} title="submit time">
                </Button>
			<Button
                onPress={() => {
				setOpen(!isOpen)}} title="cancel">
                </Button>
          </View>
        </Modal>
	</>
	) : (	
<Button onPress={() => clickSR(false)} title="Stop" color = "#110088"></Button>
		)}

</View>
	);
}
	
	return (
	<View>
<Text> {toDisplayFormat(time)} </Text>
<HandleTimerInput />
</View>
	);
}

export default UserTimer;