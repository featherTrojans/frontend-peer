import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";

const { Bvnlock, Whitebackarrow } = icons;

const Addbvn = ({navigation}) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.blue6, flex: 1 }}>
      <Customstatusbar />
      <View style={{ paddingHorizontal: 16, marginTop: 30 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* back arrow */}
          <Pressable
          onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.blue8 : COLORS.blue6,
              },
              {width: 30, height: 30,borderRadius: 30/2, justifyContent: "center", alignItems: "center"}
            ]}
          >
            <Whitebackarrow />
          </Pressable>

          <View
            style={{
              padding: 12,
              backgroundColor: COLORS.blue8,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.regular,
                color: COLORS.white,
                lineHeight: 24,
              }}
            >
              No BVN?{" "}
              <Text style={{ ...FONTS.bold, color: COLORS.green1 }}> Skip</Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              ...fontsize.big,
              ...FONTS.bold,
              lineHeight: 37,
              color: COLORS.white,
              marginBottom: 22,
            }}
          >
            Enter your BVN
          </Text>
          <Text
            style={{
              ...fontsize.bmsmall,
              ...FONTS.regular,
              color: COLORS.white,
            }}
          >
            We use your BVN to verify your identity and create an account number
            for you to receive money easily.
          </Text>
        </View>

        <View style={{ marginTop: 57 }}>
          <Text style={{ color: COLORS.white }}>
            Bank Verification Number (11-digits)
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              borderColor: COLORS.inputBorderColor,
              height: 58,
              color: COLORS.white,
            }}
            placeholder="Enter BVN"
            placeholderTextColor={COLORS.inputBorderColor}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 18,
            borderRadius: 8,
            backgroundColor: COLORS.blue8,
            paddingHorizontal: 20,
            marginTop: 26,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: COLORS.white,
                borderRadius: 24 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bvnlock />
            </View>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                ...fontsize.small,
                ...FONTS.regular,
              }}
            >
              Why we need your BVN
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.white,
              ...fontsize.xsmallest,
              ...FONTS.regular,
            }}
          >
            View
          </Text>
        </View>

        <View style={{ marginTop: 38 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 21,
              backgroundColor: COLORS.green2,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS.white,
                ...fontsize.small,
                ...FONTS.medium,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginTop: 42,
              color: COLORS.white,
              ...fontsize.smallest,
              lineHeight: 24,
              ...FONTS.regular,
            }}
          >
            Secured by VFD Microfinance Bank
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Addbvn;

const styles = StyleSheet.create({});
