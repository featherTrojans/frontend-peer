import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { Viewbalance } from "../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Requestnew.styles";

const { Backarrow } = icons;

const Requestnew = () => {
  return (
    <View style={styles.container}>
      {/* Arrow to go back and the text */}
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Amount</Text>
      </View>
      {/* View balaance component */}
      <Viewbalance />

      {/* Still have to fix the styling for this section below */}
      <View style={{ flex: 1, marginTop: 34 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>N</Text>
          {/* <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderColor: COLORS.grey2,
              }}
            /> */}
        </View>
      </View>

      <View style={styles.btnSection}>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>PROCEED</Text>
        </View>
      </View>
      {/* Input withe default numbers */}
      {/* Numbers to input */}
      {/* Proceedd btn */}
    </View>
  );
};

export default Requestnew;
