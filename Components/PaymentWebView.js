import React from 'react';
import { WebView } from 'react-native-webview';

const PaymentWebView = ({ route }) => {
  const { url, params } = route.params;

  const generateFormHTML = (url, params) => {
    const inputs = Object.keys(params).map(key => {
      return `<input type="hidden" name="${key}" value="${params[key]}" />`;
    }).join('');

    return `
      <html>
      <body>
        <form id="paymentForm" action="${url}" method="post">
          ${inputs}
        </form>
        <script type="text/javascript">
          document.getElementById('paymentForm').submit();
        </script>
      </body>
      </html>
    `;
  };

  const htmlContent = generateFormHTML(url, params);

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
    />
  );
};

export default PaymentWebView;
