import { View, Text } from 'react-native'
import React from 'react'
import SSLPaymentBrowser from '@/components/SSLPaymentBrowser'
import { useLocalSearchParams, useRouter } from "expo-router";
import SSLPaymentInitResponse from 'puthika-universal-api/dist/interfaces/ssl_payment';

const SSLBrowser = () => {
  const router = useRouter();
  const { sslData } = useLocalSearchParams();

  if (!sslData) return <View />

  const parsedData = JSON.parse(sslData as string);

  return <SSLPaymentBrowser sslData={parsedData as SSLPaymentInitResponse} handleResult={(result) => {
    router.back();
  }} />
}

export default SSLBrowser