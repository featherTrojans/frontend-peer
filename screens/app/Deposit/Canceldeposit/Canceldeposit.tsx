import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
// import { styles } from "./Cancelrequest.styles";
import { Bottombtn } from "../../../../components";
import { styles } from "../../Withdraws/Cancelrequest/Cancelrequest.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";

const { Backarrow } = icons;
const Canceldeposit = () => {
  const [checked, setChecked] = useState(false);

  const reasons = [
    "Peer asked me to do so",
    "Peer wasn’t responsive in progressing this transaction",
    "Don’t have enough cash again",
    "Peer seemed suspicious during the meet-up conversation",
    "Cash presented was in bad condition",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <Customstatusbar />
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <View style={{ marginVertical: 35 }}>
          <Backarrow />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Decline Request Feedback</Text>
          <Text style={styles.subheaderText}>
            Please give us a reason why you want to cancel your request?
          </Text>
        </View>

        {/* list of reasons */}

        <View>
          {reasons.map((reason, index) => (
            <View style={styles.reasonContainer} key={index}>
              <BouncyCheckbox
                size={18}
                fillColor={COLORS.blue6}
                unfillColor={COLORS.white}
                text={reason}
                iconStyle={{
                  borderColor: checked ? COLORS.blue6 : COLORS.grey2,
                }}
                onPress={(isChecked: boolean) => {
                  setChecked(!checked);
                }}
                textStyle={styles.checkboxText}
                style={{
                  alignItems: "flex-start",
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <Bottombtn
        title="CANCEL REQUEST"
        onpress={() => console.log("Cancel button pressed")}
      />

    </SafeAreaView>
  );
};

export default Canceldeposit;
