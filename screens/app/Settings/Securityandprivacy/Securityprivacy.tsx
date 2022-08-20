import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "./Securityprivacy.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { getBiometricsAccess } from "../../../../utils/biometrics";
import { Backheader, Mainwrapper } from "../../../../components";

const {
  Backarrow,
  Forwardarrow,
  Outlinedlock,
  Bluefingerprinticon,
  Purplelockicon,
  Greenlockicon,
} = icons;

type EachbtnProps = {
  icon: JSX.Element;
  title: string;
  bg: string;
  onpress: () => void;
};

const Eachbtn = ({ icon, title, bg, onpress }: EachbtnProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        // paddingBottom: 32,
        // borderBottomColor: COLORS.lineColor3,
        // borderBottomWidth: 0.5,
        // marginBottom: 32,
      }}
      activeOpacity={0.6}
      onPress={onpress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Icons */}
        <View
          style={{
            width: 34,
            height: 34,
            backgroundColor: bg,
            borderRadius: 34 / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            marginLeft: 22,
            ...fontsize.smaller,
            ...FONTS.regular,
            color: COLORS.blue9,
          }}
        >
          {title}
        </Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};

const Securityprivacy = ({ navigation }) => {
  const options = [
    {
      title: "Change Password",
      icon: <Purplelockicon />,
      bg: "#F1E5FF",
      route: "Changepassword",
    },
    {
      title: "Change Transaction PIN",
      icon: <Greenlockicon />,
      bg: "#E5FAF6",
      route: "Changepin",
    },
    {
      title: "Biometrics Login",
      icon: <Bluefingerprinticon />,
      bg: "#D2EAFD",
      route: "Biometrics",
    },
  ];

  return (
    <Mainwrapper>
      <Backheader title="Security & Privacy" />

      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 20,
            paddingVertical: 22,
            borderRadius: 15,
          }}
        >
          <Text style={{ marginBottom: 44, ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9 }}>Select an option</Text>

          {/* {options} */}
          {options.map(({ title, icon, bg, route }, index) => {
            const isLast = options.length === index +1
            return (
              <View key={index}>
                
              <Eachbtn
                bg={bg}
                icon={icon}
                title={title}
                onpress={() => navigation.navigate(route)}
              />
              {!isLast && <View style={{marginVertical: 20, height: 0.5, backgroundColor: COLORS.borderColor2}}/>}
              </View>
            );
          })}

        
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Securityprivacy;
