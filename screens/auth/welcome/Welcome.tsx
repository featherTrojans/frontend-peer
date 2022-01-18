import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

const { Smile } = icons;

const Welcome = () => {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: SIZES.width -214,
      duration: 1500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Smiling Icon */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Smile />
      </View>
      {/* Welcome text */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 58,
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.bold,
            ...fontsize.bigger,
            textAlign: "center",
          }}
        >
          welcome on board <Text style={{ color: COLORS.blue6 }}>padi.</Text>
        </Text>
      </View>

      {/* Progress Line */}
      <View
        style={{
          marginHorizontal: 82,
          backgroundColor: COLORS.animatedLine,
          height: 3.5,
          borderRadius: 3.5,
          marginBottom: 127,
          marginTop: 127,
        }}
      >
        {/* Animated line */}
        <Animated.View
          style={{
            backgroundColor: COLORS.blue6,
            height: 3.5,
            borderRadius: 3.5,
            width: width,
          }}
        />
      </View>

      {/* Get started text */}
      <View style={{ paddingHorizontal: 30, marginBottom: 112 }}>
        <Text
          style={{ ...fontsize.bsmall, ...FONTS.regular, textAlign: "center" }}
        >
          Yo! we are setting things up for you to get started, this usually
          takes about one minute.
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
});
