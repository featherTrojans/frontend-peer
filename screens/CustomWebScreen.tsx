import { useCallback, useContext, useRef } from "react";
import WebView from "react-native-webview";

// import { usePushNotification } from "../../navigation";
import { AuthContext } from "../context/AuthContext";

const CustomWebScreen = ({ navigation, route }) => {
  //   const { sendPushNotification } = usePushNotification();
  const { authdata, messageToken } = useContext(AuthContext);

  const webviewRef = useRef(null);
  const { url, reference, amount } = route.params;
  const callback_url = `https://featherwebview.com/?trxref=${reference}&reference=${reference}`;
  const onNavigationStateChange = (state: any) => {
    const { url } = state;
    if (!url) return;
    if (url === callback_url) {
      // sendPushNotification(
      //   messageToken,
      //   "Wallet Funding",
      //   `Congrats🎉, You just funded your wallet with N${amount}`,
      //   "Root"
      // );

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

export default CustomWebScreen;
