import { CheckBox } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colorsVar } from '../app/utils/colors';

export const Checkbox = ({ label, isChecked, onToggle }) => (
    <View style={styles.checkboxContainer}>
        <CheckBox checked={isChecked} onPress={onToggle} title={label} checkedColor={colorsVar.primaryColor} />
    </View>
  
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
});
