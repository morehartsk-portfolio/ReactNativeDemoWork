import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, Button, Modal, Vibration, StyleSheet} from "react-native";
import {TimeObject} from "./TimeObject";
import { useNavigation } from '@react-navigation/native';


const IdleTimer = () => {
	const defaultTime = {hours: '', minutes: '', seconds:''};
	const [userTime, setUserTime] = useState(defaultTime);
	const [lastUserTime, setLastUT] = useState(defaultTime);
	const navigation = useNavigation();
	
	function formatTime(digs: number){
		return (digs == "") ? 0 : digs;
	}

	function handleSetHours(e){
		setUserTime({...userTime, hours: e});
	}
	function handleSetMins(e){
		setUserTime({...userTime, minutes: e});
	}
	function handleSetSecs(e){
		setUserTime({...userTime, seconds: e});
	}
	function handleFormatTime(){
		setUserTime({...userTime,
		hours: formatTime(userTime.hours),
		minutes: formatTime(userTime.minutes),
		seconds: formatTime(userTime.seconds)});
	}
const goToMainTimer = () => {
        navigation.navigate('MainTimer', {
            rTime:{
				hours: userTime.hours,
				minutes: userTime.minutes,
				seconds: userTime.seconds
			}, // Pass the current value of 'message' to the 'Message' screen
        });
    };

	//this will later send stuff to the timer part lol
	function submitTime(){
		handleFormatTime();
		setLastUT(userTime);
		goToMainTimer();
	}
	function resetTime(){
		setUserTime(defaultTime);
	}
	function useLastTime(){
		setUserTime(lastUserTime);
	}
	
	return (
	<View>
	
		<TextInput
		  value={userTime.hours}
          onChangeText={handleSetHours}
          placeholder="HRS"
          keyboardType="numeric"
        />
		<TextInput
		  value={userTime.minutes}
          onChangeText={handleSetMins}
          placeholder="MINS"
          keyboardType="numeric"
        />
		<TextInput
		  value={userTime.seconds}
          onChangeText={handleSetSecs}
          placeholder="SECS"
          keyboardType="numeric"
        />
<Button onPress={submitTime} title="Submit time" color = "#110088"></Button>
<Button onPress={resetTime} title="Clear" color = "#110088"></Button>
<Button onPress={useLastTime} title="Use Last Timer" color = "#110088"></Button>
 

</View>
	);
}

export default IdleTimer;