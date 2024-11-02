import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { colorsVar } from '../utils/colors';

export const PhoneInput = ({ label, placeholder, keyboardType = 'phone-pad', onChangeText }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const sanitizePhoneNumber = (number) => {
    // Replace +234 with 0 if it exists at the beginning
    if (number.startsWith('+234')) {
      number = '0' + number.slice(4);
    }
    // Remove any spaces
    return number.replace(/\s+/g, '');
  };

  const openContacts = async () => {
    try {
      // Request permission to access contacts (only needed on Android)
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        // Open the native contact picker to select a single contact
        const contact = await Contacts.presentContactPickerAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        console.log(contact);
        if (contact && contact.phoneNumbers && contact.phoneNumbers.length > 0) {
          // Get the first available phone number for the selected contact
          const selectedNumber = contact.phoneNumbers[0].number;
          // Sanitize the phone number
          const sanitizedNumber = sanitizePhoneNumber(selectedNumber);
          // Update phone number state and pass it to the parent component's state if onChangeText is provided
          setPhoneNumber(sanitizedNumber);
          onChangeText && onChangeText(sanitizedNumber);
        } else {
          Alert.alert('Selected contact has no phone numbers');
        }
      } else {
        Alert.alert('Permission to access contacts was denied');
      }
    } catch (error) {
      console.error("Failed to open contacts:", error);
      Alert.alert('Failed to open contacts');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={(text) => {
            const sanitizedText = sanitizePhoneNumber(text);
            setPhoneNumber(sanitizedText);
            onChangeText && onChangeText(sanitizedText);
          }}
          value={phoneNumber}
        />
        <TouchableOpacity onPress={openContacts} style={styles.contactIcon}>
          <Text style={{ color: colorsVar.primaryColor }}>Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  contactIcon: {
    padding: 10,
  },
});
