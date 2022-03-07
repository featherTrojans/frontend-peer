import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback } from "react";

import { styles } from "./Getdetails.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Backheader, Bottombtn, Input, Loader } from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useDebounce from "../../../../utils/debounce";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import amountFormatter from "../../../../utils/formatMoney";



const { Backarrow, At, Check,WrongIcon } = icons;





const Getdetails = ({ route, navigation }) => {
  const [userinfo, getuserinfo, loadbounce,error] = useDebounce()
  const [showmodal, setShowModal] = useState(false)
  const [username, setUsername] = useState("");
  const { amount } = route.params;
  

  const handleUsernameChange = (text:string)=>{
    setUsername(text)
    // and debound
    getuserinfo(text)
  }
  console.log(userinfo)
  return (
    <View style={styles.container}>


      <Backheader title="Feather Wallet"/>
      <Globalmodal
        showState={showmodal}
        onBgPress={() => setShowModal(!showmodal)}
        btnFunction={()=>navigation.navigate("Transferpin",{amount,userinfo})}
        >
         <View style={{ alignItems: "center" }}>
           <Text style={{alignSelf:"flex-start"}}>Transfer Summary</Text>
             <View style={{flexDirection:"row",justifyContent:"space-between", marginVertical:20}}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: COLORS.grey1,
                  borderRadius: 50,
                  marginHorizontal:10
                }}
                />
                <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: COLORS.grey1,
                  borderRadius: 50,
                  marginHorizontal:10
                }}
              />
                </View>
              <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
                  NGN {amountFormatter(amount)}
              </Text>
              <Text style={{backgroundColor:"#F2F5FF", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, marginTop: 15 }}>
                Withdraw Charges: 
                <Text style={{...FONTS.bold}}> + N0.00</Text>
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginHorizontal: 40,
                  marginVertical: 40,
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                }}
              >
                Are you sure you want to transfer cash to @{userinfo?.username} - {userinfo?.fullName} ?
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
            {
              loadbounce?<Text>...</Text>:userinfo.fullName?<>
            <Check />
            <Text style={styles.name}>{userinfo?.fullName}</Text>
              </>:null
            } 
             {error && <><WrongIcon /><Text style={styles.name}>{username}</Text></>}
          </View>
        </View>
      </View>

      <Bottombtn title="PROCEED" onpress={()=>setShowModal(true)} disabled={userinfo.username === undefined}/>


    </View>
  );
};

export default Getdetails;
