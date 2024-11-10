import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export default function HelpCenterScreen() {
  // Function to open URLs in the browser
  const openURL = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openURL('https://wa.me/+2348062278474')} // WhatsApp URL
      >
        <FontAwesome name="whatsapp" size={24} color="black" />
        <Text style={styles.buttonText}>WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => openURL('https://malambby.com.ng')} // Website URL
      >
        <Feather name="globe" size={24} color="black" />
        <Text style={styles.buttonText}>Website</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('facebook')} // Facebook URL
      >
        <FontAwesome name="facebook" size={24} color="black" />
        <Text style={styles.buttonText}>Facebook</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => openURL('https://twitter.com/your-profile')} // Twitter URL
      >
        <FontAwesome name="twitter" size={24} color="black" />
        <Text style={styles.buttonText}>Twitter</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => openURL('https://instagram.com/your-profile')} // Instagram URL
      >
        <FontAwesome name="instagram" size={24} color="black" />
        <Text style={styles.buttonText}>Instagram</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'black',
  },
});
