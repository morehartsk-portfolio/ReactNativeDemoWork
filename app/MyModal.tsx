import React, {useState} from "react";
import {View, Text, Modal, Button} from "react-native";

type ButtonProps = {
	myTitle: string;
	myColor: string;
}

const MyModal = (props: ButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	function clickBehavior(){
		setIsOpen(true);
}
	return (
	<View>
<Button onPress={clickBehavior} title={props.myTitle} color = {props.myColor}></Button>
<Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={() => {
            setIsOpen(!isOpen);
          }}>
          <View>
              <Text>What's up?</Text>
			  
              <Button
                onPress={() => setIsOpen(!isOpen)} title="Hide Modal">
                </Button>
          </View>
        </Modal>
</View>
	);
}

export default MyModal;