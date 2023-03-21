import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Backheader,
  Horizontaline,
  Iconandinfo,
  Mainwrapper,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { profilestyles } from "./Profile.styles";

const { Transfericon } = icons;

const Securityandprivacy = () => {
  return (
    <Mainwrapper>
      <Backheader />
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={profilestyles.securityPrivacyOptionHeader}>
          Transaction PIN
        </Text>

        <View style={{ marginVertical: 40 }}>
          <Iconandinfo
            action={() => console.log("Hyes")}
            Icon={Transfericon}
            title="Change Transaction PIN"
            info="Modify & manage your secure pin"
          />
          <Horizontaline marginV={20} />
          <Iconandinfo
            action={() => console.log("Hyes")}
            Icon={Transfericon}
            title="Enable MFA"
            info="Add a layer of security to your PIN"
          />
        </View>

        <View style={profilestyles.biometricOptionWrap}>
          <Text style={profilestyles.securityPrivacyOptionHeader}>
            Biometrics
          </Text>
          <View style={profilestyles.biometricsStatusBg}>
            <Text style={profilestyles.biometricStatusText}>Enable</Text>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <Iconandinfo
            action={() => console.log("Hyes")}
            Icon={Transfericon}
            title="Use biometrics for Transactions"
            info="Enable biometrics for security actions"
          />
          <Horizontaline marginV={20} />
          <Iconandinfo
            action={() => console.log("Hyes")}
            Icon={Transfericon}
            title="Use biometrics for Transactions"
            info="Enable biometrics for security actions"
          />
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Securityandprivacy;

const styles = StyleSheet.create({});
