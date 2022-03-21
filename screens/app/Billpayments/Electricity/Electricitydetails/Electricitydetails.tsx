import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Backheader, Bottombtn } from "../../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import Globalmodal from "../../../../shared/Globalmodal/Globalmodal";
import LottieView from "lottie-react-native";

const { Addressbook, Inputdropdown, Successcheckanimate } = icons;

const Paybillsinput = ({
  inputSymbol,
  rightIcon,
  placeholder,
}: PaybillsinputProps) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.paybillInput,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
      }}
    >
      <Text style={{ ...fontsize.bsmall }}>{inputSymbol}</Text>
      <Text style={{ marginLeft: 15.5, marginRight: 16.5 }}>|</Text>
      <TextInput
        style={{ flex: 1, height: 62 }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.black}
      />
      {rightIcon}
    </View>
  );
};

const Electricitydetails = ({ navigation }) => {
    const [showmodal, setShowModal] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Backheader title="Electricity Bill Payments" />

      <Globalmodal
        showState={showmodal}
        btnFunction={() => navigation.navigate("Root")}
        onBgPress={() => setShowModal(true)}
      >
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: 148, height: 148 }}
          />

          <Text
            style={{
              textAlign: "center",
              marginHorizontal: 40,
              //  marginVertical: 40,
              marginTop: 24,
              marginBottom: 45,
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
           Electricity Payments Successful!!
          </Text>
        </View>
      </Globalmodal>
      <KeyboardAwareScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
        <Text
          style={{
            marginTop: 16,
            ...fontsize.bsmall,
            ...FONTS.regular,
            marginRight: 55,
          }}
        >
          Select your preferred network provider and receivers phone number.
        </Text>

        <View style={{ marginTop: 40, flex: 1 }}>
          <Paybillsinput inputSymbol="#" placeholder="37500" />
          <Paybillsinput
            inputSymbol="@"
            placeholder="Select Network"
            rightIcon={<Inputdropdown />}
          />
          <Paybillsinput
            inputSymbol="#"
            placeholder="08098653012"
            rightIcon={<Addressbook />}
          />

          <Paybillsinput inputSymbol="#" placeholder="Globacom" />
          <Paybillsinput
            inputSymbol="#"
            placeholder="3GB (2 Days) - N980.00"
            rightIcon={<Inputdropdown />}
          />
          <Paybillsinput
            inputSymbol="#"
            placeholder="08098653012"
            rightIcon={<Addressbook />}
          />
        </View>
      </KeyboardAwareScrollView>
      <Bottombtn
        title="proceed"
        onpress={() => setShowModal(true)}
      />
    </KeyboardAwareScrollView>
  );
};

export default Electricitydetails;

const styles = StyleSheet.create({});
