import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Cancelrequest.styles";

const { Backarrow } = icons;
const Cancelrequest = () => {
  const [checked, setChecked] = useState(false);

  const reasons = [
    "Mistake request",
    "The agent didn’t accept my cash request",
    "Long cash delivery time",
    "The agent seemed suspicious during the meet-up conversation",
    "Cash presented was in bad condition",
  ];

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <View style={{ marginBottom: 37 }}>
        <Backarrow />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Cancel Request Feedback</Text>
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
              iconStyle={{ borderColor: checked ? COLORS.blue6 : COLORS.grey2 }}
              onPress={(isChecked: boolean) => {
                setChecked(!checked);
              }}
              textStyle={styles.checkboxText}
              style={{
                alignItems: 'flex-start'
              }}
            />  
          </View>
        ))}
      </View>
      <View style={styles.cancelBtnContainer}>
        <View style={styles.cancelBg}>
          <Text style={styles.cancelText}>Cancel Request</Text>
        </View>
      </View>
    </View>
  );
};

export default Cancelrequest;
