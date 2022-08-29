import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { Backheader, Custombutton, Horizontaline, Input, Mainwrapper } from '../../../../../components'
import { electrictystyles } from '../../Electricity/Electricitytype/Electricitytype.styles'
import { COLORS, FONTS, fontsize, icons } from '../../../../../constants';
import useCustomModal from '../../../../../utils/useCustomModal';
import { getBottomSpace } from 'react-native-iphone-x-helper';


const {Ekoelectricityicon, Searcontacticon, Gloicon, Ikejaelectricityicon, Ashicon, Briefcaseicon, Forwardarrow, Mtnlogo} = icons


const Eachoption = ({ logo, type }) => {
    const { CustomModal, openModal } = useCustomModal();

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={electrictystyles.eachoption}
        onPress={openModal}
      >
        <CustomModal>
          <View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Mobile Data Purchase</Text>
            <Image source={{uri: logo}} style={{width: 34, height: 34, borderRadius: 34/2}}/>
            
            </View>
       
           
  
            <View style={{marginTop: 25, marginBottom: 35}}>
            <Input icon={<Ashicon />} placeholder="Enter meter number" name="plan" inputbg={COLORS.inputBgColor}/>
            <Input icon={<Briefcaseicon />} placeholder="Network Type" name="network" inputbg={COLORS.inputBgColor}/>
            <Input icon={<Briefcaseicon />} placeholder="Enter Amount" name="phone" inputbg={COLORS.inputBgColor}/>
            <View style={{flexDirection: "row", alignItems: "center", backgroundColor: COLORS.trasparentPurple, alignSelf: "flex-start", paddingVertical: 9, paddingHorizontal: 14, borderRadius: 18}}>
                
                <Searcontacticon />
                <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.purple2, marginLeft:8}}>Search Contacts</Text>
            </View>
            </View>
            
            
          <Custombutton btntext="Yeah, Continue" onpress={() => console.log("hellow")} />
            
          </View>
        </CustomModal>
  
        <View style={electrictystyles.logoandtitlewrap}>
          <Image source={{uri: logo}} style={{width: 34, height: 34, borderRadius: 34/2}}/>
          <Text style={electrictystyles.optiontitle}>{type}</Text>
        </View>
        <Forwardarrow />
      </TouchableOpacity>
    );
  };


const Dataplan = ({navigation, route}) => {
    const { image, subdata } = route?.params;
    const {suboptions} = subdata



  return (
    <Mainwrapper>
        <Backheader title="Select a  Plan"/>

        <View style={{ paddingHorizontal: 15, flex: 1,paddingBottom: getBottomSpace()+60  }}>
        <View style={[electrictystyles.blockwrap, ]}>
          <Text style={electrictystyles.headertext}>Select Mobile Data Package</Text>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {suboptions.map(({ type }, index) => {
            const isLast = suboptions.length === index + 1;
            return (
              <View key={index}>
                <Eachoption logo={image} type={type} />
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            );
          })}
          </ScrollView>
        </View>
      </View>
      
    </Mainwrapper>
  )
}

export default Dataplan

const styles = StyleSheet.create({})