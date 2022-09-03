import { TouchableOpacity, Text, View,TextInput } from "react-native";
import React from "react";
import { styles } from "./Chatsdm.styles";
import Modal from "react-native-modal";
import { COLORS, FONTS, icons} from "../../../../constants";
const {  Outlinedlock,Arrowupicon,Lettercaseicon,Successcheckanimate } = icons;

import LottieView from "lottie-react-native"
const amounts = [
  {name:"50", value:50},
  {name: "100", value:100}, 
  {name:"200",value:200},
  {name: "500", value:500},
  {name: "1,000", value:1000}, 
  {name:"2,000",value:2000},
  {name: "5,000", value:5000}
]

const Chatsmodal = ({children, showState, onBgPress=()=>{}}) => {
    return(
  
      <Modal 
      style={{margin: 0, justifyContent: "flex-end",}} 
      isVisible={showState}
      backdropColor={COLORS.black}
      backdropOpacity={0.2}
      onBackdropPress={onBgPress}
      >
        <View style={styles.viewWrapper}>
          {children}
        </View>
      </Modal>
    )
  }
  

const AllChatsModal = ({
    nameOfActiveChat,
    handlePinChange,
    userPin,
    sendCash,
    loading,
    setAmount,
    handleAmountChange, 
    amount,
    setChooseAmount,
    setSendCashModal,
    setEnterPin,
    clearModalsAll,
    clearModals,
    sendcashModal,chooseAmount,enterPin,sendSuccess}:any) => {
    
    const handleToNext = ()=>{
      if(amount.value <= 0){
        return 
      }
      clearModals(); 
      setEnterPin(true)    
    }

  return (
        <>
        {/* Send cash or keep typing modal */}
        <Chatsmodal showState={sendcashModal} onBgPress={clearModalsAll}>
          
          <Text style={styles.sendCashHeader}>Hey Padi, want to send cash to <Text style={{textTransform: "capitalize"}}> {nameOfActiveChat}</Text> or is it just a text language?</Text>

              <View style={styles.sendCashWrapper}>

                  {/* First One */}
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>setChooseAmount(true)} style={[ {backgroundColor: COLORS.blue5},   styles.sendCashButton]}>
                    <View style={styles.buttonIconBg}>
                      <Arrowupicon />
                    </View>
                    <Text style={styles.buttonText}>Send Cash?</Text>
                  </TouchableOpacity>

                  {/* Second Button */}
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>setSendCashModal(false)} style={[{backgroundColor: COLORS.purple},   styles.sendCashButton]}>
                    <View style={styles.buttonIconBg}>
                      <Lettercaseicon />
                    </View>
                    <Text style={styles.buttonText}>Keep Typing?</Text>
                  </TouchableOpacity>
              </View>
          
          </Chatsmodal>


        {/* Choose amount to send */}


        <Chatsmodal showState={chooseAmount} onBgPress={clearModalsAll}>
          <Text style={styles.chooseAmountHeader}>How much do you want to send?</Text>

          <View style={styles.amountBlockWrap}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              {/* minus icon */}
                {/* <Minusicon /> */}
                <TextInput style={styles.addedAmountText}
                 keyboardType="numeric"
                 placeholder="N0.00"
                //  value={amount.value}
                 onChangeText={handleAmountChange} />
                {/* <Text style={styles.addedAmountText}>N0.00</Text> */}
              {/* Add icon */}
              {/* <Plusicon /> */}
            </View>
          </View>
          {/* Amount options */}
          <View style={styles.amountOptionsContainer}>
            {amounts.map((item, index) => {
              return (
                <TouchableOpacity onPress={()=>{setAmount(item);clearModals(); setEnterPin(true)}} activeOpacity={0.8} key={index} style={styles.amountOption}>
                    <Text style={styles.amountOptionText}>N{item.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <TouchableOpacity style={styles.buttonWrapper} onPress={()=>{handleToNext}}>
              <Text style={styles.buttonTextValue}>Proceed</Text>
          </TouchableOpacity>
        </Chatsmodal>   



      {/* Enter Secure Pin */}

      <Chatsmodal showState={enterPin} onBgPress={loading?()=>{}:clearModalsAll} >

        <Text style={styles.securePinHeader}>Amount to send : <Text style={{...FONTS.bold}}>N{amount.name}</Text> + N0 Charges</Text>

        <View style={styles.inputLockWrapper}>
          <Outlinedlock />
          <TextInput style={styles.securePinTextInput}
          secureTextEntry={true} 
          placeholder="Enter your secure 4 digit PIN" 
          placeholderTextColor={COLORS.grey2} 
          onChangeText={handlePinChange}
          value={userPin}
          maxLength={4} 
          keyboardType="numeric" />
        </View>

        <TouchableOpacity disabled={loading} activeOpacity={0.8} onPress={sendCash} style={ [styles.buttonWrapper,{opacity: (loading ? 0.8: 1) } ]}>
              <Text style={styles.buttonTextValue}>Transfer Cash</Text>
        </TouchableOpacity>

      </Chatsmodal>

              {/* Sending success Modal */}

      <Chatsmodal showState={sendSuccess} onBgPress={clearModalsAll}>
        <View style={{ alignItems: "center"}}>
        <LottieView source={Successcheckanimate} autoPlay loop style={{width: 118, height: 118, marginBottom: 15 }}/>
        <Text style={styles.sendingSuccessText}>Transaction Successful</Text>
        </View>
      </Chatsmodal>
      </>
  )
}

export default AllChatsModal







