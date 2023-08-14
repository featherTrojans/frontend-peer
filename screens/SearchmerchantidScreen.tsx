import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchmerchantidScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTIconwithtitleandinfo,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { icons } from "../constants";
import { redirectTo } from "../utils";
const {} = SearchmerchantidScreenStyles;
const {Bluecardicon} = icons
const SearchmerchantidScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });


  const closeModalAndRedirect = () => {
    setShowModal(false)
    redirectTo("transactionsummary_screen")
  }

  const ModalContent = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text>Merchant Details</Text>
        <View
        style={{marginVertical: 35}}
        >

        
        <FTIconwithtitleandinfo 
        title="Lingo Dunkin Pepper & Soups"
        info="33 Transactions"
        onPress={() => console.log("Yes")}
        Icon={Bluecardicon}
        bG="red"
        />
        </View>
        <FTCustombutton btntext="Continue" onpress={closeModalAndRedirect} />
      </View>
    );
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <ModalContent />,height: 255 });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    switchModals(0)
  };

  return (
    <FTTitlepagewrapper
      title="Merchant ID"
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FTHeaderandsubheader
        header="Enter Merchant ID"
        subHeader="The merchant ID, is the unique Identifier that is assigned to a merchant to receive payments"
      />

      <FTInput
        label="Merchant ID"
        mT={40}
        placeholderText="Enter 10 digit ID"
        name="merchantid"
        control={control}
      />
      <View style={{ flex: 1 }}></View>

      <FTCustombutton btntext="Continue" onpress={handleSubmit(onSubmit)} />
    </FTTitlepagewrapper>
  );
};

export default SearchmerchantidScreen;

const styles = StyleSheet.create({});
