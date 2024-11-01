import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const InputField = ({ label, placeholder, editable=true, value='',  keyboardType = 'default', onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
    />
  </View>
);

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});
