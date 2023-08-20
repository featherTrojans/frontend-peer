import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FTCustombutton, FTIconwithbg, FTTitlepagewrapper } from '../components'
import { COLORS, FONTS, fontsize, icons } from '../constants'

const {Blacksendicon, Cancelwithdrawicon, Phoneicon, Chaticon} = icons

const WithdrawcashScreen = () => {


    const withdrawcashActions = [
        {
            Icon: Phoneicon,
            bg: COLORS.Tgreen3,
            title: "Phone",
            action: ""
        },
        {
            Icon: Chaticon,
            bg: COLORS.Tyellow4,
            title: "Chat",
            action: ""
        },
        {
            Icon: Cancelwithdrawicon,
            bg: COLORS.Tred4,
            title: "Cancel",
            action: ""
        }
    ]






  return (
    <FTTitlepagewrapper title='Withdraw Cash'>
     <View style={{flex: 1, paddingBottom: 60}}>

        <View style={{alignSelf: "center", justifyContent: "center", alignItems: "center"}}>
        <View style={{alignSelf: "center", alignItems: "center"}}>
            <FTIconwithbg
            Icon={Blacksendicon}
            bG={COLORS.Tblue}
            size={86}
            />
        
            <Text style={{...fontsize.bsmall, ...FONTS.bold, color: COLORS.blue9, marginBottom: 13, marginTop: 35}}>Mayowa Adekoya</Text>
            <Text style={{...fontsize.smallest, ...FONTS.semibold, color: COLORS.grey2}}>33 Transactions</Text>
        </View>


        <View style={{flex: 1, justifyContent: "center"}}>
            <Text style={{...fontsize.bxmedium, ...FONTS.bold,}}>15 Mins Away</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, marginTop: 25, marginBottom: 30}}>Gberigbe Field, Gberigbe Ikorodu</Text>
            <View style={{backgroundColor: COLORS.Tblue6, paddingVertical: 12, paddingHorizontal: 20, alignSelf: "center", borderRadius: 10}}>
                <Text style={{...fontsize.xxsmallest, ...FONTS.semibold, color: COLORS.blue16}}>View on maps</Text>
            </View>
        </View>


        <View style={{flexDirection: "row", width: 250, justifyContent: "space-between",}}>
        {withdrawcashActions.map(({Icon, bg, title}) => {
            return (
                <View style={{alignItems: "center"}}>
                    <FTIconwithbg 
                    Icon={Icon}
                    bG={bg}
                    />
                    <Text style={{...fontsize.xxsmallest, ...FONTS.medium, color: COLORS.blue9, marginTop: 15}}>{title}</Text>
                </View>
            )
        })}
        </View>

        
        </View>
    </View>




    <FTCustombutton 
    onpress={() => console.log()}
    btntext='Pay Merchant'
    bg={COLORS.blue9}
    
    />
    </FTTitlepagewrapper>
  )
}

export default WithdrawcashScreen

const styles = StyleSheet.create({})