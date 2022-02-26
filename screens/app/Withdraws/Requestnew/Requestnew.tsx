import { StyleSheet, Text, View, TextInput, StatusBar } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { Backheader, Bottombtn, Viewbalance } from "../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Requestnew.styles";

const { Backarrow } = icons;

const Requestnew = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Backheader title="Amount" />

      {/* View balaance component */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance />

        {/* Still have to fix the styling for this section below */}
        <View style={{ flex: 1, backgroundColor: "red" }}>
          
        </View>
      </View>
      <Bottombtn
        title="PROCEED"
        onpress={() => console.log("Request new withdrawal pressed")}
      />
    </View>
  );
};

export default Requestnew;
