import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { styles } from "./Updatedeposit.styles";
import { Backheader, Bottombtn } from "../../../../components";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";

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

const Updatedeposit = ({ navigation }) => {
  return (
    <View style={styles.container}>

        <Customstatusbar />
      <Backheader title="Update Deposit" />


      <ScrollView>

        <View style={{flex: 1}}>
        <View style={styles.animationContainer}>
          <LottieView
            source={Cryinganimate}
            style={{ width: 190, height: 190 }}
            autoPlay
            loop
          />
          <Text style={styles.animationText}>
            Padi! Sorry, Cash Deposit is not supported in your region for now.
          </Text>
        </View>

        <View style={{ marginTop: 40, marginBottom: 40 }}>
          <Text style={styles.supportedStates}>Supported States</Text>
          <View style={styles.supportedContainer}>
            {/* Icons */}
            {supportedStates.map(({ image, title }) => {
              return (
                <View style={styles.eachSupportedContainer} key={title}>
                  <View style={{ width: 62, height: 62 }}>
                    <Image
                      source={image}
                      resizeMode="contain"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <Text style={styles.eachSupportedTitle}>{title}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text
          style={{
            marginHorizontal: 40,
            textAlign: "center",
            ...fontsize.bsmall,
            ...FONTS.regular,
            lineHeight: 25,
            marginBottom: 38
          }}
        >
          You will be notified when these features are available in your region
        </Text>
        </View>
        <Bottombtn
          title="OK, Continue"
          onpress={() => navigation.navigate("Depositinput")}
        />
      </ScrollView>
    </View>
  );
};

export default Updatedeposit;
