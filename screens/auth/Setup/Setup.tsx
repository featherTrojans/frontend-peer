import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import { Input, Loader } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Setup.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import useDebounce from "../../../utils/debounce";
import { AuthContext } from "../../../context/AuthContext";
import showerror from "../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Globalmodal from "../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../shared/Customstatusbar";
// import { debounce } from "debounce";

const { At, Check, WrongIcon, Successcheckanimate } = icons;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

const Setup = ({ route, navigation }) => {
  const { token, defaultUsername } = route.params;
  const toast = useToast();
  const [username, setUsername] = useState<string>(defaultUsername);
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce(token);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLaterModal, setShowLaterModal] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const { setToken } = useContext(AuthContext);

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    // and debound
    getuserinfo(text);
  };

  const onSubmit = async () => {
    if(username === defaultUsername){
      return handleLater()
    }
    setLoading(true);
    try {
      const response = await axiosCustom.put(
        "/auth/username/set",
        { newUsername: username },
        { headers: { token: token } }
      );
      // console.log(response);
      setResult(response);
      setShowModal(true);
      setAuthorizationToken(response.data.data.token);
      
      // setToken(response.data.data.token)
      navigation.navigate("Welcome",{fromm:"setup", username:null,token:response.data.data.token})
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };
  const handleLater = ()=>{
    setShowLaterModal(true);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Customstatusbar />
        {/* Header */}

        <Globalmodal
          showState={showModal}
          // onBgPress={() => setShowModal(true)}
          btnFunction={() =>
            navigation.navigate("Welcome", {
              fromm: "setup",
              username: null,
              token: result?.data?.data.token,
            })
          }
          btnText="continue"
        >
          <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <LottieView
              source={Successcheckanimate}
              autoPlay
              loop
              style={{ width: 148, height: 148 }}
            />
            <View
              style={{ marginTop: 24, marginBottom: 41, marginHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginBottom: 17,
                }}
              >
                Your feather username is
              </Text>
              <Text
                style={{
                  ...fontsize.bxmedium,
                  ...FONTS.bold,
                  color: COLORS.blue6,
                }}
              >
                @{username}
              </Text>
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginVertical: 41,
                  textAlign: 'center'
                }}
              >
                This can be used as an account identity to receive payments and
                perform transactions
              </Text>
              <Text
              style={{
                ...fontsize.small,
                ...FONTS.regular,
                color: COLORS.grey2,
                textAlign: "center"
              }}
            >
              *This username can be changed under settings
            </Text>
            </View>
          
          </View>
        </Globalmodal>
        <Globalmodal
          showState={showLaterModal}
          // onBgPress={() => setShowLaterModal(true)}
          btnFunction={() =>
            navigation.navigate("Welcome", {
              fromm: "setup",
              username: null,
              token: token,
            })
          }
          btnText="continue"
        >
          <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <LottieView
              source={Successcheckanimate}
              autoPlay
              loop
              style={{ width: 148, height: 148 }}
            />
            <View
              style={{ marginTop: 24, marginBottom: 41, marginHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginBottom: 17,
                }}
              >
                Your feather username is
              </Text>
              <Text
                style={{
                  ...fontsize.bxmedium,
                  ...FONTS.bold,
                  color: COLORS.blue6,
                }}
              >
                @{defaultUsername}
              </Text>
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginVertical: 41,
                  textAlign: 'center'
                }}
              >
                This can be used as an account identity to receive payments and
                perform transactions
              </Text>
              <Text
              style={{
                ...fontsize.small,
                ...FONTS.regular,
                color: COLORS.grey2,
                textAlign: "center"
              }}
            >
              *This username can be changed under settings
            </Text>
            </View>
          
          </View>
        </Globalmodal>

        {loading && <Loader />}
        <View style={{ marginBottom: 31 }}>
          <Text style={styles.headerText}>Set up your unique</Text>
          <Text style={styles.headerText}>feather username.</Text>
        </View>

        {/* Informations */}
        <View style={{ marginBottom: 35 }}>
          <Text style={styles.setupText}>
            We set up a default username for you already, its advisable to
            customise it to your preference.
          </Text>
        </View>

        <Input
          placeholder="feather2923"
          onChangeText={(text) => handleUsernameChange(text)}
          value={username}
          name="username"
          icon={<At />}
        />
        {
          (username.length > 3) && <View style={styles.namecont}>
          {loadbounce ? (<ActivityIndicator size={15} color={COLORS.blue6} />
          ) : userinfo.fullName ? (<>
              <WrongIcon />
              <Text style={styles.name}>{username} is not available</Text>
            </>) : null}
          {error && (<>
              <Check />
              <Text style={styles.name}>{username} is available</Text>
            </>)}
          </View>
        }

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* Setup later btn */}
          <TouchableOpacity onPress={handleLater} style={{ marginBottom: 40 }}>
            <Text style={styles.laterBtn}>SETUP LATER</Text>
          </TouchableOpacity>
          {/* Continue btn */}
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.8}
            onPress={onSubmit}
          >
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>

        {/* Input box */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Setup;
