import { Button, ButtonGroup } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colorsVar } from '../utils/colors';

export const CustomButton = ({ title, onPress, loading }) => (
    <Button onPress={onPress} buttonStyle={styles.button} loading={loading} title={title} />

  
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorsVar.primaryColor,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
