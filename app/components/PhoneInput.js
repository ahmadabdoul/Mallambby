import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { colorsVar } from '../utils/colors';

export const PhoneInput = ({ label, placeholder, keyboardType = 'phone-pad', onChangeText }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const openContacts = async () => {
    try {
      // Request permission to access contacts
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        // Retrieve contacts with phone numbers
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // Filter contacts with at least one phone number
          const contactsWithNumbers = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0);

          if (contactsWithNumbers.length > 0) {
            const firstContact = contactsWithNumbers[0];
            const selectedNumber = firstContact.phoneNumbers[0].number;

            // Update phone number state and parent component's state (if onChangeText is provided)
            setPhoneNumber(selectedNumber);
            onChangeText && onChangeText(selectedNumber);
          } else {
            Alert.alert('No contacts found with phone numbers');
          }
        } else {
          Alert.alert('No contacts found');
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
            setPhoneNumber(text);
            onChangeText && onChangeText(text);
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
