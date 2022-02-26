import { StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";

import { styles } from "./Getdetails.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Input, Loader } from "../../../../components";
import { COLORS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";

const { Backarrow, At } = icons;

const Getdetails = ({route,navigation}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("")
  const {amount} = route.params
  const handleSubmit = async ()=>{
    try{
      setLoading(true)
      const response = await axiosCustom.post("/transfer",{amount:amount, transferTo:username})
      console.log(response)
    }catch(err){
      console.log(err.response)
    }finally{
      setLoading(false)
    }
  }
  console.log(amount)
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Feather Wallet</Text>
      </View>
      <View style={{flex:1}}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>
            Enter the “username” of the feather user you are about to transfer
            cash to.
          </Text>
        </View>

        <View>
          <Input icon={<At />} disabled={true} value={amount} placeholder="N37,580.50" />
          <Input onChangeText={(text)=>setUsername(text)} value={username} icon={<At />} placeholder="Enter Username" />
        </View>
      </View>
      <TouchableOpacity style={styles.btnBg}>
                <Text style={styles.btnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Getdetails;
