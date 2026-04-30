import React, {useEffect, useRef, useState} from "react";
import {View, Platform, Text, TextInput, FlatList, Alert, TouchableHighlight, Button, Modal, Vibration, StyleSheet} from "react-native";
import {TimeObject} from "./TimeObject";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; // Import useRoute hook for accessing route 
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
https://stackoverflow.com/questions/72684118/update-parameters-value-between-screens-in-react-native was a big help*/

function IdleTimer(){
		const [userTime, setUserTime] = useState('');
		const [octopus, setOctopus] = useState('Not an octopus');
	const [isPreset, setPresetTime] = useState(false);
	const navigation = useNavigation();
	const route = useRoute();
	
const storeTime = async (value) => {
  try {
    await AsyncStorage.setItem('lastUserTime', value);
  } catch (e) {
    // saving error
	
  }
};

const getTime = async () => {
  try {
    const value = await AsyncStorage.getItem('lastUserTime');
	console.log(value);
	setUserTime(value);
	setOctopus("Octopus");
  } catch (e) {
	  setUserTime("Not an octopus");
	  
    // error reading value
  }
};

const goToMainTimer = () => {
	navigation.navigate('MainTimer', {
            timeSet: userTime,
          });
    };


	//this will later send stuff to the timer part lol
	function submitTime(){
		if(userTime >= 5 && userTime <= 60){
			storeTime(userTime);
		goToMainTimer();
		}else{
			resetTime();
		}
	}
	function resetTime(){
		setUserTime('');
	}
	function useLastTime(){
		getTime();
	}
	function handlePresetTime(){
		setPresetTime(!isPreset);
	}
	
	function PresetTimes(){
		return (isPreset ?
		<>
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => setUserTime('5')}>
  <Text>5 MIN</Text>
</TouchableHighlight>
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => setUserTime('30')}>
  <Text>30 MIN</Text>
</TouchableHighlight>
		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDD00"
  onPress={() => setUserTime('60')}>
  <Text>1 HR</Text>
</TouchableHighlight>
		</> : null);
	}
	
	return (
	<View>
	
		<TextInput
		  value={userTime}
          onChangeText={setUserTime}
          placeholder="Please enter a number between 5 and 60"
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

		<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#EEDD00"
  onPress={handlePresetTime}>
  <Text>Use Preset Time</Text>
</TouchableHighlight>
<PresetTimes />
 <Text> You are using: {Platform.OS}</Text>
 <Text> Your last time was {octopus} </Text>

</View>
	);
}

export default IdleTimer;

