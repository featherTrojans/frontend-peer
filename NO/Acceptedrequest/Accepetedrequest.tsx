import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS, images, icons, fontsize, FONTS } from "../../constants";
import { Sendingandreceive } from "../../components";
import { styles } from "./Acceptedrequest.styles";

const { Locationmap } = images;
const { Directionarrow, Smallcancel, Smallcomment, Smallphone } = icons;

const reasons = [ 
  "1. It is advisable that you meet-up in an open or public place.",
  "2. Ensure that the cash given to you is certified as “in good condition” by you.",
  "3. Make sure you complete payment as soon as cash is received.",
];

const Accepetedrequest = () => {
  return (
    <ImageBackground style={styles.imageBg} source={Locationmap}>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={styles.backArrow}>
          <Directionarrow />
        </View>
        <BottomSheet snapPoints={["4%", "95%"]} style={styles.bottomSheet}>
          <BottomSheetScrollView style={styles.bottomSheetScroll}>
            <View style={{ marginBottom: 27 }}>
              <Text style={styles.requestSummary}>Request Summary</Text>
            </View>

            {/*  Scrolllable Starte */}
            <View style={styles.detailsContainer}>
              <Sendingandreceive />
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.amountText}>NGN 35,000.00</Text>
              </View>
              <View style={styles.withdrawalChargesBg}>
                <Text style={{ ...fontsize.smaller }}>
                  Withdrawal Charges :{" "}
                  <Text style={{ ...FONTS.bold }}>+ N750</Text>
                </Text>
              </View>
            </View>

            <View style={styles.reasonsContainer}>
              {reasons.map((reason, index) => {
                <View style={{ marginBottom: 30 }} key={index}>
                  <Text style={styles.reasonText}>{reason}</Text>
                </View>;
              })}
            </View>
          </BottomSheetScrollView>

          {/*Scrolllable End */}
        </BottomSheet>
      </View>

      <View style={styles.bottomPartContainer}>
        <View style={styles.actionsContainer}>
          <View style={styles.action}>
            <Smallcomment />
            <Text style={styles.actionTitle}>Chat</Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.action}>
            <Smallphone />
            <Text style={styles.actionTitle}>Call</Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.action}>
            <Smallcancel />
            <Text style={styles.actionTitle}>Cancel</Text>
          </View>
        </View>

        <View style={styles.btnBg}>
          <Text style={styles.btnText}>Proceed to payment</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Accepetedrequest;
