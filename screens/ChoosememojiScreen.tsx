import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Svg, { G, Rect, Path } from "react-native-svg";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  AccountverificationScreenStyles,
  ChoosememojiScreenStyles,
} from "../assets/styles/screens";
import { FTIconwithbg, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, fontsize } from "../constants";
import { AuthContext } from "../context/AuthContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { allMemojis } from "../assetdatas";

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

const { profileWrap, memojisWrapper, buttonWrap, buttonText } =
  ChoosememojiScreenStyles;
const {} = AccountverificationScreenStyles;

const ChoosememojiScreen = ({ navigation }) => {
  const [active, setActive] = useState("transparent");
  const [skinColor, setSkinColor] = useState("lightSkinned");

  const { authdata, setAuthData } = useContext(AuthContext);
  const gender = authdata?.userDetails?.gender?.toLowerCase() || "male";
  const [currentIndex, setCurrentIndex] = useState(
    allMemojis[gender]["lightSkinned"][0]
  );

  const rotateView = useSharedValue(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const rotateStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateView.value}deg` }],
  }));

  const onOptionPress = useCallback((index) => {
    Haptics.selectionAsync();
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    rotateView.value = withSpring(selectedIndex * 180);
    if (selectedIndex === 0) {
      setSkinColor("lightSkinned");
    } else {
      setSkinColor("darkSkinned");
    }
  }, [selectedIndex]);

  return (
    <FTTitlepagewrapper title="Change Appearance">
      <View style={{ flex: 1 }}>
        <SegmentedControl
          values={["Light Skinned", "Dark Skinned"]}
          selectedIndex={selectedIndex}
          tintColor={COLORS.blue9}
          style={{
            width: "80%",
            alignSelf: "center",
          }}
          fontStyle={{
            color: "#11141A",
            ...fontsize.smallest,
            ...FONTS.regular,
          }}
          activeFontStyle={{
            color: "white",
          }}
          backgroundColor="#F0F0F0"
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />

        <View style={profileWrap}>
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FTIconwithbg imageUrl={currentIndex} bG={active} size={150} />
          </View>

          <AnimatedSVG width={150.649} height={150.649} style={rotateStyles}>
            <G data-name="Group 11713" transform="translate(.5 .5)">
              <Rect
                width={133}
                height={133}
                fill="url(#a)"
                data-name="Rectangle 1403"
                rx={66.5}
                transform="translate(8.325 8.325)"
              />
              <Path
                fill="none"
                stroke="#2c2c2c"
                strokeDasharray="2 9"
                strokeLinecap="round"
                d="M74.825 0A74.825 74.825 0 1 1 0 74.825 74.825 74.825 0 0 1 74.825 0Z"
                data-name="Path 10102"
              />
            </G>
          </AnimatedSVG>
        </View>

        <FlatList
          data={allMemojis[gender][skinColor]}
          numColumns={3}
          horizontal={false}
          columnWrapperStyle={[memojisWrapper]}
          renderItem={({ item }) => {
            return (
              <FTIconwithbg
                onpress={() => onOptionPress(item)}
                imageUrl={item}
                bG=""
                size={85}
              />
            );
          }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("choosememojibg_screen", {
              emojiindex: currentIndex,
            })
          }
          style={buttonWrap}
        >
          <Text style={buttonText}>Great Proceed</Text>
        </TouchableOpacity>
      </View>
    </FTTitlepagewrapper>
  );
};

export default ChoosememojiScreen;

const styles = StyleSheet.create({});
