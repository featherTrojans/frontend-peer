import React from "react";
import { useContext, useRef } from "react";
import WebView from "react-native-webview";
import { AuthContext } from "../../context/AuthContext";

const CustomWebView = ({ navigation, route }) => {
  const { authdata, messageToken } = useContext(AuthContext);

  const webviewRef = useRef<WebView>(null);
  const { url, reference, amount } = route.params;
  const callback_url = `https://featherwebview.com/?trxref=${reference}&reference=${reference}`;
  const onNavigationStateChange = (state: any) => {
    // console.log(state);
    const { url } = state;
    if (!url) return;
    if (url === callback_url) {
      webviewRef.current?.stopLoading();
      navigation.navigate("Home");
    }
  };
  return (
    <WebView
      ref={webviewRef}
      source={{ uri: url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

export default CustomWebView;
