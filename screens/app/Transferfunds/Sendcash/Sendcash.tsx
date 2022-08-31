import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ColorPropType } from 'react-native'
import React from 'react'
import { Backheader, Custombutton, Horizontaline, Input, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import useCustomModal from '../../../../utils/useCustomModal'
import { nameSplitter } from '../../../../utils/nameSplitter'
import { nameToShow } from '../../../../utils/nameToShow'


const {Ashicon} = icons






const Eachoption = ({name, phoneNumber}) => {
    
    return(
        <View style={{flexDirection: "row", paddingVertical: 20,  alignItems: "center"}}>
            <View style={{backgroundColor: COLORS.green2, width: 34, height: 34, justifyContent: "center", alignItems: "center", borderRadius: 34/2,}}>
                <Text style={{color: COLORS.white}}>G</Text>
            </View>
            <View style={{marginLeft: 12}}>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>{name}</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 5}}>{phoneNumber}</Text>
            </View>
            
        </View>
    )
}

const Sendcash = () => {




    const featherUsers = [
        {
            name: "Damilare Seyinde",
            phonenumber: "08189346273"
        },
        {
            name: "Rasaq Momoh",
            phonenumber: "09037482910"
        },
        {
            name: "Peterson Yeyejare",
            phonenumber: "07033112278"
        },
  

   
    ]
  return (
    <Mainwrapper>
        <Backheader title="Send Cash"/>



        <View style={{paddingHorizontal: 15, flex: 1}}>
            <Input icon={<Ashicon />} placeholder='Search phone numbers' name="searchUsername" inputbg={COLORS.white}/>





            <View style={{paddingHorizontal: 16, paddingVertical: 22, backgroundColor: COLORS.white, borderRadius: 15, flex: 1, }}>
                <Text style={{marginBottom: 20, ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Find feather users in your contact</Text>


                <ScrollView showsVerticalScrollIndicator={false} >

               
                {featherUsers.map(({name, phonenumber}, index) => {
                    const isLast = featherUsers.length === index + 1;
                    return (
                        <View key={index}>
                            <Eachoption name={name} phoneNumber={phonenumber}/>
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