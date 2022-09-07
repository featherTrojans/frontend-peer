import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ColorPropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Backheader, Custombutton, Horizontaline, Input, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import useCustomModal from '../../../../utils/useCustomModal'
import { nameSplitter } from '../../../../utils/nameSplitter'
import { nameToShow } from '../../../../utils/nameToShow'
import useContact from '../../../../utils/customContact'
import axiosCustom from '../../../../httpRequests/axiosCustom'
import useAlert from '../../../../utils/useAlerts'
import amountFormatter from '../../../../utils/formatMoney'


const {Ashicon} = icons



const Eachoption = ({name, phoneNumber}) => {
    
    return(
        <View style={{flexDirection: "row", paddingVertical: 20,  alignItems: "center"}}>
            <View style={{backgroundColor: COLORS.green2, width: 34, height: 34, justifyContent: "center", alignItems: "center", borderRadius: 34/2,}}>
                <Text style={{color: COLORS.white}}>{nameSplitter(name)}</Text>
            </View>
            <View style={{marginLeft: 12}}>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>{name}</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 5}}>{phoneNumber}</Text>
            </View>
            
        </View>
    )
}
   

const Sendcash = ({navigation, route}) => {
    const amount = route.params
    const { contactsResolved} = useContact();
    const [contacts, setContacts] = useState([]);
    const {CustomModal: TransferdetailsModal, openModal: openTransferdetailsModal, closeModal:closeTransferdetailsModal} = useCustomModal()
    const [activeContact, setActiveContact] = useState({})
    const [phonenumbertext, setPhonenumbertext] = useState("");
    useEffect(()=>{
        setContacts(contactsResolved);
    },[contactsResolved])
    
    const handleTransferToFeather = async (userPin)=>{
        try{
            await axiosCustom.post("/transfer",{amount:Number(amount),transferTo:activeContact?.username, userPin})
            return 'Your cash transfer was successful';
        }catch(err){
          console.log(err.response)
          throw err;
        }
      }
    
     const handlePhonechange = (text)=>{
        setPhonenumbertext(text)
        const searchtext = text.toLowerCase()
        setContacts(contactsResolved.filter((contact)=> contact?.fullName?.toLowerCase()?.includes(searchtext) || contact?.phoneNumber?.includes(text) || contact?.username?.toLowerCase().includes(text)  ))
     } 

    return (
    <Mainwrapper>
        <Backheader title="Send Cash"/>


        <TransferdetailsModal>
                <View>
                    <View style={{ justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: 48, height: 48, borderRadius: 48/2,marginBottom: 22, backgroundColor: COLORS.blue9, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{color: COLORS.white, ...fontsize.bbsmall, ...FONTS.medium}}>{nameSplitter(activeContact?.fullName || "  " )}</Text>
                        </View>
                        <Text style={{color: COLORS.blue9, ...fontsize.small, ...FONTS.medium, lineHeight: 27, textTransform: "capitalize"}}>{activeContact?.fullName}</Text>
                        <Text style={{...fontsize.smallest, color: COLORS.halfBlack, ...FONTS.regular, textTransform: "capitalize"}}>@{activeContact?.username}</Text>
                    </View>


                    <View style={{marginVertical: 36}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Amount to send</Text>
                            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27, }}>N{amountFormatter(amount)}</Text>
                        </View>
                        <Horizontaline marginV={21}/>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Charges</Text>
                            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.purple4, lineHeight: 27}}>+N{amountFormatter(0)}</Text>
                        </View>
                        <Horizontaline marginV={21}/>
                        <Text style={{...fontsize.smallest, lineHeight: 27, ...FONTS.regular}}>Total Amount to send to {nameToShow(activeContact?.fullName || "  ")}</Text>
                        <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.green1}}>N{amount}</Text>
                    </View>
                    <Custombutton btntext="Great, Proceed" onpress={()=>{closeTransferdetailsModal(); navigation.navigate("Transferpin",{info: {...activeContact,amount}, onpress:handleTransferToFeather})}}/>
                </View>
      </TransferdetailsModal>

        <View style={{paddingHorizontal: 15, flex: 1}}>
            <Input icon={<Ashicon />} value={phonenumbertext} onChangeText={handlePhonechange} placeholder='Search phone numbers' name="searchUsername" inputbg={COLORS.white}/>


            <View style={{paddingHorizontal: 16, paddingVertical: 22, backgroundColor: COLORS.white, borderRadius: 15, flex: 1, }}>
                <Text style={{marginBottom: 20, ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Find feather users in your contact</Text>


                <ScrollView showsVerticalScrollIndicator={false} >

               
                {contacts?.map((contact, index) => {
                    const isLast = contactsResolved.length === index + 1;
                    return (
                        <View key={index}>
                            <TouchableOpacity onPress={()=>{openTransferdetailsModal(); setActiveContact(contact)}}>
                                <Eachoption name={contact.fullName} phoneNumber={contact.phoneNumber}/>
                            </TouchableOpacity>
                                {!isLast && <Horizontaline marginV={0} />}
                        </View>
                    )
                })}
                 </ScrollView>

            </View>
        </View>



    </Mainwrapper>
  )
}

export default Sendcash

const styles = StyleSheet.create({})