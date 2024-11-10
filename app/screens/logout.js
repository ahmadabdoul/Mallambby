import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colorsVar } from '../utils/colors';
import { deleteAuth } from '../utils/util';
import { useRouter } from 'expo-router';

export default function LogoutScreen({ onLogout }) {
    const router = useRouter()
  // Handle the logout action
  const handleLogout = async() => {
    // You can add additional logout logic here if needed
     await deleteAuth()
     router.replace("../login")
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Are you sure you want to logout?</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: colorsVar.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
