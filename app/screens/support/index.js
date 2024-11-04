import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { colorsVar } from '../../utils/colors';

export default function SupportScreen() {
  const contactSupport = (type) => {
    let url;
    switch (type) {
      case 'whatsapp':
        url = 'https://wa.me/1234567890'; // Replace with actual WhatsApp number
        break;
      case 'email':
        url = 'mailto:support@example.com'; // Replace with actual support email
        break;
      case 'phone':
        url = 'tel:+1234567890'; // Replace with actual support phone number
        break;
      default:
        return;
    }
    
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open the link. Please try again later.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Support</Text>
      <TouchableOpacity style={styles.button} onPress={() => contactSupport('whatsapp')}>
        <Text style={styles.buttonText}>WhatsApp Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => contactSupport('email')}>
        <Text style={styles.buttonText}>Email Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => contactSupport('phone')}>
        <Text style={styles.buttonText}>Phone Support</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorsVar.primaryColor,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colorsVar.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
