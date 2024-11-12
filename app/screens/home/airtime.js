import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { NetworkSelector } from '../../components/NetworkSelector';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';
import { PhoneInput } from '../../components/PhoneInput';
import constants from '../../utils/constants';
import { colorsVar } from '../../utils/colors';
import { getAuth } from '../../utils/util';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { CheckBox } from '@rneui/themed';
import { TransactionPinInput } from '../../components/TransactionPinInput';

export default function BuyAirtimeScreen() {
  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [airtimeType, setAirtimeType] = useState('VTU');
  const [amount, setAmount] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState(''); 
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
        Alert.alert('Error', 'Network request failed ' + error);
      }
    };
    fetchNetworks();
  }, []);

  useEffect(() => {
    // Calculate the discounted amount (1% discount)
    const discount = amount ? (parseFloat(amount) * 0.01).toFixed(2) : '0';
    setDiscountedAmount((parseFloat(amount) - parseFloat(discount)).toFixed(2));
  }, [amount]);

  // Check airtime type availability
  const checkAirtimeTypeAvailability = () => {
    if (selectedNetwork && airtimeType) {
      const network = networks.find((item) => item.network === selectedNetwork);
      if (network) {
        const isAirtimeTypeAvailable = (airtimeType === 'VTU' && network.vtuStatus === 'On') ||
                                       (airtimeType === 'Share And Sell' && network.shareAndSellStatus === 'On');

        if (!isAirtimeTypeAvailable) {
          Alert.alert(
            'Not Available',
            `The selected ${airtimeType} type is currently unavailable. Please try a different airtime type.`
          );
          setAirtimeType(''); // Reset the airtime type selection
          return;
        }
      }
    }
  };

  useEffect(() => {
    checkAirtimeTypeAvailability();
  }, [selectedNetwork, airtimeType]);

  const areInputsValid = () => {
    if (!selectedNetwork) {
      Alert.alert('Error', 'Please select a network.');
      return false;
    }
    if (!airtimeType) {
      Alert.alert('Error', 'Please select an airtime type.');
      return false;
    }
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount.');
      return false;
    }
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number.');
      return false;
    }
    return true;
  };

  const handleProceed = async () => {
    if (!areInputsValid()) return;
    checkAirtimeTypeAvailability(); // Double-check before proceeding
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
      type: airtimeType,
      amount: amount,
      ported: ported,
      discounted: discountedAmount,
      networkId: networkId
    });

    try {
      const response = await axios.post(constants.url + "buy-airtime.php", data, {
        headers: {
          "Content-Type": "application/json",
        },
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
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'} style={{flex: 1}}>
  
    <View style={styles.container}>
      <Text>Select Network:</Text>
      <NetworkSelector onSelect={setSelectedNetwork} />

      <Text>Select Airtime Type:</Text>
      <Picker
        selectedValue={airtimeType}
        onValueChange={setAirtimeType}
      >
        <Picker.Item label="Select Airtime Type" value="" />
        <Picker.Item label="VTU" value="VTU" />
        <Picker.Item label="Share And Sell" value="Share And Sell" />
      </Picker>

      <InputField
        label="Amount"
        placeholder="Enter amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={(value) => setAmount(value)}
      />

      <Text>Amount to Pay (After Discount): {discountedAmount}</Text>

      <PhoneInput
        label="Phone Number"
        placeholder="Enter phone number"
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
