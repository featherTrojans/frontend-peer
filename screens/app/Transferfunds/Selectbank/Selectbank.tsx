import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Backheader, Custombutton, Horizontaline, Input, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import { electrictystyles } from '../../Billpayments/Electricity/Electricitytype/Electricitytype.styles'
import useCustomModal from '../../../../utils/useCustomModal'

const {Ashicon, Briefcaseicon, Forwardarrow}  =icons


const Eachoption = ({ type, image }) => {
    const { CustomModal, openModal } = useCustomModal();
    
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={electrictystyles.eachoption}
        onPress={openModal}
      >
        <CustomModal>
          <View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 35}}>
                <View>
                <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9, marginBottom: 0}}>Transfer to bank</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, lineHeight: 27, color: COLORS.grey16}}>Enter Account Details</Text>
                </View>
          
            {/* {showLogo(logotype)} */}
            
            </View>
            <View style={{justifyContent: "flex-end", flexDirection: "row", alignItems: "center"}}>
              <Text style={{...fontsize.xsmallest, ...FONTS.medium, color: COLORS.grey16}}>Charges</Text>
              <View style={{paddingVertical: 8,paddingHorizontal: 10, backgroundColor: COLORS.trasparentBlue2, marginLeft: 10, borderRadius: 18}}>
                <Text style={{...fontsize.xsmallest, ...FONTS.bold, color: COLORS.blue6}}>+ N100.00</Text>
              </View>
            </View>
  
            <View style={{marginTop: 25, marginBottom: 35}}>
            <Input icon={<Ashicon />} placeholder="Enter Amount" name="amount" inputbg={COLORS.inputBgColor}/>
            <Input icon={<Briefcaseicon />} placeholder="Bank Name" name="bankName" inputbg={COLORS.inputBgColor}/>
            <Input icon={<Briefcaseicon />} placeholder="Enter Account Number" name="accountNumber" inputbg={COLORS.inputBgColor}/>

            </View>
            
          <Custombutton btntext="Yeah, Continue" onpress={() => console.log("Bank Type", type)} />
            
          </View>
        </CustomModal>
  
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

const Selectbank = () => {


    const listOfbanks = [
        {
            name: "Access Bank",
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FAccess%20Bank%20PLC%20Logo%20(2).png?alt=media&token=386e3b4c-f645-408b-89cb-0b3e7cfe9322"
        },
        {
            name: "Alat by Wema",
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FWema%20Bank%20Logo%20(1).png?alt=media&token=4d398853-504c-4cac-84ff-cd6de0d83c36"
        },
        {
            name: "Ecobank",
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FEcobank%20Logo%20(1).png?alt=media&token=09741faa-a4cc-454a-952b-dbf4071784f8"
        },
        {
            name: "Fidelity Bank",
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFidelity%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=b7ad1461-de90-4311-94d2-d2287f3d99fa"
        },
        {
            name: "First Bank",
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFirst%20Bank%20Nigeria%20Logo%20(1).png?alt=media&token=c5699cab-aece-48fe-954e-578e534c942b"
        },
        {
            name: "First City Monument Bank",
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FFirst%20City%20Monument%20Bank%20Ltd%20Logo%20(1).png?alt=media&token=24d59412-c43f-49cf-bf03-2a42cada86a2"
        }
    ]





  return (
    <Mainwrapper>
        <Backheader title="Select Bank"/>


        <View style={{paddingHorizontal: 15,}}>

            <View style={{backgroundColor: COLORS.white, paddingHorizontal: 20, paddingBottom: 10, paddingTop: 22, borderRadius: 15}}>
            <Text>Choose your destination bank</Text>

            {listOfbanks.map(({name, logo}, index) => {
                const isLast = listOfbanks.length === index + 1;
                return (
                    <View key={index}>
                        <Eachoption type={name} image={logo}/>
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