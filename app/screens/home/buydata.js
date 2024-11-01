import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { NetworkSelector } from '../../components/NetworkSelector';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';
import { PhoneInput } from '../../components/PhoneInput';
import constants from '../../utils/constants';

export default function BuyDataScreen() {
  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [dataTypes, setDataTypes] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState(null);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch network data from API
    const fetchNetworks = async () => {
      try {
        const response = await fetch(constants.url + 'fetch-networks.php');
        const json = await response.json();
        if (json.status === 0) {
          setNetworks(json.data);
        } else {
          Alert.alert('Error', 'Failed to fetch networks');
        }
      } catch (error) {
        Alert.alert('Error', 'Network request failed');
      }
    };

    fetchNetworks();
  }, []);

  useEffect(() => {
    // Update data types based on the selected network
    if (selectedNetwork) {
      const network = networks.find((item) => item.network === selectedNetwork);
      if (network) {
        const types = [];

        if (network.smeStatus === 'On') types.push({ label: 'SME', value: `${network.smeId}-SME` });
        if (network.giftingStatus === 'On') types.push({ label: 'Gifting', value: `${network.giftingId}-Gifting` });
        if (network.corporateStatus === 'On') types.push({ label: 'Corporate', value: `${network.corporateId}-Corporate` });

        setDataTypes(types);
        setSelectedDataType(types[0]?.value || null); // Default to the first available data type
      }
    } else {
      setDataTypes([]); // Reset data types if no network is selected
      setSelectedDataType(null);
    }
  }, [selectedNetwork, networks]);

  const handleDataTypeChange = (value) => {
    setSelectedDataType(value);

    // Extract original ID if needed for further processing
    const [id, type] = value.split('-');
    console.log('Selected ID:', id); // For further processing based on ID
    console.log('Selected Type:', type);
    console.log(value)
  };

  const handleProceed = () => {
    setLoading(true);
    // Perform proceed action here
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Select Network:</Text>
      <NetworkSelector onSelect={setSelectedNetwork} />

      <Text>Select Data Type:</Text>
      <Picker
        selectedValue={selectedDataType}
        onValueChange={handleDataTypeChange}
        enabled={dataTypes.length > 0}
      >
        <Picker.Item label="Select Data Type" value={null} />
        {dataTypes.map((type) => (
          <Picker.Item key={type.value} label={type.label} value={type.value} />
        ))}
      </Picker>

      <InputField
        label="Amount"
        placeholder="Enter amount"
        keyboardType="numeric"
        onChangeText={setAmount}
      />

      <PhoneInput
        label="Phone Number"
        placeholder="Enter one mobile number per line or separate with commas"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
      />
     
      <CustomButton title="Proceed" loading={loading} onPress={handleProceed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
