import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, TouchableHighlight, Button, Modal, Vibration, StyleSheet} from "react-native";
import {TimeObject} from "./TimeObject";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; // Import useRoute hook for accessing route 
/**
https://stackoverflow.com/questions/72684118/update-parameters-value-between-screens-in-react-native was a big help*/

function IdleTimer(){
	const defaultTime = {hours: '', minutes: '', seconds:''};
	const [userTime, setUserTime] = useState(defaultTime);
	const [lastTime, setLastTime] = useState(defaultTime);
	const navigation = useNavigation();
	const route = useRoute();
	useEffect(() => {
    if (route.params?.userLastTime) {
        setLastTime(route.params.userLastTime);
    }
  }, [route.params?.userLastTime]);

	function handleSetHours(e){
		setUserTime({...userTime, hours: e});
	}
	function handleSetMins(e){
		setUserTime({...userTime, minutes: e});
	}
	function handleSetSecs(e){
		setUserTime({...userTime, seconds: e});
	}
const goToMainTimer = () => {
	navigation.navigate('MainTimer', {
            timeSet: userTime,
          });
    };

	//this will later send stuff to the timer part lol
	function submitTime(){
		goToMainTimer();
	}
	function resetTime(){
		setUserTime(defaultTime);
	}
	function useLastTime(){
		setUserTime(lastTime);
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
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#00DDDD"
  onPress={submitTime}>
  <Text>Submit Time</Text>
</TouchableHighlight>

		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DD00DD"
  onPress={resetTime}>
  <Text>Clear</Text>
</TouchableHighlight>

		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={useLastTime}>
  <Text>Use last time</Text>
</TouchableHighlight>
 

</View>
	);
}

export default IdleTimer;

