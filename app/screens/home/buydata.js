import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { NetworkSelector } from '../../components/NetworkSelector';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';
import { PhoneInput } from '../../components/PhoneInput';
import constants from '../../utils/constants';
import { CheckBox } from '@rneui/themed';
import { colorsVar } from '../../utils/colors';
import { getAuth } from '../../utils/util';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { TransactionPinInput } from '../../components/TransactionPinInput';

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
  const [ported, setPorted] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const router = useRouter();

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
        Alert.alert('Error', 'Network request failed: ' + error);
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

  // Check data type availability
  const checkDataTypeAvailability = () => {
    if (selectedDataType && selectedNetwork) {
      const [id, type] = selectedDataType.split('-');
      const network = networks.find((item) => item.network === selectedNetwork);
      if (network) {
        const statusMap = {
          SME: network.smeStatus,
          Gifting: network.giftingStatus,
          Corporate: network.corporateStatus,
        };

        if (statusMap[type] !== 'On') {
          Alert.alert('Not Available', `The selected ${type} plan is currently unavailable. Please try a different data type.`);
          setSelectedDataType(null);
          return;
        }
      }
    }
  };

  useEffect(() => {
    checkDataTypeAvailability();
  }, [selectedDataType]);

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
    setSelectedPlan(value);
    const plan = filteredPlans.find((p) => p.planid === value);
    setAmount(plan ? plan.userprice.toString() : '');
  };
  const areInputsValid = () => {
    if (!selectedNetwork) {
      Alert.alert('Error', 'Please select a network.');
      return false;
    }
    if (!selectedDataType) {
      Alert.alert('Error', 'Please select a data type.');
      return false;
    }
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a data plan.');
      return false;
    }
    if (!amount) {
      Alert.alert('Error', 'Amount cannot be empty.');
      return false;
    }
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number.');
      return false;
    }
    return true;
  };
  const handleProceed = () => {
    if (!areInputsValid()) return;

    setShowPinInput(true);
  };

  const handleVerifyPinSuccess = async () => {
    setShowPinInput(false);
    setLoading(true);
  
    const user = await getAuth();
    const networkObject = networks.find((network) => network.network === selectedNetwork);
    const networkId = networkObject ? networkObject.networkid : null;

    if (!networkId) {
      Alert.alert("Error", "Network ID not found for the selected network.");
      setLoading(false);
      return;
    }

    const data = JSON.stringify({ 
      email: user.email,
      mobile_number: phoneNumber,
      network: selectedNetwork,
      plan: selectedPlan,
      amount: amount,
      networkId: networkId,
      ported: ported
    });

    try {
      const response = await axios.post(constants.url + "buy-data.php", data, {
        headers: { "Content-Type": "application/json" },
      });
      const responseJson = response.data;

      if (responseJson.status === 0) {
        setLoading(false);
        router.replace({ pathname: "screens/home/success", params: { message: responseJson.message } });
      } else {
        setLoading(false);
        Alert.alert("Failed", responseJson.message);
      }
    } catch (error) {
      Alert.alert("Error", "Network request failed: " + error);
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'} style={{flex: 1}}>
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

          <CheckBox checked={ported} checkedColor={colorsVar.primaryColor} title='Disable Number Validator' onIconPress={() => setPorted(!ported)} />

          <CustomButton title="Proceed" loading={loading} onPress={handleProceed} />
          {showPinInput && (
            <TransactionPinInput
              visible={showPinInput}
              onVerify={handleVerifyPinSuccess}
              onClose={() => setShowPinInput(false)}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
