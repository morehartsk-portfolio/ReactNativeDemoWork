import React, {useRef, useState} from "react";
import {View, Text, TextInput, Alert, Button, Modal} from "react-native";

function MyTime(hours: number, minutes: number, seconds: number){
	this.hours = hours;
	this.minutes = minutes;
	this.seconds = seconds;
} //change useStates to refs when constantly rendering
const MyTimer = () => {
	const [time, setTime] = useState(0);
	const [userTime, setUserTime] = useState(0);
	let interval = useRef(null);
	const [isRunning, setRunning] = useState(false);
	const [isStarted, setStarted] = useState(false);
	const [isOpen, setOpen] = useState(false);
	
	function clickStart(){
		interval.current = setInterval(() => {
			setTime((time) => ((time > 0) ? time-1 : time));
		}, 1000);
		setRunning(true);
		setStarted(true);
}
const clickSR = (isReset: boolean) =>{
		clearInterval(interval.current);
		setRunning(false);
	if(isReset){
		setTime(0);
		setStarted(false);
	}
}

	return (
	<View>
	<Text> Time: {time}</Text>
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
              <Text>What's up?</Text>
			  <TextInput
          onChangeText={setTime}
          value={userTime}
          placeholder="enter time here"
          keyboardType="numeric"
        />
		
              <Button
                onPress={setTime} title="submit time">
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

export default MyTimer;