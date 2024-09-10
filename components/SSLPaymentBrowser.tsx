import React from 'react';
import { StyleSheet, View } from 'react-native';
import SSLPaymentInitResponse from 'puthika-universal-api/dist/interfaces/ssl_payment';
import WebView from 'react-native-webview';

interface SSLPaymentBrowserProps {
  sslData: SSLPaymentInitResponse | null,
  handleResult(result: string): void
}

export default function SSLPaymentBrowser({ sslData, handleResult }: SSLPaymentBrowserProps) {
  const handleUrlChange = ({ url }: { url: string }) => {
    if (!sslData) return;
    if (url.startsWith(sslData?.success_url)) {
      handleResult("success");
    } else if (url.startsWith(sslData.cancel_url)) {
      handleResult("cancel");
    } else if (url.startsWith(sslData.fail_url)) {
      handleResult("failed");
    }
  }

  if (!sslData) return <View />

  return (
    <WebView style={styles.container} source={{ uri: sslData?.gateway_url }} onNavigationStateChange={handleUrlChange} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
