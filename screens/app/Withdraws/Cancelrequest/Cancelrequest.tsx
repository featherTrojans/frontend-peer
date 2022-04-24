import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LottieView from "lottie-react-native"
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Cancelrequest.styles";
import { Bottombtn, Loader } from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";

const { Backarrow, Successcheckanimate } = icons;
const Cancelrequest = ({route, navigation}) => {
  const {reference} = route.params
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
          reference,
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
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <Customstatusbar />
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
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <View style={{ marginVertical: 35 }}>
          <Backarrow />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Cancel Request Feedback</Text>
          <Text style={styles.subheaderText}>
            Please give us a reason why you want to cancel your request?
          </Text>
        </View>

        {/* list of reasons */}

        <View>
          {reasons.map((reasontxt, index) => (
            <View style={styles.reasonContainer} key={index}>
              <BouncyCheckbox
                size={18}
                fillColor={COLORS.blue6}
                unfillColor={COLORS.white}
                text={reasontxt}
                isChecked={reasontxt === reason}
                disableBuiltInState        
                iconStyle={{
                  borderColor: checked ? COLORS.blue6 : COLORS.grey2,
                }}
                onPress={(isChecked: boolean) => {
                  setReason(reasontxt);
                }}
                textStyle={styles.checkboxText}
                style={{
                  alignItems: "flex-start",
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <Bottombtn
        disabled={reason === ""}
        title="CANCEL REQUEST"
        onpress={handleCancelRequest}
      />

    </SafeAreaView>
  );
};

export default Cancelrequest;
