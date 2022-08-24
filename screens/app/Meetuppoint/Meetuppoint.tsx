import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Backheader, Custombutton, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize } from "../../../constants";

const Meetuppoint = () => {
  return (
    <Mainwrapper>
      <Backheader title="Meetup Point" />
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 53,
            borderRadius: 5,
            paddingHorizontal: 15,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              ...fontsize.smallest,
              ...FONTS.regular,
              color: COLORS.blue9,
            }}
            placeholder="Enter location"
          />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 20 }}>
          <Custombutton
            btntext="Yeah, Set Meetup point"
            onpress={() => console.log("Meet up pooint")}
          />
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Meetuppoint;

const styles = StyleSheet.create({});
