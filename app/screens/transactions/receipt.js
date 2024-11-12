import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { colorsVar } from '../../utils/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';

const TransactionReceipt = () => {
  const viewRef = useRef();
  const router = useRouter();
  const transaction = useLocalSearchParams();

  const handleShare = async () => {
    try {
      // Capture the view as an image
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
  
      // Directly share the captured image URI using Expo's Sharing API
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Share Transaction Receipt',
        UTI: 'public.png',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the receipt. Please screenshot and share');
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <ViewShot ref={viewRef} style={styles.receiptContainer}>
        {/* Logo at the top */}
        <Image source={require('../../../assets/logo1.png')} style={styles.logo} />

        {/* Title */}
        <Text style={styles.receiptTitle}>Transaction Receipt</Text>

        {/* Transaction Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Transaction ID:</Text>
          <Text style={styles.detailValue}>{transaction.tId}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Service:</Text>
          <Text style={styles.detailValue}>{transaction.servicename}</Text>
        </View>
        <View style={[styles.detailsContainer, styles.wrapContainer]}>
          <Text style={styles.detailLabel}>Description:</Text>
          <Text style={styles.detailValue} numberOfLines={null}>{transaction.servicedesc}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>N{transaction.amount}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Old Balance:</Text>
          <Text style={styles.detailValue}>N{transaction.oldbal}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>New Balance:</Text>
          <Text style={styles.detailValue}>N{transaction.newbal}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Profit:</Text>
          <Text style={styles.detailValue}>N{transaction.profit}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{new Date(transaction.date).toDateString()}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, { color: transaction.status === '0' ? 'green' : 'red' }]}>
            {transaction.status === '0' ? 'Success' : 'Failed'}
          </Text>
        </View>
      </ViewShot>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colorsVar.background,
  },
  receiptContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust as needed
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  wrapContainer: {
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    maxWidth: '40%', // Adjust to control label space
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    maxWidth: '60%', // Allow wrapping within the container space
  },
  shareButton: {
    backgroundColor: colorsVar.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
