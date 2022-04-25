import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, {useState} from "react";
import LottieView from "lottie-react-native"
import { Backheader, Bottombtn } from "../../../../components";

import { styles } from "./Transactiondispute.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


const {Successcheckanimate} = icons





const Transactiondispute = () => {
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)



  return (
    <SafeAreaView style={styles.container}>
      <Customstatusbar />

      <Globalmodal
      showState={showModal}
      onBgPress={() => setShowModal(true)}
      btnFunction={() => {
        setShowModal(false);
        navigation.navigate("Root")
      }}
      btnText="continue"
      >
        <View style={{marginHorizontal: 35, alignItems: "center", marginBottom: 35}}>
          <LottieView source={Successcheckanimate} style={{width: 148, height: 148,}} autoPlay loop/>
          <Text style={{marginTop: 10, ...fontsize.bsmall, ...FONTS.regular, textAlign: 'center'}}>Your report has been sent successfully, we would reach out soon</Text>
        </View>
      </Globalmodal>




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
        onpress={() => setShowModal(true)}
      />
    </SafeAreaView>
  );
};

export default Transactiondispute;
