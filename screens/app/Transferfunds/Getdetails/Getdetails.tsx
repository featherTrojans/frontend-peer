import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useCallback } from "react";

import { styles } from "./Getdetails.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Backheader, Bottombtn, Input, Loader, Sendingandreceive } from "../../../../components";
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
  
  return (
    <View style={styles.container}>


      <Backheader title="Feather Wallet"/>
      <Globalmodal
        showState={showmodal}
        onBgPress={() => setShowModal(!showmodal)}
        btnFunction={()=>navigation.navigate("Transferpin",{amount,userinfo})}
        >
         <View style={{ alignItems: "center" }}>
           <Text style={{alignSelf:"flex-start", ...fontsize.bsmall, ...FONTS.medium}}>Transfer Summary</Text>
             

             <Sendingandreceive />

         

              <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
                  NGN {amountFormatter(amount)}
              </Text>
              <Text style={{backgroundColor:COLORS.lightBlue, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, marginTop: 16 }}>
                Transfer Charges: 
                <Text style={{...FONTS.bold}}> + N0.00</Text>
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
                Are you sure you want to transfer cash to @{userinfo?.username} -  <Text style={{textTransform: 'capitalize'}}>{userinfo?.fullName}</Text>  ?
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
              loadbounce?<ActivityIndicator size={15} color={COLORS.blue6}/> : userinfo.fullName?<>
            <Check />
            <Text style={styles.name}>{userinfo?.fullName}</Text>
              </>:null
            } 
             {error && <><WrongIcon /><Text style={styles.name}>{username} does not exist</Text></>}
          </View>
        </View>
      </View>

      <Bottombtn title="PROCEED" onpress={()=>setShowModal(true)} disabled={userinfo.username === undefined}/>


    </View>
  );
};

export default Getdetails;
