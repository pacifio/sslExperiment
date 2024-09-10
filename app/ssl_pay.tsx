import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { initSSLPay, PaymentType } from "puthika-universal-api";
import SSLPaymentInitResponse from 'puthika-universal-api/dist/interfaces/ssl_payment';
import { Link } from 'expo-router';

export default function SSLPay() {
  const [sslData, setSslData] = useState<SSLPaymentInitResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initSSLPayment = async () => {
      try {
        const response: SSLPaymentInitResponse = await initSSLPay({
          email: "adibmohsin.root@gmail.com",
          phone: "",
          address: "",
          countryCode: "BD",
          subscriptionId: 1,
          promoId: 0,
          paymentType: PaymentType.daily
        });

        setSslData(response);
        setLoading(false);
      } catch (e) {
        Alert.alert("ssl failed");
        console.error(e);
      }
    }

    initSSLPayment();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Web Browser</Text>
      {
        loading ? <ActivityIndicator /> : <Link href={{
          pathname: "/ssl_browser", params: {
            sslData: JSON.stringify(sslData)
          }
        }}>SSL </Link>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
