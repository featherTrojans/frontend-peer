import React, { useMemo } from 'react'
import {View, Text, FlatList } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Horizontaline, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../constants'
import Customstatusbar from '../../shared/Customstatusbar'
import { cardstyles } from './Cards.styles'
import BottomSheet from "@gorhom/bottom-sheet";


const {Carddetailsicon,
  Cardfreezeicon,
  Cardfundicon,
  Cardlockicon,
  Cardwithdrawicon,
  Vcardicon, Historyicon} = icons





  const cardactions = [
    {
      title: "Details",
      Icon: Carddetailsicon
    },
    {
      title: "Top-up",
      Icon: Cardfundicon
    },
    {
      title: "Withdraw",
      Icon: Cardwithdrawicon
    },
    {
      title: "Lock",
      Icon: Cardlockicon
    },
    
    
  ]


function Cards() {



  const snapPoints = useMemo(() => ["25%", "65%", "98%"], []);

  return (
    <View style={[cardstyles.container, { paddingTop: getStatusBarHeight(true) }]}>
          <Customstatusbar />


        <View style={cardstyles.contentContainer}>


          <Text style={{...fontsize.big, ...FONTS.bold, marginTop: 30, marginBottom: 50}}>My Cards</Text>
            <View>

              <FlatList 
              data={[1,2]}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={() => {

                return (
                  <View style={{width: 297, height: 167, backgroundColor: COLORS.grey13, marginRight: 15, borderRadius: 17}}>
                  </View>
                )
              }}
              />


              <View style={{paddingHorizontal: 20, backgroundColor: COLORS.white, marginVertical: 20, paddingTop: 18, paddingBottom: 25, borderRadius: 16}}>
                <View style={{flexDirection: 'row'}}>
                  {/* icons */}
                  <Vcardicon />
                  <Text style={{marginLeft: 10, ...fontsize.xsmallest, ...FONTS.medium, color: COLORS.grey16}}>Virtual Card Actions</Text>
                </View>
                <Horizontaline marginV={18}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  {cardactions.map(({Icon, title}, index) => {
                    return (
                      <View key={index} style={{justifyContent: 'center', alignItems: "center"}}>
                        <View style={{width: 40, height: 40, borderRadius: 40/2, backgroundColor: COLORS.grey19, justifyContent: "center", alignItems: "center", marginBottom: 14}}>

                        <Icon />

                        </View>
                          <Text style={{...fontsize.xsmallest, ...FONTS.medium, color: COLORS.black}}>{title}</Text>
                      </View>
                    )
                  })}
                </View>

              </View>

            




            </View>

            <BottomSheet
              index={0}
              snapPoints={snapPoints}
              style={{
                paddingHorizontal: 24
              }}
              >
                <View style={{flexDirection: 'row', alignItems: "center", marginTop: 20}}>
                  {/* icons */}
                  <Historyicon />
                  <Text style={{marginLeft: 11, ...fontsize.xsmallest, ...FONTS.semibold, color: COLORS.black}}>Recents</Text>
                </View>

                <Horizontaline marginV={24}/>

              </BottomSheet>
        </View>
    </View>
  )
}

export default Cards