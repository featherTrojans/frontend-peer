import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Backheader, Bottombtn } from "../../../../components";
import { styles } from "./Transactiondispute.styles";
import { COLORS, FONTS, fontsize } from "../../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Transactiondispute = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Backheader title="Dispute" />

      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View>
          <Text style={styles.disputeText}>Dispute this transaction</Text>
          <Text style={styles.reasonText}>
            Please give us a reason why you want to dispute this transaction?
          </Text>
        </View>

        <TextInput
          style={styles.messageInput}
          placeholder="Enter your reason…"
          placeholderTextColor={COLORS.black}
          multiline
          numberOfLines={20}
          textAlignVertical="top"
        />
      </KeyboardAwareScrollView>
      <Bottombtn
        title="REPORT"
        onpress={() => console.log("Report btn pressed")}
      />
    </View>
  );
};

export default Transactiondispute;
