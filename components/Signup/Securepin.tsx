import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, fontsize, FONTS } from "../../constants";
import { JustifyBetween } from "../../global/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Securepin = () => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <JustifyBetween style={{ marginBottom: 10 }}>
          <View>
            <Text style={styles.header}>Set up your </Text>
            <Text style={styles.header}>4-digit secure pin</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={styles.topDots} />
          </View>
        </JustifyBetween>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>Transaction PIN</Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <View
            style={{
              width: 252,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
            <TextInput style={styles.pinInput} />
          </View>
        </View>

        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 30,
          }}
        >
          <View style={styles.numberBtn}>
            <Text>1</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>2</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>3</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>4</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>5</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>6</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>7</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>8</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>9</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text></Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>0</Text>
          </View>
          <View style={styles.numberBtn}>
            <Text>X</Text>
          </View>
        </View>
          <TouchableOpacity
            style={[styles.proceedBtn, {marginBottom: 80}]}
            activeOpacity={0.8}
          >
            <Text style={styles.proceedText}>PROCEED</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Securepin;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 25,
    // paddingBottom:40,
  },
  header: {
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.black,
  },
  topDots: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.grey1,
    borderRadius: 16,
  },
  subText: {
    color: COLORS.grey5,
    ...fontsize.medium,
    ...FONTS.regular,
  },
  pinInput: {
    width: 50,
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: 13,
    ...fontsize.big,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    borderRadius: 10,
  },
  proceedText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
  numberBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grey1,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
