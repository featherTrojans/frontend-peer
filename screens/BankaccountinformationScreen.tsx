import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BankaccountinformationScreenStyles } from "../assets/styles/screens";
import { FTCustombutton, FTDetailsModal, FTInput, FTTitlepagewrapper } from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";
import { icons } from "../constants";

const {} = BankaccountinformationScreenStyles;
const {Blacksendicon} = icons

const BankaccountinformationScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null });



  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({child: <FTDetailsModal 
        modalTitle="Bank Details"
        title="Setonji Avoseh Oluwapamilerin"
        info="7237267020 - Palmpay MFB"
        onPress={() => console.log("Ypu pressed")}
        Icon={Blacksendicon}
        bG={"red"}
        
        />})
        setShowModal(s => !s)
        break;
  
      default:
        break;
    }
  }

  const onSubmit = (datas) => {
    console.log(datas);
  };
  return (
    <FTTitlepagewrapper 
    title="Bank account information"
    modalChildren={content.child} 
    showModal={showModal} 
    setShowModal={setShowModal} 
    modalHeight={276}
    >
      <FTInput
        placeholderText="Enter Number"
        label="Enter destination bank account"
        name="accountNumber"
        control={control}
        textInputProps={{
          maxLength: 11,
          keyboardType: "number-pad",
        }}
        rules={VALIDATION.ACCOUNT_NUMBER_INPUT_VALIDATION}
        mB={20}
        mT={20}
      />
      <FTCustombutton btntext="Continue" onpress={() => switchModals(0)} />
    </FTTitlepagewrapper>
  );
};

export default BankaccountinformationScreen;

const styles = StyleSheet.create({});
