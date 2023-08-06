import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FindmerchantScreenStyles } from "../assets/styles/screens";
import { FTSearchinput, FTTitlepagewrapper } from "../components";
import { icons } from "../constants";
import { useSwipemodal } from "../hooks";

const {Searchicon} = icons

const {} = FindmerchantScreenStyles;

const FindmerchantScreen = () => {

const [showModal, setShowModal] = useState(false)
const [content, setContent] = useState<any>({ child: null})


const ModalContent = () => {
  return (
    <View style={{ backgroundColor: "#fff", height: 200}}>
      <Text>The name one</Text>
    </View>
  )
}

const ModalCon = () => {
  return (
    <View style={{ backgroundColor: "#fff", height: 200}}>
      <Text>The name two</Text>
    </View>
  )
}


const switchModals = (value) => {
  switch (value) {
    case 0:
      setContent({child: <ModalContent />})
      setShowModal(s => !s)
      break;
    case 1:
      setContent({child: <ModalCon />})
      setShowModal(s => !s)
      break;

    default:
      break;
  }
}

  return (
    <>
    <FTTitlepagewrapper title="Find Merchant" modalChildren={content.child} showModal={showModal} setShowModal={setShowModal} modalHeight={400}>
      <FTSearchinput placeholder="Search Phone Number" />
    

      <Pressable onPress={() => switchModals(0)} style={{paddingHorizontal: 20, paddingVertical: 15, backgroundColor: "blue"}}>
        <Text style={{color: "#fff", textAlign: "center"}}>Toggle Modal</Text>
      </Pressable>
      <Pressable onPress={() => switchModals(1)} style={{paddingHorizontal: 20, paddingVertical: 15, backgroundColor: "blue"}}>
        <Text style={{color: "#fff", textAlign: "center"}}>Toggle Modal</Text>
      </Pressable>
      
    

      
    </FTTitlepagewrapper>
    
    </>
  );
};

export default FindmerchantScreen;

const styles = StyleSheet.create({});
