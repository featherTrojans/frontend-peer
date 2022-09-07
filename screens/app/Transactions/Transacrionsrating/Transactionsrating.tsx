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
  // TouchableWithoutFeedback
} from "react-native";
import React, { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { styles } from "./Transactionsrating.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import {
  Backheader,
  Bottombtn,
  Custombutton,
  InitialsBg,
  Loader,
  Mainwrapper,
  Sendingandreceive,
} from "../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import useAlert from "../../../../utils/useAlerts";

const {
  Ratingsstar,
  Userdefaultsmaller,
  Sendingandreceivearrows,
  Mapanimate,
  Ratingsuccessanimate,
} = icons;

const Transactionsrating = ({navigation, route}:any) => {
  const info = route.params
  const {errorAlert} = useAlert()
  const [rating, setRating] = useState({
    rating: 0,
    animation: new Animated.Value(1),
  });
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
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
  
  const handleSubmit = async ()=>{

    if(comment.length < 4 || rating.rating < 1){
      errorAlert(null, "Please provide a comment and rate ")
      return
    }
    const data = {
      rating:rating.rating,
      description:comment,
      userToRate:info.userUid,
      reference:info?.reference
    } 

    setLoading(true)
    try{
      await axiosCustom.post("/rating",data)
      setShowModal(true)
    }catch(err){
      errorAlert(err)
    }finally{
      setLoading(false)
    }
}

  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableNativeFeedback
        key={x}
        onPress={() => {
          rate(x);
          animate();
        }}
      >
        <Animated.View style={x <= rating.rating ? animatedStyle : ""}>
          <Ratingsstar filled={x <= rating.rating ? true : false} />
        </Animated.View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <Mainwrapper >
      <Backheader title="Rate Transaction" /> 
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* HEader  */}
        {loading && <Loader />}




        <Globalmodal
        // To pass the state controlling the modal in
          showState={showModal}
          btnFunction={() => navigation.navigate('Home')}
          btnText="Continue"
        >
          <View style={{justifyContent: "center", alignItems: "center", marginVertical: 30 }}>
            <LottieView
              source={Ratingsuccessanimate}
              style={{ width: 88, height: 88, }}
              autoPlay
              loop
            />
            <Text
              style={{
                marginHorizontal: 40,
                textAlign: "center",
                marginTop: RFValue(32),
                ...fontsize.smaller,
                ...FONTS.regular,
                color: COLORS.blue9,
              }}
            >
              Thanks for rating this transaction, you just recieved{" "}
              <Text style={{ ...FONTS.medium }}>N10.00</Text>
            </Text>
          </View>
        </Globalmodal>






        <View style={{ paddingHorizontal: 15, flex: 0.7 }}>


          
          {/* <View
            style={{
              marginVertical: RFValue(10),
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
              <Userdefaultsmaller />
              <View style={{ marginHorizontal: 18 }}>
                <Sendingandreceivearrows />
              </View>

              <InitialsBg sideLength={36} name={info.fullName} />
            </View>
          </View> */}

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ marginTop: RFValue(35), marginBottom: RFValue(35), paddingHorizontal: 48 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...fontsize.smaller,
                  ...FONTS.regular,
                }}
              >
                Please rate your transaction with{" "}
                <Text style={{ ...FONTS.bold }}>@{info?.username}</Text>, rating attracts
                a gift oh 😎
              </Text>
            </View>

            <View
              style={{
                width: RFValue(244),
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



          

            <View style={{paddingHorizontal: 15, marginBottom: 20}}>
              <View style={{marginBottom: 22}}>
            <TextInput
            style={{
              // paddingVertical: 20,
              paddingHorizontal: 20,
              borderColor: COLORS.grey1,
              borderWidth: 1,
              borderRadius: 10,
              ...fontsize.small,
              ...FONTS.light,
              // marginHorizontal: 25,
              height: 53,
              ...fontsize.smallest
            }}
            placeholder="Comment (Optional)"
            placeholderTextColor={COLORS.grey16}
            onChangeText={(text)=>setComment(text)}
            value={comment}
          />
          </View>

          <Custombutton 
          btntext="Rate"
          onpress={handleSubmit}
          />
          {/* <Bottombtn title="rate" onpress={handleSubmit} /> */}
          </View>




        </View>
      </View>
    </KeyboardAvoidingView>
    </Mainwrapper>
  );
};

export default Transactionsrating;
