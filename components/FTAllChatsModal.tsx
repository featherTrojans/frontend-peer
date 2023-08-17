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
        <Text style={sendCashHeader}>
          Hey Padi, want to send cash to{" "}
          <Text style={{ textTransform: "capitalize" }}>
            {" "}
            {nameOfActiveChat}
          </Text>{" "}
          or is it just a text language?
        </Text>

        <View style={sendCashWrapper}>
          {/* First One */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setChooseAmount(true)}
            style={[{ backgroundColor: COLORS.blue5 }, sendCashButton]}
          >
            <View style={buttonIconBg}>
              <Blacksendicon />
            </View>
            <Text style={buttonText}>Send Cash?</Text>
          </TouchableOpacity>

          {/* Second Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSendCashModal(false)}
            style={[{ backgroundColor: COLORS.purple }, sendCashButton]}
          >
            <View style={buttonIconBg}>
              <Blacksendicon />
            </View>
            <Text style={buttonText}>Keep Typing?</Text>
          </TouchableOpacity>
        </View>
      </Chatsmodal>

      {/* Choose amount to send */}

      <Chatsmodal showState={chooseAmount} onBgPress={clearModalsAll}>
        <Text style={chooseAmountHeader}>How much do you want to send?</Text>

        <View style={amountBlockWrap}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* minus icon */}
            {/* <Minusicon /> */}
            <TextInput
              style={addedAmountText}
              keyboardType="numeric"
              placeholder="N0.00"
              //  value={amount.value}
              onChangeText={handleAmountChange}
            />
            {/* <Text style={styles.addedAmountText}>N0.00</Text> */}
            {/* Add icon */}
            {/* <Plusicon /> */}
          </View>
        </View>
        {/* Amount options */}
        <View style={amountOptionsContainer}>
          {amounts.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setAmount(item);
                  clearModals();
                  setEnterPin(true);
                }}
                activeOpacity={0.8}
                key={index}
                style={amountOption}
              >
                <Text style={amountOptionText}>N{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={buttonWrapper}
          onPress={() => {
            handleToNext;
          }}
        >
          <Text style={buttonTextValue}>Proceed</Text>
        </TouchableOpacity>
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
