import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, icons } from "../constants";
import Modal from "react-native-modal";
import { ChatsdmScreenStyles } from "../assets/styles/screens";

const {
  viewWrapper,
  sendCashHeader,
  sendCashWrapper,
  sendCashButton,
  buttonIconBg,
  buttonText,
  chooseAmountHeader,
  amountBlockWrap,
  addedAmountText,
  amountOptionsContainer,
  amountOption,
  amountOptionText,
  buttonWrapper,
  buttonTextValue,
  securePinHeader,
  inputLockWrapper,
  securePinTextInput,
  sendingSuccessText,
} = ChatsdmScreenStyles;

const { Blacksendicon, Successcheckanimate } = icons;
const amounts = [
  { name: "50", value: 50 },
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "500", value: 500 },
  { name: "1,000", value: 1000 },
  { name: "2,000", value: 2000 },
  { name: "5,000", value: 5000 },
];

const Chatsmodal = ({ children, showState, onBgPress = () => {} }) => {
  return (
    <Modal
      style={{ margin: 0, justifyContent: "flex-end" }}
      isVisible={showState}
      backdropColor={COLORS.black}
      backdropOpacity={0.2}
      onBackdropPress={onBgPress}
    >
      <View style={viewWrapper}>{children}</View>
    </Modal>
  );
};

const FTAllChatsModal = ({
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
}: any) => {
  console.log(chooseAmount, "choosinh");
  const handleToNext = () => {
    if (amount.value <= 0) {
      return;
    }
    clearModals();
    setEnterPin(true);
  };

  return (
    <>
      {/* Send cash or keep typing modal */}
      <Chatsmodal showState={sendcashModal} onBgPress={clearModalsAll}>
        
      </Chatsmodal>

      {/* Choose amount to send */}

      <Chatsmodal showState={chooseAmount} onBgPress={clearModalsAll}>
       
      </Chatsmodal>

      {/* Enter Secure Pin */}

      <Chatsmodal
        showState={enterPin}
        onBgPress={loading ? () => {} : clearModalsAll}
      >
        <Text style={securePinHeader}>
          Amount to send : <Text style={{ ...FONTS.bold }}>N{amount.name}</Text>{" "}
          + N0 Charges
        </Text>

        <View style={inputLockWrapper}>
          <Blacksendicon />
          <TextInput
            style={securePinTextInput}
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
          style={[buttonWrapper, { opacity: loading ? 0.8 : 1 }]}
        >
          <Text style={buttonTextValue}>Transfer Cash</Text>
        </TouchableOpacity>
      </Chatsmodal>

      {/* Sending success Modal */}

      <Chatsmodal showState={sendSuccess} onBgPress={clearModalsAll}>
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: 118, height: 118, marginBottom: 15 }}
          />
          <Text style={sendingSuccessText}>Transaction Successful</Text>
        </View>
      </Chatsmodal>
    </>
  );
};

export default FTAllChatsModal;

const styles = StyleSheet.create({});
