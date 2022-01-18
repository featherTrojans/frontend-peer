import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Input } from "../../../components";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const { At, Usericondark } = icons;

const Setup = () => {
  return (
      <KeyboardAwareScrollView>
    <View style={styles.container}>
      <StatusBar />
      {/* Header */}
      <View style={{ marginBottom: 31 }}>
        <Text style={{ ...fontsize.big, ...FONTS.bold, color: COLORS.blue6 }}>
          Set up your unique
        </Text>
        <Text style={{ ...fontsize.big, ...FONTS.bold, color: COLORS.blue6 }}>
          feather username.
        </Text>
      </View>

      {/* Informations */}
      <View style={{ marginBottom: 35 }}>
        <Text
          style={{ ...fontsize.bsmall, ...FONTS.regular, color: COLORS.grey2 }}
        >
          We set up a default username for you already, its advisable to
          customise it to your preference.
        </Text>
      </View>

      {/* Input box */}
      <Input icon={<At />} placeholder="feather2923" />

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        {/* setup later btn */}
        <View style={{ marginBottom: 40 }}>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.bold,
              color: COLORS.blue7,
              textAlign: "center",
            }}
          >
            SETUP LATER
          </Text>
        </View>
        {/* Continue btn */}
        <View
          style={{
            height: 62,
            backgroundColor: COLORS.blue6,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80
          }}
        >
          <Text
            style={{ ...fontsize.smallest, ...FONTS.bold, color: COLORS.white }}
          >
            CONTINUE
          </Text>
        </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

export default Setup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZES.height,
    
    paddingHorizontal: 25,
    paddingTop: 25,
    backgroundColor: COLORS.white,
  },
});
