import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
// import { useToast } from "react-native-toast-notifications";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  Backheader,
  Bottombtn,
  Keyboard,
  Loader,
  Numberbtn,
  Viewbalance,
} from "../../../../components";
import { COLORS } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import amountFormatter from "../../../../utils/formatMoney";
import { styles } from "../../Transferfunds/TransferInput/TransferInput.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";

function WalletPin({ route, navigation }) {
  // const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.post("/pay", { amount });

      navigation.navigate("CustomWebView", {
        url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        amount: amount,
      });
      // Linking.openURL(response.data.data.authorization_url)
      // WebBrowser.openBrowserAsync(response.data.data.authorization_url);
    } catch (err) {
      // showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveAmount = () => {
    if (amount.length > 0) {
      const newdata = amount.substring(0, amount.length - 1);
      setAmount(newdata);
    }
  };
  const handleSetAmount = (value: string) => {
    setAmount((oldamount) => {
      let newamount = oldamount.concat(value);
      if (Number(newamount)) {
        return newamount;
      }
      return oldamount;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Backheader title="Enter Amount" />
      {loading && <Loader />}
      <Customstatusbar />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.amountcont}>
              <Text style={styles.amountTxt}>
                {" "}
                <Text style={{ color: COLORS.grey5 }}>N</Text>{" "}
                {amountFormatter(amount)}
              </Text>
            </View>
          </View>


          <Keyboard
            array={[...numbers]}
            setDigit={handleSetAmount}
            removeDigit={handleRemoveAmount}
          />
        </View>
      </View>

      <Bottombtn title="PROCEED" onpress={handleSubmit} />
    </SafeAreaView>
  );
}

export default WalletPin;

const walletStyles = StyleSheet.create({
  walletpinContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    // marginBottom: 30,
    // backgroundColor: "red"
  },
});
