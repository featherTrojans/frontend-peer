import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Cancelrequest.styles";
import { Bottombtn, Loader } from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";

const { Backarrow } = icons;
const Cancelrequest = ({route}) => {
  const {reference} = route.params
  const toast = useToast()
  const [checked, setChecked] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false)
  console.log(reason)
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
      const response = await axiosCustom({
        method:"DELETE",
        url:"/request/cancel",
        data:{
          reference,
          reasonForCancel:reason
        }
      })
      console.log(response)
    }catch(err){
      showerror(toast,err)
    }finally{
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {/* Back Arrow */}
      <StatusBar />
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
        title="CANCEL REQUEST"
        onpress={handleCancelRequest}
      />

    </View>
  );
};

export default Cancelrequest;
