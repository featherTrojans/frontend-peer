import { TouchableOpacity, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { styles } from "./Chatsdm.styles";
import Modal from "react-native-modal";
import { COLORS, FONTS, icons } from "../../../../constants";
const { Outlinedlock, Arrowupicon, Lettercaseicon, Successcheckanimate } =
  icons;

import LottieView from "lottie-react-native";
import Chatmodal from "./Chatmodal";
const amounts = [
  { name: "50", value: 50 },
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "500", value: 500 },
  { name: "1,000", value: 1000 },
  { name: "2,000", value: 2000 },
  { name: "5,000", value: 5000 },
];

// const Chatsmodal = ({children, showState, onBgPress=()=>{}}) => {
//     return(

//       <Modal
//       style={{margin: 0, justifyContent: "flex-end",}}
//       isVisible={showState}
//       backdropColor={COLORS.black}
//       backdropOpacity={0.2}
//       onBackdropPress={onBgPress}
//       >
//         <View style={styles.viewWrapper}>
//           {children}
//         </View>
//       </Modal>
//     )
//   }

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
  sendcashModal,
  chooseAmount,
  enterPin,
  sendSuccess,
  inputFocus
}: any) => {
  const [modalOneVisible, setModalOneState] = React.useState(false);
  const [modalTwoVisible, setModalTwoState] = React.useState(false);
  const [modalThreeVisible, setModalThreeState] = React.useState(false);
  const [modalFourVisible, setModalFourState] = React.useState(false);
  const [toSend, setToSend] = React.useState(false)
  const [cancelChooseAmount, setCancelChooseAmount] = React.useState(false)

  // Modal One
  const toggleModalOne = () => {
    // setModalOneState((s) => !s);
    setSendCashModal((s) => !s);
  };

  // Modal Two
  const toggleModalTwo = (e) => {
    setCancelChooseAmount(false)
    setModalTwoState((s) => !s);
  };

  // Modal Three
  const toggleModalThree = (e) => {
    setEnterPin((s) => !s);
    // setModalThreeState((s) => !s);
  };

  //Modal Four
  const toggleModalFour = (e) => {
    setModalFourState((s) => !s);
  };



  const onModalOneHide = () => {
    // Open modal two on modal one hide
    setModalTwoState((s) => !s);
  };

  const onModalTwoHide = () => {
    // Open modal two on modal one hide
    // setModalThreeState((s) => !s);
    setEnterPin((s) => !s);
  };

  const onModalThreeHide = () => {
    // Open modal two on modal one hide
    // setModalFourState((s) => !s);
    // console.log("Transaction successfull")
  };



  // const handleToNext = ()=>{
  //   if(amount.value <= 0){
  //     return
  //   }
  //   clearModals();
  //   setEnterPin(true)
  // }


  const sendIt = () => {
    setToSend(true);
    toggleModalOne()
  }

  let dontSendIt = () => {
    setToSend(false)
    toggleModalOne()
  }

  const closeChooseAmount = () => {
    setCancelChooseAmount(true);
    setModalTwoState((s) => !s)
  }

  return (
    <>
      {/* Send cash or keep typing modal */}

      <Chatmodal
        isVisible={sendcashModal}
        onModalHide={toSend ? onModalOneHide :  inputFocus}
        onClosePress={dontSendIt}
      >
        <Text style={styles.sendCashHeader}>
          Hey Padi, want to send cash to{" "}
          <Text style={{ textTransform: "capitalize" }}>
            {" "}
            {nameOfActiveChat}
          </Text>{" "}
          or is it just a text language?
        </Text>

        <View style={styles.sendCashWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={sendIt}
            style={[{ backgroundColor: COLORS.blue5 }, styles.sendCashButton]}
          >
            <View style={styles.buttonIconBg}>
              <Arrowupicon />
            </View>
            <Text style={styles.buttonText}>Send Cash?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={dontSendIt}
            style={[{ backgroundColor: COLORS.purple }, styles.sendCashButton]}
          >
            <View style={styles.buttonIconBg}>
              <Lettercaseicon />
            </View>
            <Text style={styles.buttonText}>Keep Typing?</Text>
          </TouchableOpacity>
        </View>
      </Chatmodal>


      {/* Choose amount to send */}

      <Chatmodal
        isVisible={modalTwoVisible}
        onModalHide={cancelChooseAmount ? () => null : onModalTwoHide}
        onClosePress={closeChooseAmount}
      >

        <Text style={styles.chooseAmountHeader}>
          How much do you want to send?
        </Text>

        <View style={styles.amountBlockWrap}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.addedAmountText}
              keyboardType="numeric"
              placeholder="N0.00"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>
        </View>
        <View style={styles.amountOptionsContainer}>
          {amounts.map((item, index) => {
            return (
              <TouchableOpacity
                // onPress={() => setAmount(item)}
                onPress={() => handleAmountChange(`${item.value}`)}
                activeOpacity={0.8}
                key={index}
                style={styles.amountOption}
              >
                <Text style={styles.amountOptionText}>N{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={toggleModalTwo}>
          <Text style={styles.buttonTextValue}>Proceed</Text>
        </TouchableOpacity>
      </Chatmodal>

      {/* Enter Secure Pin */}

      <Chatmodal
        isVisible={enterPin}
        onClosePress={toggleModalThree}
        // onModalHide={onModalThreeHide}
        // height={40}
      >
        <Text style={styles.securePinHeader}>
          Amount to send : <Text style={{ ...FONTS.bold }}>N{amount.name}</Text>{" "}
          + N0 Charges
        </Text>

        <View style={styles.inputLockWrapper}>
          <Outlinedlock />
          <TextInput
            style={[styles.securePinTextInput, {height: "100%"}]}
            secureTextEntry={true}
            placeholder="Enter your secure 4 digit PIN"
            placeholderTextColor={COLORS.grey2}
            onChangeText={handlePinChange}
            value={userPin}
            maxLength={4}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          disabled={loading}
          activeOpacity={0.8}
          onPress={sendCash}
          style={[styles.buttonWrapper, { opacity: loading ? 0.6 : 1 }]}
        >
          <Text style={styles.buttonTextValue}>{!loading ? "Transfer Cash" : "Sending..."}</Text>
        </TouchableOpacity>
      </Chatmodal>


      {/* Sending success Modal */}

      <Chatmodal
        isVisible={modalFourVisible}
        onClosePress={toggleModalFour}
      >
        <View style={{ alignItems: "center"}}>
          <Pressable onPress={toggleModalFour} style={{width: 20, height: 20, backgroundColor: COLORS.grey1, alignSelf: "flex-end"}}>
            
          </Pressable>
        <LottieView source={Successcheckanimate} autoPlay loop style={{width: 118, height: 118, marginBottom: 15 }}/>
        <Text style={styles.sendingSuccessText}>Transaction Successful</Text>
        </View>
      </Chatmodal>

      
    </>
  );
};

export default AllChatsModal;
