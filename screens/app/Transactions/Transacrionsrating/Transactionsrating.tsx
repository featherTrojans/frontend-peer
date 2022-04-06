import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  TouchableNativeFeedback,
  Easing,
} from "react-native";
import React, { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { styles } from "./Transactionsrating.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import {
  Bottombtn,
  InitialsBg,
  Sendingandreceive,
} from "../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
const {
  Ratingsstar,
  Userdefaultsmaller,
  Sendingandreceivearrows,
  Mapanimate,
  Ratingsuccessanimate,
} = icons;



const Transactionsrating = () => {
  const [rating, setRating] = useState({
    rating: 0,
    animation: new Animated.Value(1),
  });
  const [showModal, setShowModal] = useState(false);
  const numStars = 5;
  let stars = [];

  const rate = (star: number) => {
    setRating({ ...rating, rating: star });
  };

  const animate = () => {
    Animated.timing(rating.animation, {
      toValue: 1.4,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rating.animation.setValue(1);
    });
  };

  const animatedScale = rating.animation.interpolate({
    inputRange: [1, 1.1, 1.4],
    outputRange: [1, 1.4, 1],
  });
  const animatedOpacity = rating.animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.6, 1],
  });

  const animatedWobble = rating.animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ["0deg", "-3deg", "3deg", "0deg"],
  });

  const animatedStyle = {
    transform: [{ scale: animatedScale }, { rotate: animatedWobble }],
    opacity: animatedOpacity,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: "center"
  };

  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableWithoutFeedback
        key={x}
        onPress={() => {
          rate(x);
          animate();
        }}
      >
        <Animated.View style={x <= rating.rating ? animatedStyle : ""}>
          <Ratingsstar filled={x <= rating.rating ? true : false} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Customstatusbar />
        {/* HEader  */}

        <Globalmodal
        // To pass the state controlling the modal in
          showState={false}
          btnFunction={() => setShowModal(true)}
          btnText="COntinue"
        >
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <LottieView
              source={Ratingsuccessanimate}
              style={{ width: 186, height: 186,}}
              autoPlay
              loop
            />
            <Text
              style={{
                marginHorizontal: 40,
                textAlign: "center",
                marginBottom: 35,
                marginTop: 55,
                ...fontsize.bsmall,
                ...FONTS.regular,
                color: COLORS.black,
              }}
            >
              Thanks for rating this transaction, you just recieved{" "}
              <Text style={{ ...FONTS.bold }}>N7.50</Text>
            </Text>
          </View>
        </Globalmodal>

        <View style={{ paddingHorizontal: 15, flex: 0.7 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...fontsize.bbsmall, ...FONTS.bold }}>
              Rate Transaction
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {/* Sender and Receiver Image */}
              <Userdefaultsmaller />
              <View style={{ marginHorizontal: 18 }}>
                <Sendingandreceivearrows />
              </View>

              {/* To replace this name with name of the receiver or sender */}
              <InitialsBg sideLength={36} name="Ok Mc" />
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ marginTop: 45, marginBottom: 60, paddingHorizontal: 48 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                }}
              >
                Please rate your transaction with{" "}
                <Text style={{ ...FONTS.bold }}>@suzzyb</Text>, rating attracts
                a gift oh 😎
              </Text>
            </View>

            <View
              style={{
                width: 244,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {stars}
            </View>
          </View>
        </View>
        <View style={{ flex: 0.3, justifyContent: "flex-end" }}>
          <TextInput
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderColor: COLORS.grey1,
              borderWidth: 1,
              borderRadius: 10,
              ...fontsize.small,
              ...FONTS.light,
              marginHorizontal: 25,
            }}
            placeholder="Comment (Optional)"
            placeholderTextColor={COLORS.black}
          />
          <Bottombtn title="rate" onpress={() => setShowModal(true)} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Transactionsrating;
