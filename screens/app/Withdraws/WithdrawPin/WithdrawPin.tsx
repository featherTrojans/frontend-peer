import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import {
  Backheader,
  Keyboard,
  Loader,
  Mainwrapper,
  Successmodal,
} from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import { AuthContext } from "../../../../context/AuthContext";
import { securepinstyles } from "../../../auth/signup/Securepin/Securepin.styles";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useCustomModal from "../../../../utils/useCustomModal";
import { getFirstName } from "../../../../utils/nameSplitter";
import useAlert from "../../../../utils/useAlerts";

const { Backarrow, SecureDot, Successcheckanimate } = icons;

const WithdrawPin = ({ navigation, route }) => {
  const info = route.params;
  const { authdata } = useContext(AuthContext);
  const {purpleAlert, errorAlert, successAlert} = useAlert()
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string[]>([]);
  const [successModal, setSuccessModal] = useState(false);
  const {CustomModal,closeModal,openModal} = useCustomModal()


  useEffect(()=>{
    purpleAlert("Kindly note that 3 failed pin attempts - declines the transaction and cancels automatically.")
  },[])

  const amountFormatter = (value: string) => {
    return (
      Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
    );
  };

  const handleSetAmount = (value: string) => {
    if (pin.length < 4) {
      setPin((oldpin) => [...oldpin, value]);
      if(pin.length === 3){
        handleApproveRequest([...pin,value])
      }
    }
  };


  const handleRemoveAmount = () => {
    if (pin.length > 0) {
      const newdata = [...pin];
      newdata.pop();
      setPin(newdata);
    }
  };
  const handlePrepareToTestUpdate = async (status: string) => {
    const washingtonRef = doc(db, "withdrawtransfer", info.reference);
    await updateDoc(washingtonRef, {
      status: status,
    });
  };
  const checkIfDocExist = async () => {
    const document = await getDoc(
      doc(db, "withdrawtransfer", info.reference)
      );
      if (document.exists()) {
        if (document.data().status === "pending") {
          return true;
        } else {
          throw {
            response: {
              data: {
                message: `Pls swipe 'Make Payment' on @${info?.username}'s device to continue`,
              },
            },
          };
        }
      } else {
        throw {
          response: {
            data: {
              message: `Pls swipe 'Make Payment' on @${info?.username}'s device to continue`,
            },
          },
        };
      }
    };
    
    const handleApproveRequest = async (pin) => {
      const joinpin = pin.join("");
      console.log('------------------------PIN--------------------------');
      console.log(pin)
      if (joinpin.length < 4) {
        return false;
      }
      setLoading(true);
      try {
        // check if document exist
        console.log(1);
        await checkIfDocExist();
        console.log(2);
        await axiosCustom.post("/request/approve", {
          reference: info.reference,
          user_pin: joinpin,
        });
        console.log(3);
        await handlePrepareToTestUpdate("approved");
        console.log(4);
        //show success message
        openModal()
        successAlert("Your cash withdrawal transaction was successful and you've been credited.")
      } catch (err) {
        errorAlert(err)
        // check the error, don't reject for pin error
        if (err?.response?.data?.message === "Incorrect Pin") {
          return;
        }
      console.log(5);
      await handlePrepareToTestUpdate("rejected");
      console.log(6);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainwrapper>
      {loading && <Loader />}
      <CustomModal hideOnTap={false}>
        <Successmodal btnText="Great Continue" successMsg="Your transaction was successful, cash has been received from receiver" btnFunction={()=>navigation.navigate("Transactionsrating",info)}/>
      </CustomModal>
      <Backheader title="Complete Transaction" />
    <View style={{paddingHorizontal: 15, flex: 1}}>
            <View style={{marginTop: 0}}>
              <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 20, textAlign: "center"}}>Hey <Text style={{textTransform: "capitalize"}}>{getFirstName(info?.fullName)}</Text>, kindly input your transaction pin to complete this transaction of N{amountFormatter(info?.amount)} </Text>
            </View>
              <View style={{ alignItems: "center", flex: 1, justifyContent: "center"}}>
                <Text style={{marginBottom: 60, ...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9}}>Enter your Feather PIN</Text>


                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <View style={securepinstyles.pinInputContainer}>
                    <View
                  style={[
                    securepinstyles.pinView,
                    { backgroundColor: pin[0] ? COLORS.blue6 : COLORS.grey3 },
                  ]}
                />
                <View
                  style={[
                    securepinstyles.pinView,
                    { backgroundColor: pin[1] ? COLORS.blue6 : COLORS.grey3 },
                  ]}
                />
                <View
                  style={[
                    securepinstyles.pinView,
                    { backgroundColor: pin[2] ? COLORS.blue6 : COLORS.grey3 },
                  ]}
                />
                <View
                  style={[
                    securepinstyles.pinView,
                    { backgroundColor: pin[3] ? COLORS.blue6 : COLORS.grey3 },
                  ]}
                />
              </View>
            </View>
          </View>
            

        <View>

        </View>
      </View>


      <Keyboard  array={[...numbers ]} setDigit={handleSetAmount} removeDigit={handleRemoveAmount}/>

      <View>
        <Text style={{textAlign: "center", marginBottom: 20, ...fontsize.smaller, ...FONTS.medium, color: COLORS.red4}}>0 / 3 Attempts</Text>
      </View>

        {/* <Bottombtn
          title="PROCEED"
          onpress={() => {
            if (Number(charges) <= 0) {
              showerror(
                toast,
                null,
                "sorry you have to input a fair amount to continue"
              );
              return;
            }
            setShowModal(true);
          }}
        /> */}



    </Mainwrapper>
  );
};

export default WithdrawPin;
