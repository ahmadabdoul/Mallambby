import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Alert } from 'react-native';
import { CustomButton } from './CustomButton'; // assuming you have a custom button component
import constants from '../utils/constants';
import { getAuth } from '../utils/util';

export const TransactionPinInput = ({ visible, onVerify, onClose }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const refs = Array(4).fill(null).map(() => useRef());
  const [loading, setLoading] = useState(false)

  const handleChangeText = (text, index) => {
    if (/^\d$/.test(text) || text === '') {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);
      if (text && index < 3) refs[index + 1].current.focus();
    }
  };

  const confirmPin = () => {
    if (pin.every(digit => digit !== '')) {
      verifyPin(pin.join(''));
    } else {
      Alert.alert("Incomplete PIN", "Please enter all 4 digits.");
    }
  };

  const verifyPin = async (enteredPin) => {
    const user = await getAuth();
    const data = JSON.stringify({ pin: enteredPin, email: user.email });
    setLoading(true)
    try {
      const response = await fetch(constants.url + 'verify-pin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      });
      const responseJson = await response.json();
      setLoading(false)
      if (responseJson.status === 0) onVerify(); // successful verification
      else Alert.alert('Invalid PIN', responseJson.message);
    } catch (error) {
        setLoading(false)
      Alert.alert('Error', 'Network request failed: ' + error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose} // Handle back button press on Android
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Enter 4-Digit Transaction PIN</Text>
          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                ref={refs[index]}
                style={styles.pinBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
              />
            ))}
          </View>
          <View style={styles.buttonContainer}>
          <CustomButton title="Cancel" onPress={onClose} />
            <CustomButton title="Confirm" onPress={confirmPin} loading={loading} />
           
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  pinBox: {
    width: 40,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});
