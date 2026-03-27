import React, {useEffect, useRef, useState} from "react";
import {View, Text, TextInput, FlatList, Alert, Button, Modal, StyleSheet} from "react-native";

type ButtonFields = {
	buttonTitle: string;
	buttonFunction: string;
}
const StyleButton = (props: ButtonFields) => {
	return(<Button onPress={props.buttonFunction} title={props.buttonTitle} color = "#110088" style></Button>);
}

