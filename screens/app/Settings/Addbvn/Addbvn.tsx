import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { Loader, Mainwrapper } from "../../../../components";
import { useToast } from "react-native-toast-notifications";
import { Custombutton, Horizontaline } from "../../../../components";
import useAlert from "../../../../utils/useAlerts";
import useCustomModal from "../../../../utils/useCustomModal";

const { Bvnlock, Whitebackarrow, Whitecheck, Bvndropicon } = icons;

const Addbvn = ({ navigation }) => {
  const [bvn, setBvn] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isShow, setIsShow] = useState(false);
  const [shownText, setShownText] = useState("View");
  const { errorAlert } = useAlert();
  const { CustomModal, openModal } = useCustomModal();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (bvn.length > 10) {
      setDisabled(false);
    }
  }, [bvn]);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(
      "--------------------------------response----------------------------"
    );
    try {
      await axiosCustom.post("user/upgrade", { bvn });
      navigation.navigate("Verifybvn");
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleHeight = () => {
    if (isShow == true) {
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start(() => {
        setIsShow(false);
        setShownText("Hide");
      });
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false, // <-- neccessary
      }).start(() => {
        setIsShow(true);
        setShownText("View");
      });
    }
  };

  //Interpolation for the height animation
  const newHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [55, 260], // Variness in height
  });

  //Interpoltion for the toggled view opacirty
  const animatedOpacity = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Interpolation for the dropdwon icon
  const rotateX = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"], // <-- value that larger than your content's height
  });

  return (
    <Mainwrapper bgColor={COLORS.blue6}>
      {loading && <Loader />}

      <View style={{ paddingHorizontal: 16, marginTop: 30 }}></View>
      <ScrollView
        style={{ paddingHorizontal: 16, marginTop: 30 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* <CustomModal>
          <View>

        <View style={{justifyContent: "center", alignItems: "center"}}>
            <View
              style={{
                width: 264,
                height: 168,
                backgroundColor: COLORS.lightBlue,
              }}
            >
              <Text>lootie</Text>
            </View>
            </View>


            <Text
              style={{
                marginTop: 35,
                marginBottom: 45,
                paddingHorizontal: 25,
                textAlign: "center",
                color: COLORS.blue9,
                ...fontsize.small,
                ...FONTS.regular,
                lineHeight: 23,
              }}
            >
              Your BVN has been verified successfully and a bank account has
              been created for you
            </Text>

            <Custombutton
              btntext="Thanks, Continue"
              onpress={() => console.log("Hellow")}
            />
          </View>
        </CustomModal> */}

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
              {
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                justifyContent: "center",
                alignItems: "center",
              },
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
              ...fontsize.bmedium,
              ...FONTS.medium,
              lineHeight: 37,
              color: COLORS.white,
              marginBottom: 22,
            }}
          >
            Enter your BVN
          </Text>
          <Text
            style={{
              ...fontsize.small,
              ...FONTS.regular,
              color: COLORS.white,
            }}
          >
            We use your BVN to verify your identity and create an account number
            for you to receive money easily.
          </Text>
        </View>

        <View style={{ marginTop: 57 }}>
          <Text
            style={{
              color: COLORS.white,
              ...fontsize.smallest,
              ...FONTS.medium,
            }}
          >
            Bank Verification Number (11-digits)
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              borderColor: COLORS.inputBorderColor,
              height: 58,
              color: COLORS.white,
            }}
            value={bvn}
            onChangeText={(text: string) => setBvn(text)}
            placeholder="Enter BVN"
            placeholderTextColor={COLORS.inputBorderColor}
            keyboardType="numeric"
          />
        </View>

        <Animated.View
          style={{
            paddingVertical: 18,
            borderRadius: 8,
            backgroundColor: COLORS.blue8,
            paddingHorizontal: 20,
            marginTop: 26,
            height: newHeight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
                  ...fontsize.smallest,
                  ...FONTS.regular,
                }}
              >
                Why we need your BVN
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleHeight}
              style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...fontsize.xsmallest,
                  ...FONTS.regular,
                  marginRight: 6,
                }}
              >
                {shownText}
              </Text>

              <Animated.View style={[{ transform: [{ rotateX }] }]}>
                <Bvndropicon />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* <View style={{ marginTop: 38 }}>
          

          </View> */}

          <Animated.View
            style={{ marginTop: 18, paddingLeft: 40, opacity: animatedOpacity }}
          >
            <Text
              style={{
                marginBottom: 22,
                ...fontsize.smallest,
                ...FONTS.regular,
                color: COLORS.white,
              }}
            >
              We only need access to your:
            </Text>

            <View
              style={{
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Whitecheck />
              <Text
                style={{
                  marginLeft: 10.6,
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.white,
                }}
              >
                Firstname
              </Text>
            </View>
            <View
              style={{
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Whitecheck />
              <Text
                style={{
                  marginLeft: 10.6,
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.white,
                }}
              >
                Phone Number
              </Text>
            </View>

            <View
              style={{
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Whitecheck />
              <Text
                style={{
                  marginLeft: 10.6,
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.white,
                }}
              >
                Date of Birth
              </Text>
            </View>

            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.regular,
                color: COLORS.white,
                lineHeight: 20,
              }}
            >
              Your BVN does not give us access to your bank accounts or
              transactions
            </Text>
            <Horizontaline marginV={20} />
          </Animated.View>
        </Animated.View>
        <View style={{ marginTop: 38 }}>
          <Custombutton
            disable={false}
            btntext="Upgrade Account"
            bg={COLORS.green2}
            onpress={handleSubmit}
          />
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
      </ScrollView>
    </Mainwrapper>
  );
};

export default Addbvn;

const styles = StyleSheet.create({});
