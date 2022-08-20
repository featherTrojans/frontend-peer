import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Backheader, Custombutton, Horizontaline, Input, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import { electrictystyles } from '../../Billpayments/Electricity/Electricitytype/Electricitytype.styles'
import useCustomModal from '../../../../utils/useCustomModal'

const {Ashicon, Briefcaseicon, Forwardarrow}  =icons


const Eachoption = ({ type }) => {
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
          {/* {logo} */}
          <View style={{backgroundColor: COLORS.lightBlue, width: 34, height: 34, borderRadius: 34/2}}/>
          {/* {showLogo(logotype)} */}
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
            logo: ""
        },
        {
            name: "Alat by Wema",
            logo: ""
        },
        {
            name: "Ecobank",
            logo: ""
        },
        {
            name: "Fidelity Bank",
            logo: ""
        },
        {
            name: "First Bank",
            logo: ""
        },
        {
            name: "First City Monument Bank",
            logo: ""
        }
    ]





  return (
    <Mainwrapper>
        <Backheader title="Select Bank"/>


        <View style={{paddingHorizontal: 15,}}>

            <View style={{backgroundColor: COLORS.white, paddingHorizontal: 20, paddingBottom: 10, paddingTop: 22}}>
            <Text>Choose your destination bank</Text>



            {listOfbanks.map(({name}, index) => {
                const isLast = listOfbanks.length === index + 1;
                return (
                    <View key={index}>
                        <Eachoption type={name} />
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