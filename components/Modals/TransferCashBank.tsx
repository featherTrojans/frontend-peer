import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, fontsize } from '../../constants'
import Input from '../Input/Input'
import Ashicon from '../../assets/icons/Ashicon'
import Briefcaseicon from '../../assets/icons/Briefcaseicon'
import axiosCustom from '../../httpRequests/axiosCustom'
import useAlert from '../../utils/useAlerts'
import Custombutton from '../Custombutton/Custombutton'
import DebounceLoading from '../../screens/shared/DebounceLoading'

const TransferCashBank = ({amount,bank, handleNext}) => {
  const [accountNumber, setAccountNumber] = useState("")
  const [loading, setLoading] = useState(false);
  const [accountInformation, setAccountInformation] = useState({});
  const {errorAlert} = useAlert();
  
  useEffect(()=>{
    if(accountNumber.length >= 10){
      getAccountDetails()
    }
  },[accountNumber])

  const getAccountDetails = async ()=>{
    setLoading(true);
    try{
      const response = await axiosCustom({
        method: "post",
        url: "/account/get",
        data: { account_number: accountNumber, bank_name: bank.value },
      });
      console.log('------------------------ACCOUNT INFORMATION--------------------------');
      console.log(response.data) 
      setAccountInformation(response?.data?.data)
    }catch(err){
      errorAlert(err)
    }
    setLoading(false);
  }

    const handleSelectAccountNumber = (acct)=>{
        setAccountNumber(acct)
    }

  return (
    <View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
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
            <Input icon={<Ashicon />} placeholder="Enter Amount" value={amount} name="amount" inputbg={COLORS.inputBgColor}/>
            <Input icon={<Briefcaseicon />} placeholder="Bank Name" name="bankName" value={bank.name} inputbg={COLORS.inputBgColor}/>
            <Input icon={<Briefcaseicon />} placeholder="Enter Account Number" 
            value={accountNumber} 
            onChangeText={handleSelectAccountNumber} 
            name="accountNumber" 
            inputbg={COLORS.inputBgColor}/>

            </View>
            <DebounceLoading error={false} loadbounce={loading} userinfo={{fullName:accountInformation?.account_name}} username="Bank" />
          <Custombutton btntext="Yeah, Continue" onpress={()=>handleNext()} />
            
          </View>
  )
}

export default TransferCashBank