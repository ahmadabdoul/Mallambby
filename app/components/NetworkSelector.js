import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const networks = [
  { name: 'MTN', icon: require('../../assets/mtn.png') },
  { name: 'GLO', icon: require('../../assets/glo.png') },
  { name: 'AIRTEL', icon: require('../../assets/airtel.png') },
  { name: '9MOBILE', icon: require('../../assets/9mobile.png') },
];

export const NetworkSelector = ({ onSelect }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  const handleSelect = (networkName) => {
    setSelectedNetwork(networkName);
    onSelect(networkName);
  };

  return (
    <View style={styles.networkContainer}>
      {networks.map((network) => (
        <TouchableOpacity key={network.name} onPress={() => handleSelect(network.name)}>
          <View style={[
            styles.networkItem,
            selectedNetwork === network.name && styles.selectedNetworkItem
          ]}>
            <Image source={network.icon} style={styles.networkIcon} />
            <Text>{network.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
    padding: 5,
    borderRadius: 10,
  },
  selectedNetworkItem: {
    borderWidth: 2,
    borderColor: '#FF007F', // Adjust the color as needed
  },
  networkIcon: {
    width: 50,
    height: 50,
  },
});
