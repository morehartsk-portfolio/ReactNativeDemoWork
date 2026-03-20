//most of this source code comes from Geeks4Geeks, the official React Native documentation. API calls are made from TimeAPI, Sunrise-Sunset.org, and expo-location
import { StatusBar } from "expo-status-bar"; 
import { 
	Button, 
	StyleSheet, 
	Text, 
	View, 
	Share, 
	Alert, 
	Linking, 
} from "react-native"; 
import * as Location from "expo-location"; 
import { useEffect, useState } from "react"; 

export default function MyLocation(){
	const [location, setLocation] = useState(null);
	const [tzid, setTZID] = useState(null);
	const [sunTime, setSunTimes] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
	 
	const fetchLocation = async () => { 
		let {status} = await Location.requestForegroundPermissionsAsync(); 
		if(status !== 'granted'){
			setErrorMsg("Not an octopus");
			return;
		}

		const {coords: {latitude, longitude},} = await Location.getCurrentPositionAsync({});
		setLocation({latitude, longitude});
	};
	
const fetchTZID = async () => {
	console.log("fetching time zone");
	const {timezone} = await fetch(`https://timeapi.io/api/v1/timezone/coordinate?latitude=${location?.latitude}&longitude=${location?.longitude}`).then(response => response.json());
	setTZID(timezone);
};
const fetchTimes = async () => {
	console.log("fetching times");
	const {results: {sunrise, sunset},} = await fetch(`https://api.sunrise-sunset.org/json?lat=${location?.latitude}&lng=${location?.longitude}&tzid=${tzid}`).then(response => response.json());
	setSunTimes({sunrise, sunset});
};
	
useEffect(() => { 
		fetchLocation();
		fetchTZID();
	}, []);
	
	
let t1 = errorMsg ?? "hello";

return ( 
		<View style={styles.container}> 
			<Text style={styles.heading}> 
				Find sunrise/sunset times
			</Text> 
			{location ? ( 
				<View> 
					<Text style={styles.text1}> 
						Latitude: {location?.latitude} 
					</Text> 
					<Text style={styles.text1}> 
						Longitude: {location?.longitude} 
					</Text> 
					<Text style={styles.text1}> 
						Timezone: {tzid} 
					</Text> 
					<Text style={styles.text1}> 
						Sunrise: {sunTime?.sunrise} 
					</Text> 
					<Text style={styles.text1}> 
						Sunset: {sunTime?.sunset} 
					</Text> 
					 <Button onPress={fetchLocation} title="Update location" color = "#110088"></Button>
					 <Button onPress={fetchTimes} title="See sunrise/sunset" color = "#110088"></Button>
				</View> 
			) : ( 
				<Text style={styles.text1}> 
					Loading... 
				</Text> 
			)}  

			<StatusBar style="auto" /> 
		</View> 
	); 
}

const styles = StyleSheet.create({ 
	container: { 
		display: "flex", 
		alignContent: "center", 
		alignItems: "center", 
		justifyContent: "space-evenly", 
		backgroundColor: "#fff", 
		height: "100%", 
	}, 
	heading: { 
		fontSize: 28, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "green", 
		textAlign: "center", 
	}, 
	heading2: { 
		fontSize: 22, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "black", 
		textAlign: "center", 
	}, 
	text1: { 
		fontSize: 16, 
		marginBottom: 10, 
		color: "black", 
		fontWeight: "bold", 
	}, 
});