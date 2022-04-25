import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Vibration } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Accelerometer } from 'expo-sensors';
import { Audio } from "expo-av";
import bottle_sound from "C:/Users/Aspir/Desktop/GitHub/2021p4web-react-native-app-FilipMargitai/SensorsApp/SensorsApp/assets/bottle_sound.mp3";

const Flaska = props => {
	const [subscription, setSubscription] = useState(null);
  const [rotation, setRotation] = useState(90);

	const sensibility = 1.5;

	const _subscribe = () => {
		Accelerometer.setUpdateInterval(300);

		setSubscription(
			Accelerometer.addListener(accelerometerData => {
				const acc = accelerometerData;
				const acceleration = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);

				if (acceleration >= sensibility) {
					onShake(acceleration);
				}
			})
		);
	};

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};
	

	const onShake = (acceleration) => {
    Vibration.vibrate();
    setRotation(Math.random() * 360);
    playSound();
	}

  async function playSound()
  {
    const { sound } = await Audio.Sound.createAsync(bottle_sound);
		await sound.playAsync();
  }

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);
  
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={ {width: 250, height: 350, resizeMode: 'stretch',transform: [{ rotate: `${rotation}deg` }]}} 
            source={require('C:/Users/Aspir/Desktop/GitHub/2021p4web-react-native-app-FilipMargitai/SensorsApp/SensorsApp/assets/flaska.png')} />
        </SafeAreaView>
    );
}


// const styles = StyleSheet.create({
//     Image: {
//         width: 250,
//         height: 350,
//         resizeMode: 'stretch',
//         transform: [{ rotate: '90deg' }],
//     }
//   });

export default Flaska;