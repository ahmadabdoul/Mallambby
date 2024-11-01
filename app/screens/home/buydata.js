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
  const [plans, setPlans] = useState([]); 
  const [filteredPlans, setFilteredPlans] = useState([]); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    if (selectedNetwork) {
      const network = networks.find((item) => item.network === selectedNetwork);
      if (network) {
        const types = [];
        if (network.smeStatus === 'On') types.push({ label: 'SME', value: `${network.smeId}-SME` });
        if (network.giftingStatus === 'On') types.push({ label: 'Gifting', value: `${network.giftingId}-Gifting` });
        if (network.corporateStatus === 'On') types.push({ label: 'Corporate', value: `${network.corporateId}-Corporate` });

        setDataTypes(types);
      }
    } else {
      setDataTypes([]);
      setSelectedDataType(null);
    }
  }, [selectedNetwork, networks]);

  useEffect(() => {
    const handleDataTypeChange = async () => {
      if (!selectedDataType) return;
      
      const [id, type] = selectedDataType.split('-');
      try {
        const response = await fetch(constants.url + 'fetch-data-plans.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ network: id }),
        });
        const responseJson = await response.json();
        if (responseJson.status === 0) {
          setPlans(responseJson.data);
          const newFilteredPlans = responseJson.data.filter(plan => plan.type === type);
          setFilteredPlans(newFilteredPlans);
          setSelectedPlan(null);
          console.log("Filtered Plans:", newFilteredPlans); // Log filtered plans for debugging
        } else {
          Alert.alert('Error', 'Failed to fetch data plans');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data plans ' + error);
      }
    };
    handleDataTypeChange();
  }, [selectedDataType]);

  const handlePlanChange = (value) => {
    console.log("Selected Plan ID:", value); // Log selected plan ID for debugging
    setSelectedPlan(value);
    const plan = filteredPlans.find((p) => p.planid === value);
    if (plan) {
      console.log("Selected Plan Price:", plan.userprice); // Log selected plan price for debugging
      setAmount(plan.userprice.toString());
    } else {
      setAmount('');
    }
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
        onValueChange={setSelectedDataType}
        enabled={dataTypes.length > 0}
      >
        <Picker.Item label="Select Data Type" value={null} />
        {dataTypes.map((type) => (
          <Picker.Item key={type.value} label={type.label} value={type.value} />
        ))}
      </Picker>

      <Text>Select Data Plan:</Text>
      <Picker
        selectedValue={selectedPlan}
        onValueChange={handlePlanChange}
        enabled={filteredPlans.length > 0}
      >
        <Picker.Item label="Select Data Plan" value={null} />
        {filteredPlans.map((plan) => (
          <Picker.Item key={plan.planid} label={`${plan.name} ${plan.type} - ${plan.userprice} (${plan.day} days)`} value={plan.planid} />
        ))}
      </Picker>

      <InputField
        label="Amount"
        placeholder="Enter amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={(value) => setAmount(value)}
        editable={false}
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
