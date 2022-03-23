import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useCallback, useContext } from "react";

import { styles } from "./Getdetails.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import {
  Backheader,
  Bottombtn,
  Input,
  Loader,
  Sendingandreceive,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useDebounce from "../../../../utils/debounce";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import amountFormatter from "../../../../utils/formatMoney";
import Customstatusbar from "../../../shared/Customstatusbar";
import { AuthContext } from "../../../../context/AuthContext";

const { Backarrow, At, Check, WrongIcon } = icons;

const Getdetails = ({ route, navigation }) => {
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
  const [showmodal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const { authdata } = useContext(AuthContext);
  const { amount } = route.params;

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    // and debound
    getuserinfo(text);
  };

  // console.log(username, userinfo);
  const handleDisabled = () => {
    // if(username && typeof userinfo === "object"){
    //   return false;
    // }

    return userinfo.username === undefined;
  };
  return (
    <View style={styles.container}>
      <Backheader title="Feather Wallet" />
      <Customstatusbar />
      <Globalmodal
        showState={showmodal}
        onBgPress={() => setShowModal(!showmodal)}
        btnFunction={() => {
          navigation.navigate("Transferpin", { amount, userinfo });
          setShowModal(false);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              ...fontsize.bsmall,
              ...FONTS.medium,
            }}
          >
            Transfer Summary
          </Text>

          <Sendingandreceive
            senderName={authdata?.userDetails?.fullName}
            receiverName={userinfo?.fullName}
            title="Wallet Credit"
          />

          <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
            NGN {amountFormatter(amount)}
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.lightBlue,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 30,
              marginTop: 16,
            }}
          >
            Transfer Charges:
            <Text style={{ ...FONTS.bold }}> + N0.00</Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: 25,
              marginVertical: 32,
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
            Are you sure you want to transfer cash to @{userinfo?.username} -{" "}
            <Text style={{ textTransform: "capitalize" }}>
              {userinfo?.fullName}
            </Text>{" "}
            ?
          </Text>
        </View>
      </Globalmodal>
      

      
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>
            Enter the “username” of the feather user you are about to transfer
            cash to.
          </Text>
        </View>

        <View>
          <Input
            icon={<At />}
            disabled={true}
            value={amount}
            placeholder="N37,580.50"
          />
          <Input
            onChangeText={(text) => handleUsernameChange(text)}
            value={username}
            icon={<At />}
            placeholder="Enter Username"
          />

          <View style={styles.namecont}>
            {loadbounce ? (
              <ActivityIndicator size={15} color={COLORS.blue6} />
            ) : userinfo.fullName ? (
              <>
                <Check />
                <Text style={styles.name}>{userinfo?.fullName}</Text>
              </>
            ) : null}
            {error && (
              <>
                <WrongIcon />
                <Text style={styles.name}>{username} does not exist</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{ paddingBottom: 24, paddingTop: 26, marginHorizontal: 25 }}
        activeOpacity={0.8}
        onPress={() => setShowModal(true)}
        disabled={handleDisabled()}
      >
        <View style={[styles.btnBg, { backgroundColor: COLORS.blue6 }]}>
          <Text
            style={{ ...fontsize.smallest, ...FONTS.bold, color: COLORS.white }}
          >
            PROCEED
          </Text>
        </View>
      </TouchableOpacity>

      {/* <Bottombtn
        title="PROCEED"
        onpress={() => setShowModal(true)}
        disabled={handleDisabled()}
      /> */}
    </View>
  );
};

export default Getdetails;
