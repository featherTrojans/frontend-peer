import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Svg, {  G, Rect, Path } from "react-native-svg";
import {
  AccountverificationScreenStyles,
  ChoosememojiScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTCustombutton, FTIconwithbg, FTTitlepagewrapper } from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";
import { navigation } from "../utils";
import { useAlert } from "../hooks";
import Animated, {
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { allMemojis } from "../assetdatas";

const AnimatedSVG = Animated.createAnimatedComponent(Svg);


const { Changememojicheckicon, Profilechangeicon } = icons;


const { sectionHeader, colorOptionBg, profileWrap, memojisWrapper, buttonWrap, buttonText } = ChoosememojiScreenStyles;
const {
  movingSegmentedbg,
  segmentedWrap,
  segmentedOptionText,
  segmentedOptions,
} = AccountverificationScreenStyles;

const ColorOption = ({ color, active, setActive }) => {
  return (
    <Pressable
      onPress={() => {
        setActive(color);
        Haptics.selectionAsync()
      }}
    >
      <View style={[colorOptionBg, { backgroundColor: color }]}>
        {active == color && <Changememojicheckicon />}
      </View>
    </Pressable>
  );
};

const profileColors = [
  {
    color: "#D9D9D9",
  },
  {
    color: "#C8F1CE",
  },
  {
    color: "#CFE9FB",
  },
  {
    color: "#F8EBA7",
  },
  {
    color: "#F5C3BC",
  },
  {
    color: "#DFD2FA",
  },
  {
    color: "#F7CDD7",
  },
  {
    color: "#F6DEAC",
  },
  {
    color: "#F8CDD7",
  },
];

const ChoosememojiScreen = () => {
  const { errorAlert } = useAlert();
  const [active, setActive] = useState("#342AD5");
  const [emojiindex, setEmojiIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { authdata, setAuthData } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateValue = 125;
  const flatlistRef = useRef<FlatList>(null);
  const tabTranslate = useSharedValue(0);
  const rotateView = useSharedValue(0);
  const [skinColor, setSkinColor] = useState("lightSkinned")
  const gender = "male"

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: tabTranslate.value }],
  }));

  const rotateStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateView.value}deg` }],
  }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        color: active,
        index: emojiindex,
        isMemoji: true,
      };
      await axiosCustom.post("/upload/image", data);
      setAuthData({
        ...authdata,
        userDetails: {
          ...authdata.userDetails,
          color: active,
          index: emojiindex,
        },
      });
      return navigation.navigate("Dashboard");
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };
  const accountLevels = ["Light Skinned", "Dark Skinned"];
  const onOptionPress = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    tabTranslate.value = withSpring(currentIndex * translateValue);
    rotateView.value = withSpring(currentIndex * 360);
    if(currentIndex === 0){
      setSkinColor("lightSkinned")
    }
    else{
      setSkinColor("darkSkinned")
    }

    const scrollTo = () => {
      flatlistRef?.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    };
    scrollTo();
  }, [currentIndex]);

  return (
    <FTTitlepagewrapper title="Change Appearance">
      <View style={{ flex: 1 }}>
        <View style={segmentedWrap}>
          <Animated.View
            style={[movingSegmentedbg, animatedStyles, { width: "45%" }]}
          />
          {accountLevels.map((accountLevel, index) => {
            let isActive = index == currentIndex;
            return (
              <Pressable
                key={index}
                onPress={() => onOptionPress(index)}
                style={segmentedOptions}
              >
                <Text
                  style={[
                    segmentedOptionText,
                    { color: !isActive ? COLORS.blue9 : COLORS.white },
                  ]}
                >
                  {accountLevel}
                </Text>
              </Pressable>
            );
          })}
        </View>

 
        <View style={profileWrap}>

          <View style={{position: "absolute"}}>
          <FTIconwithbg 
          imageUrl={allMemojis[gender][skinColor][0]}
          bG={active}
          size={150}
          />
          </View>
   
          <AnimatedSVG
            width={150.649}
            height={150.649}
            style={rotateStyles}
          >
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

        <Text style={sectionHeader}>Background Colour</Text>
        <FlatList
          data={profileColors}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item: { color }, index }) => {
            return (
              <ColorOption
                key={index}
                color={color}
                active={active}
                setActive={setActive}
              />
            );
          }}
        />

        <FlatList 
        data={allMemojis[gender][skinColor]}
        numColumns={3}
        horizontal={false}
        columnWrapperStyle={memojisWrapper}
        renderItem={({item}) => {
          return (
            <FTIconwithbg 
            imageUrl={item}
            bG=""
            size={65}
            />
          )
        }}
        />

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("memojisuccess_screen")} style={buttonWrap}>
            <Text style={buttonText}>Great Proceed</Text>
        </TouchableOpacity>


      </View>
    </FTTitlepagewrapper>
  );
};

export default ChoosememojiScreen;

const styles = StyleSheet.create({});
