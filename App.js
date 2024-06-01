import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import CryptoJS from 'crypto-js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentWebView from './Components/PaymentWebView';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [merchantReference, setMerchantReference] = useState('');
  const [amount, setAmount] = useState('');

  const cleanedMerchantReference = merchantReference.replace(/\s+/g, '');

  const handleSubmit = async () => {
    if (merchantReference.trim() === '' && amount.trim() === '') {
      Alert.alert('Error', 'Please enter Fields');
    } else if (merchantReference.trim() !== '' && amount.trim() !== '') {

      // Step 1: Prepare request parameters
      const requestParams = {
        command: 'AUTHORIZATION',
        access_code: 'WDcLfXauXZOB45rFtedL',
        merchant_identifier: 'VGbcpfWr',
        merchant_reference: cleanedMerchantReference,
        amount: amount,
        currency: 'USD',
        language: 'en',
        customer_email: 'test@payfort.com',
        order_description: 'iPhone 6-S',
      };

      // Step 2: Sorting the array
      const sortedKeys = Object.keys(requestParams).sort();
      let shaString = '';
      sortedKeys.forEach((key) => {
        shaString += `${key}=${requestParams[key]}`;
      });

      // Step 3: Adding the SHA request passphrase
      shaString = '83cyW4wm7dkDWPph6En4AN#(' + shaString + '83cyW4wm7dkDWPph6En4AN#(';

      // Step 4: Encryption
      const signature = CryptoJS.SHA256(shaString).toString(CryptoJS.enc.Hex);

      // Step 5: Navigate to WebView for payment
      navigation.navigate('PaymentWebView', {
        url: 'https://sbcheckout.payfort.com/FortAPI/paymentPage',
        params: {
          ...requestParams,
          signature: signature
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Merchant Name:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Merchant Name'
          value={merchantReference}
          onChangeText={setMerchantReference}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Amount'
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
        />
      </View>
      <Button title="Pay Now" onPress={handleSubmit} color="#1E90FF" />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    width: '100%',
  },
});

export default App;
