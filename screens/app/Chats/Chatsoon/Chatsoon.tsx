import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native"
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import { styles } from '../Chatshome/Chatshome.styles'
import Customstatusbar from '../../../shared/Customstatusbar'


const {Feathecomingsoonchatanimate} = icons

const Chatsoon = () => {
  return (
    <View style={styles.container}>
        <Customstatusbar />
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatText}>Chats</Text>
          {/* <View style={styles.amountOfChatsContainer}> */}
            {/* <Text style={styles.amountOfChats}>6</Text> */}
          {/* </View> */}
        </View>
      <View style={{marginTop: 50, justifyContent: "center", alignItems: "center", marginHorizontal: 62}}>
          {/* JSON animations */}
            <LottieView source={Feathecomingsoonchatanimate} autoPlay loop style={{width: 160, height: 160}}/>
          <Text style={{...fontsize.bsmall, ...FONTS.medium, lineHeight: 25, textAlign: "center"}}>
          Padi, Feather Chat is coming to you very soon and you will be notified once it is ready.
          </Text>
      </View>
    </View>
  )
}

export default Chatsoon

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white
//     }
// })