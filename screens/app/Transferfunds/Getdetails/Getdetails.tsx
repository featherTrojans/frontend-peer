import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { styles } from "./Getdetails.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Backheader, Bottombtn, Input, Loader } from "../../../../components";
import { COLORS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";



const { Backarrow, At } = icons;

const Getdetails = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const { amount } = route.params;
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/transfer", {
        amount: amount,
        transferTo: username,
      });
      console.log(response);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };
  console.log(amount);
  return (
    <View style={styles.container}>
      {loading && <Loader />}

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
            onChangeText={(text) => setUsername(text)}
            value={username}
            icon={<At />}
            placeholder="Enter Username"
          />
        </View>
      </View>

      <Bottombtn title="PROCEED" onpress={()=>navigation.navigate("Transferpin",{amount,username})}/>


    </View>
  );
};

export default Getdetails;
