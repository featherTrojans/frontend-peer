import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { styles } from "./Securityprivacy.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";

const { Backarrow, Forwardarrowblue, Outlinedlock, Fingerprinticon } = icons;

type EachbtnProps = {
  icon: JSX.Element;
  title: string;
  onpress: () => void;
};

const Eachbtn = ({ icon, title, onpress }: EachbtnProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 32,
        borderBottomColor: COLORS.lineColor3,
        borderBottomWidth: 0.5,
        marginBottom: 32,
      }}
      activeOpacity={0.6}
      onPress={onpress}
    >
      <View style={{ flexDirection: "row" }}>
        {/* Icons */}
        {icon}
        <Text
          style={{
            marginLeft: 22,
            ...fontsize.small,
            ...FONTS.regular,
            color: COLORS.grey5,
          }}
        >
          {title}
        </Text>
      </View>
      <Forwardarrowblue />
    </TouchableOpacity>
  );
};

const Securityprivacy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Customstatusbar />
      <View style={styles.mainHeaderContainer}>
        {/* Icons */}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 25,
            height: 25,
            // backgroundColor: 'red',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25 / 2,
          }}
        >
          <Backarrow />
        </TouchableOpacity>
        <Text style={styles.mainHeaderText}>Security & Privacy</Text>
        <View />
      </View>

      <View style={{ marginHorizontal: 22, marginTop: 40 }}>
        <Eachbtn
          icon={<Outlinedlock />}
          title="Change Password"
          onpress={() => navigation.navigate("Changepassword")}
        />
        <Eachbtn
          icon={<Outlinedlock />}
          title="Reset Transaction PIN"
          onpress={() => navigation.navigate("Changepin")}
        />
        <Eachbtn
          icon={<Fingerprinticon />}
          title="Biometrics"
          onpress={() => console.log("helloow")}
        />
      </View>
    </View>
  );
};

export default Securityprivacy;
