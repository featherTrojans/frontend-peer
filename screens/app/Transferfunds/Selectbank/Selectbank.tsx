import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Backheader, Custombutton, Horizontaline, Input, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import { electrictystyles } from '../../Billpayments/Electricity/Electricitytype/Electricitytype.styles'
import useCustomModal from '../../../../utils/useCustomModal'
import axiosCustom from '../../../../httpRequests/axiosCustom'
import useAlert from '../../../../utils/useAlerts'
import { nameSplitter } from '../../../../utils/nameSplitter'
import { nameToShow } from '../../../../utils/nameToShow'
import TransferCashBank from '../../../../components/Modals/TransferCashBank'

const {Ashicon, Briefcaseicon, Forwardarrow}  =icons



const listOfbanks = [
  {
      value:"ACCESS",
      name: "Access Bank",
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FAccess%20Bank%20PLC%20Logo%20(2).png?alt=media&token=386e3b4c-f645-408b-89cb-0b3e7cfe9322"
  },
  {
      value: "WEMA",
      name: "Alat by Wema",
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FWema%20Bank%20Logo%20(1).png?alt=media&token=4d398853-504c-4cac-84ff-cd6de0d83c36"
  },
  {
      value: "ECOBANK",
      name: "Ecobank",
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FEcobank%20Logo%20(1).png?alt=media&token=09741faa-a4cc-454a-952b-dbf4071784f8"
  },
  {
      value: "FIDELITY",
      name: "Fidelity Bank",
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFidelity%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=b7ad1461-de90-4311-94d2-d2287f3d99fa"
  },
  {
      value: "FIRST",
      name: "First Bank",
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFirst%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=c5699cab-aece-48fe-954e-578e534c942b"
  },
  {
      value: "",
      name: "First City Monument Bank",
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFirst%20City%20Monument%20Bank%20Ltd%20Logo%20(1).png?alt=media&token=24d59412-c43f-49cf-bf03-2a42cada86a2"
  }
]

const Eachoption = ({ type, image, value, setBank, openModal }) => {
    
    
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={electrictystyles.eachoption}
      onPress={()=>{setBank(value); openModal()}}
    >
     
      <View style={electrictystyles.logoandtitlewrap}>
        <Image
      style={{width: 34, height: 34, borderRadius: 34/2}}
      source={{
        uri: image
      }}
    />
        <Text style={electrictystyles.optiontitle}>{type}</Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};



const Selectbank = ({navigation, route}) => {
  const amount = route.params
  console.log('------------------------DEBUG--------------------------');
  console.log(amount);
  const { CustomModal, openModal } = useCustomModal();
  const {CustomModal:TransactiondetailsModal, 
        openModal:openTransactionDetailsModal, 
        closeModal:closeTransactionDetailsModal} = useCustomModal()
  const [bank, setBank] = useState({name:"",logo:"",value:""})
  const [accountNumber, setAccountNumber] = useState("");
  const [accountInformation, setAccountInformation] = useState({});


  const handleNextBankCash = ()=>{

  }

  return (
    <Mainwrapper>
        <Backheader title="Select Bank"/>
        <CustomModal>
          <TransferCashBank bank={bank} handleNext={handleNextBankCash} amount={amount}/>
        </CustomModal>
        <TransactiondetailsModal>
        <View>
              <View style={{ justifyContent: "center", alignItems: "center"}}>
                  <View style={{width: 48, height: 48, borderRadius: 48/2,marginBottom: 22, backgroundColor: COLORS.blue9, justifyContent: "center", alignItems: "center"}}>
                      <Text style={{color: COLORS.white}}>{nameSplitter(accountInformation?.account_name || "  " )}</Text>
                  </View>
                  <Text style={{color: COLORS.blue9, ...fontsize.small, ...FONTS.medium, lineHeight: 27}}>{accountInformation?.account_name}</Text>
                  {/* <Text style={{...fontsize.smallest, color: COLORS.halfBlack}}>@{userinfo?.username}</Text> */}
              </View>
              <View style={{marginVertical: 36}}>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Amount to send</Text>
                      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>N{amount}</Text>
                  </View>
                  <Horizontaline marginV={21}/>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Charges</Text>
                      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.purple4, lineHeight: 27}}>+N100.00</Text>
                  </View>
                  <Horizontaline marginV={21}/>
                  <Text style={{...fontsize.smallest, lineHeight: 27, ...FONTS.regular}}>Total Amount to send to {nameToShow(accountInformation?.account_name || "  ")}</Text>
                  <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.green1}}>N{amount}</Text>
              </View>
              <Custombutton btntext="Great, Proceed" onpress={()=>{navigation.navigate("Transferpin",{info: {...accountInformation,amount}, onpress:handleTransferToFeather})}}/>
          </View>
        </TransactiondetailsModal>

        <View style={{paddingHorizontal: 15,}}>

            <View style={{backgroundColor: COLORS.white, paddingHorizontal: 20, paddingBottom: 10, paddingTop: 22, borderRadius: 15}}>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9, lineHeight: 27}}>Choose your destination bank</Text>

            {listOfbanks.map(({name, logo, value}, index) => {
                const isLast = listOfbanks.length === index + 1;
                return (
                    <View key={index}>
                        <Eachoption openModal={openModal} setBank={setBank} type={name} image={logo} value={{name,logo,value}} />
                        {!isLast && <Horizontaline marginV={0} />}
                    </View>
                )
            })}
            </View>
        </View>
    </Mainwrapper>
  )
}

export default Selectbank

const styles = StyleSheet.create({})