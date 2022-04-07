import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "./Updatedeposit.styles";
import { Backheader, Bottombtn } from "../../../../components";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
const { Cryinganimate } = icons;
const { Lagosbadge, Oyobadge, Osunbadge, Ogunbadge } = images;

const supportedStates = [
  {
    image: Lagosbadge,
    title: "Lagos",
  },
  {
    image: Oyobadge,
    title: "Oyo",
  },
  {
    image: Osunbadge,
    title: "Osun",
  },
  {
    image: Ogunbadge,
    title: "Ogun",
  },
];

const Updatedeposit = ({ navigation, route }) => {
  const { from } = route.params;
  return (
    <View style={styles.container}>
      <Customstatusbar />
      <Backheader
        title={`${from === "deposit" ? "Update Deposit" : "Withdrawal"}`}
      />

      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.animationContainer}>
            <LottieView
              source={Cryinganimate}
              style={{ width: RFValue(190), height: RFValue(190) }}
              autoPlay
              loop
            />
            <Text style={styles.animationText}>
              Padi! Sorry, Cash {from === "deposit" ? "Deposit" : "Withdrawal"}{" "}
              is not supported in your region for now.
            </Text>
          </View>

          <View style={{ marginTop: RFValue(40), marginBottom: RFValue(40) }}>
            <Text style={styles.supportedStates}>Supported States</Text>
            <View style={styles.supportedContainer}>
              {/* Icons */}
              {supportedStates.map(({ image, title }) => {
                return (
                  <View style={styles.eachSupportedContainer} key={title}>
                    <View style={styles.eachSupportedView}>
                      <Image
                        source={image}
                        resizeMode="contain"
                        style={styles.eachSupportImage}
                      />
                    </View>
                    <Text style={styles.eachSupportedTitle}>{title}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={styles.extraText}>
            You will be notified when these features are available in your
            region
          </Text>
        </View>
        <Bottombtn
          title="OK, Continue"
          onpress={() => navigation.navigate("Home")}
        />
      </ScrollView>
    </View>
  );
};

export default Updatedeposit;
