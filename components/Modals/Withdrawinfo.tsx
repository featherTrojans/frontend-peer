import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { COLORS, FONTS, fontsize, icons } from '../../constants'
import Custombutton from '../Custombutton/Custombutton'
import { useNavigation } from '@react-navigation/native'
import { nameSplitter } from '../../utils/nameSplitter'
import { LocationContext } from '../../context/LocationContext'
const {Purplechaticon, Editicon} = icons

const Withdrawinfo = ({openNextModal, withdrawInfo, closeModal}) => {
  const {coords} = useContext(LocationContext)
  const navigation =useNavigation()
  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 40}}>
        <View style={{width: 48, height: 48, borderRadius: 48/2, justifyContent: 'center', alignItems: "center", backgroundColor: COLORS.blue9, marginBottom: 22}}>
          <Text style={{...fontsize.bbsmall, color: COLORS.white, ...FONTS.medium}}>{nameSplitter(withdrawInfo.fullName)}</Text>
        </View>
        <Text style={{...fontsize.small, ...FONTS.medium, color: COLORS.blue9}}>{withdrawInfo.fullName}</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 7}}>{withdrawInfo.duration}</Text>
      </View>


        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular, marginBottom: 10}}>Meetup Point (your comfort/safe zone)</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <View>
            <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>{coords?.locationText}</Text>
            </View>
            <TouchableOpacity onPress={()=>{closeModal(); navigation.navigate("Meetuppoint", withdrawInfo)}}>
              <Editicon />
            </TouchableOpacity>
        </View>
      <Custombutton btntext='Yeah Proceed' onpress={openNextModal}/>
    </View>
  )
}

export default Withdrawinfo

const styles = StyleSheet.create({})