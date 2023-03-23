import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Backheader, Horizontaline, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { profilestyles } from "./Profile.styles";
import useCustomModal from "../../../utils/useCustomModal";

const Personalinfo = ({navigation}) => {


  const {openModal,closeModal, CustomModal} = useCustomModal()


  function reNavigate(newScreen: String){
    closeModal()
    navigation.navigate(newScreen)
  }



  return (
    <Mainwrapper>
      <Backheader />



    <CustomModal>
      <View style={{marginVertical: 40}}>
        <Pressable onPress={() => reNavigate("Changeappearance")}>
        <Text style={profilestyles.personalModalText}>Change Appearance</Text>
        </Pressable>
          <Horizontaline marginV={20}/>
        <Text style={profilestyles.personalModalText}>Edit fullname</Text>
          <Horizontaline marginV={20}/>
        <Text style={profilestyles.personalModalText}>Change @ Feather tag</Text>
      </View>
    </CustomModal>




      <View style={profilestyles.personalUserImageWrap}>
        <View style={profilestyles.personalUserImageBorder}>
          <View style={profilestyles.personalImageBg}>{/* icons */}</View>
        </View>
        <Text style={[profilestyles.personalNames, { marginBottom: 8 }]}>
          Ishaya Bello
        </Text>
        <Text style={profilestyles.personalNames}>@ishayabello100bells</Text>
      </View>


      <Pressable onPress={openModal} style={{width: 30, height: 30, backgroundColor: 'red'}}/>
      <Pressable onPress={() => navigation.navigate("Accountlevel")} style={{width: 30, height: 30, backgroundColor: 'blue'}}/>


      <View
        style={[
          profilestyles.personalEachOverlapBlock,
          { height: 200, backgroundColor: COLORS.white, zIndex: 2 },
        ]}
      >
        <Text style={profilestyles.personalEachBlockHeader}>
          Account KYC Level
        </Text>
        <Text style={profilestyles.personalEachBlockSubHeader}>
          Your KYC Level
        </Text>
      </View>

      <View
        style={[
          profilestyles.personalEachOverlapBlock,
          { height: "45%", backgroundColor: COLORS.blue16, zIndex: 1 },
        ]}
      >
        <View>
          <Text style={profilestyles.personalEachBlockHeader}>
            My Personal Info
          </Text>
          <Text style={profilestyles.personalEachBlockSubHeader}>
            Manage all your saved data here
          </Text>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Personalinfo;

const styles = StyleSheet.create({});
