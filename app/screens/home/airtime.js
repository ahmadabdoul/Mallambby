import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { NetworkSelector } from '../../components/NetworkSelector';
import { InputField } from '../../components/InputField';

import { CustomButton } from '../../components/CustomButton';
import { PhoneInput } from '../../components/PhoneInput';

export default function BuyAirtimeScreen() {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  return (
    <View style={styles.container}>
      <NetworkSelector onSelect={setSelectedNetwork} />
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
     
      <CustomButton title="Proceed" loading={loading} onPress={() => setLoading(true)} />
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
