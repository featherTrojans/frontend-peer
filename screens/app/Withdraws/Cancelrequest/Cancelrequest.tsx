import { StyleSheet, Text, View, StatusBar, TextInput } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LottieView from "lottie-react-native"
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Cancelrequest.styles";
import { Backheader, Bottombtn, Custombutton, Horizontaline, Loader, Mainwrapper } from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";


const { Backarrow, Successcheckanimate, Forwardarrow } = icons;
const Cancelrequest = ({route, navigation}) => {
  // const {reference} = route.params
  const toast = useToast()
  const [checked, setChecked] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  
  const reasons = [
    "Mistake request",
    "The agent didn’t accept my cash request",
    "Long cash delivery time",
    "The agent seemed suspicious during the meet-up conversation",
    "Cash presented was in bad condition",
  ];

  const handleCancelRequest = async ()=>{
    setLoading(true)
    try{
      await axiosCustom({
        method:"DELETE",
        url:"/request/cancel",
        data:{
          reference: "dummyreason",
          reasonForCancel:reason
        }
      })
      setModalVisible(true)
    }catch(err){
      showerror(toast,err)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Mainwrapper >
      <Backheader title="Cancel Transaction"/>




      {loading && <Loader />}
      <Globalmodal
       showState={isModalVisible}
       
       btnFunction={() => navigation.navigate("Home") }
       >
           <View style={{ alignItems: "center" }}>
         
         <LottieView source={Successcheckanimate} style={{width: 148, height: 148, marginBottom: 10}} autoPlay loop/>
             <Text
               style={{
                 textAlign: "center",
                 marginHorizontal: 35,
                 marginVertical: 40,
                 ...fontsize.bsmall,
                 ...FONTS.regular,
               }}
             >Your request has been canceled successfully and your reason submitted </Text>
           </View>
      </Globalmodal>
      {/* Back Arrow */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <View>
            <Text style={{...fontsize.bbsmall, ...FONTS.regular, lineHeight: 25, marginBottom: 15}}>
            Cancel Request Feedback
            </Text>
            <Text style={{...fontsize.smaller, ...FONTS.regular, lineHeight: 20, color: COLORS.grey2}}>Please give us a reason why you want to cancel this transaction?</Text>
          </View>

          <View style={{marginTop: 54}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9, flex: 0.95}}> Mistake request </Text>
               <Forwardarrow />
            </View>
            <Horizontaline marginV={23}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9, flex: 0.95}}> Withdrawer wasn’t serious </Text>
               <Forwardarrow />
            </View>
            <Horizontaline marginV={23}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9, flex: 0.95}}> Long response time </Text>
               <Forwardarrow />
            </View>
            <Horizontaline marginV={23}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9, flex: 0.95}}> The withdrawer seemed suspicious during the then meet-up conversation </Text>
               <Forwardarrow />
            </View>
            <Horizontaline marginV={23}/>


            <Text style={{...fontsize.smaller, ...FONTS.regular, color: COLORS.purple2}}>Other Reason?</Text>

               {/* Other reason is active */}

               {false &&
            <TextInput multiline style={{backgroundColor: COLORS.white, height: 174, paddingVertical: 20, paddingHorizontal: 15, ...fontsize.smallest, ...FONTS.regular}} placeholder="Enter your reason…" textAlignVertical="top"/>
               }
          </View>


   
      </View>
            <View style={{paddingHorizontal: 15, paddingBottom: 20}}>
            <Custombutton  btntext="Submit Reason" onpress={() => console.log("cancel request")}/>

            </View>

      {/* <Bottombtn
        disabled={reason === ""}
        title="CANCEL REQUEST"
        onpress={handleCancelRequest}
      /> */}

    </Mainwrapper>
  );
};

export default Cancelrequest;
