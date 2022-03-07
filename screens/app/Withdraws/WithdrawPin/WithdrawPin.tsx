import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { styles } from "./WithdrewPin.style";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Loader, Numberbtn } from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
const { Backarrow, SecureDot } = icons;

const WithdrawPin = ({ navigation, route}) => {
  const {amount, userInfo} = route.params
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];
  const [loading, setLoading] = useState(false)
  const [charges, setCharges] = useState<string>("");
  const [showmodal, setShowModal] = useState(false);
  const [shownextmodal, setShowNextModal] = useState(false);


  
  const amountFormatter = (value: string) => {
    return (
      Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
    );
  };

  
  const handleRemoveAmount = () => {
    if (charges.length > 0) {
      const newdata = charges.substring(0, charges.length - 1)
      setCharges(newdata);
      console.log(newdata);
    }
  };
  const handleSetAmount = (value: string) => {
    setCharges((oldamount) => {
      let newamount = oldamount.concat(value)
      if(Number(newamount)){
        return newamount
      }
      return oldamount
    });
  };
  
  const handleSubmit = async ()=>{
    try{
      setLoading(true);
      setShowModal(false);
      const response = await axiosCustom.post("/request/create",{
        amount:amount,
        charges:charges,
        agent:userInfo.agent,
        agentUsername: userInfo.agentUsername
      })

      console.log(response)
      setShowNextModal(true)
      
    }catch(err){
      showerror(toast,err)
    }finally{ 
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      {loading && <Loader />}

      <Globalmodal 
        showState={showmodal}
        onBgPress={() => setShowModal(!showmodal)}
        btnFunction={handleSubmit}
        >
         <View style={{ alignItems: "center" }}>
           <Text style={{alignSelf:"flex-start"}}>Request Summary</Text>
             <View style={{flexDirection:"row",justifyContent:"space-between", marginVertical:20}}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: COLORS.grey1,
                  borderRadius: 40,
                  marginHorizontal:10
                }}
                />
                <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: COLORS.grey1,
                  borderRadius: 40,
                  marginHorizontal:10
                }}
              />
                </View>
              <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
                  NGN {amountFormatter(amount)}
              </Text>
              <Text style={{backgroundColor:"#F2F5FF", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, marginTop: 15 }}>
                Withdraw Charges: 
                <Text style={{...FONTS.bold}}>N {charges}</Text>
              </Text>
              <Text style={{textAlign: "center",marginHorizontal: 40,marginVertical: 40,...fontsize.bsmall,...FONTS.regular,}}>
                Note that the base charge above can be negotiated by <Text style={{...FONTS.bold}}> {userInfo.agentUsername}</Text>
              </Text>
            </View>
      </Globalmodal>
      <Globalmodal 
        showState={shownextmodal}
        onBgPress={() => setShowNextModal(!showmodal)}
        btnFunction={() => navigation.navigate("Home")}
      >
        <View style={{ alignItems: "center" }}>
             <View
               style={{
                 width: 100,
                 height: 100,
                 backgroundColor: COLORS.grey1,
                 borderRadius: 50,
               }}
             />

             <Text
               style={{
                 textAlign: "center",
                 marginHorizontal: 40,
                 marginVertical: 40,
                 ...fontsize.bsmall,
                 ...FONTS.regular,
               }}
             >Your request has been sent, you will be notified once accepted</Text>
           </View>
      </Globalmodal>

      <StatusBar />
      <View style={styles.mainContainer}>
        <View style={styles.backArrowConteiner}>
          <Backarrow />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Add a fair amount to the base charge as fee
            
          </Text>
          <Text style={styles.enterPinText}>Enter Transaction PIN</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
            <View style={styles.amountcont}>
              <Text style={styles.amountTxt}>
                {" "}
                <Text style={{ color: COLORS.grey5 }}>N</Text>{" "}
                {amountFormatter(charges)}
              </Text>
            </View>
          </View>

        <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return (
              <Numberbtn key={index} onpress={() => handleSetAmount(number)}>
                {number}
              </Numberbtn>
            );
          })}

          <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
        </View>
        </View>
        <Bottombtn title="PROCEED" onpress={()=>setShowModal(true)}/>
      </View>
    </View>
  );
};

export default WithdrawPin;
