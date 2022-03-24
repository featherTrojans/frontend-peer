import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "./Negotiate.style.";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { Bottombtn, Loader, Numberbtn, Sendingandreceive } from "../../../components";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import Globalmodal from "../../shared/Globalmodal/Globalmodal";
import { LocationContext } from "../../../context/LocationContext";
import Customstatusbar from "../../shared/Customstatusbar";
import { AuthContext } from "../../../context/AuthContext";
import { plusBase } from "../../../utils/utils";
const { Backarrow, SecureDot } = icons;

const Negotiate = ({ navigation, route}) => {
  const {requestInfo} = route.params;
  const {authdata} = useContext(AuthContext)
  const toast = useToast();
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];
  const [loading, setLoading] = useState(false)
  const [charges, setCharges] = useState<string>(requestInfo.charges);
  const [showmodal, setShowModal] = useState(false);
  

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
        setLoading(true)  
       const response =  await axiosCustom.put("/request/negotiate",{
            negotiatedFee: plusBase(charges),
            reference: requestInfo.reference
        })
        // console.log(response)
        setShowModal(true)
    }catch(err){
      showerror(toast,err)
    }finally{ 
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      {loading && <Loader />}

      <Customstatusbar />

      <Globalmodal 
        showState={showmodal}
        btnFunction={() => navigation.navigate("Home")}
        >
         <View style={{ alignItems: "center" }}>
           <Text style={{alignSelf:"flex-start"}}>Request Summary</Text>
             <View style={{flexDirection:"row",justifyContent:"space-between", marginVertical:20}}>
               <Sendingandreceive title="Wallet Debit" senderName={authdata?.userDetails?.fullName} receiverName={requestInfo?.agent || "A Z"}/>
              {/* <View
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
              /> */}
                </View>
              <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
                  Base charges has been succesfully changed
              </Text>
              <Text style={{backgroundColor:"#F2F5FF", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, marginVertical: 15 }}>
                Negotiation Charges: 
                <Text style={{...FONTS.bold}}>NGN {amountFormatter(charges)}</Text>
              </Text>
              {/* <Text style={{textAlign: "center",marginHorizontal: 40,marginVertical: 40,...fontsize.bsmall,...FONTS.regular,}}>
                Note that the base charge above can be negotiated by <Text style={{...FONTS.bold}}> {userInfo.username}</Text>
              </Text> */}
            </View>
      </Globalmodal>
      <View style={styles.mainContainer}>
        <View style={styles.backArrowConteiner}>
          <Backarrow />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Negotiate the base charge as fee
            
          </Text>
          <Text style={styles.enterPinText}>Enter Amount</Text>
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
        <Bottombtn title="PROCEED" onpress={handleSubmit}/>
      </View>
    </View>
  );
};

export default Negotiate;
