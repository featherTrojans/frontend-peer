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


const {Successcheckanimate} = icons





const Transactiondispute = () => {

  const [showModal, setShowModal] = useState(false)



  return (
    <View style={styles.container}>
      <Customstatusbar />

      <Globalmodal
      showState={showModal}
      onBgPress={() => setShowModal(true)}
      btnFunction={() => setShowModal(true)}
      btnText="continue"
      >
        <View style={{marginHorizontal: 35, alignItems: "center", marginBottom: 35}}>
          <LottieView source={Successcheckanimate} style={{width: 148, height: 148,}} autoPlay loop={false}/>
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
    </View>
  );
};

export default Transactiondispute;
