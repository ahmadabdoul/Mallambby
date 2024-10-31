import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const networks = [
  { name: 'MTN', icon: require('../assets/mtn.png') },
  { name: 'GLO', icon: require('../assets/glo.png') },
  { name: 'AIRTEL', icon: require('../assets/airtel.png') },
  { name: '9MOBILE', icon: require('../assets/9mobile.png') },
];

export const NetworkSelector = ({ onSelect }) => (
  <View style={styles.networkContainer}>
    {networks.map((network) => (
      <TouchableOpacity key={network.name} onPress={() => onSelect(network.name)}>
        <View style={styles.networkItem}>
          <Image source={network.icon} style={styles.networkIcon} />
          <Text>{network.name}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  networkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  networkItem: {
    alignItems: 'center',
  },
  networkIcon: {
    width: 50,
    height: 50,
  },
});
