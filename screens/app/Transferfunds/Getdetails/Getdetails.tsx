import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback } from "react";

import { styles } from "./Getdetails.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Backheader, Bottombtn, Input, Loader } from "../../../../components";
import { COLORS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useDebounce from "../../../../utils/debounce";



const { Backarrow, At, Check } = icons;





const Getdetails = ({ route, navigation }) => {
  const [userinfo, getuserinfo, loadbounce] = useDebounce()
  
  const [username, setUsername] = useState("");
  // const { amount } = route.params;
  const amount = "20"

  const handleUsernameChange = (text:string)=>{
    setUsername(text)
    // and debound
    getuserinfo(text)
  }
  // console.log(username)
  return (
    <View style={styles.container}>


      <Backheader title="Feather Wallet"/>
      

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
          </View>
        </View>
      </View>

      <Bottombtn title="PROCEED" onpress={()=>navigation.navigate("Transferpin",{amount,username})}/>


    </View>
  );
};

export default Getdetails;
