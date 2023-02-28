import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message'
import { COLORS } from "../constants";
import { toastConfig } from "../App";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type globalModalProps = {
  children: JSX.Element;
  bg?: string,
  hideOnTap?: boolean
};

const useCustomModal = () => {
  const [showState, setShowState] = useState(false);

  const openModal = () => {
    setShowState(true);
  };

  const closeModal = () => {
    setShowState(false);
  };

  const CustomModal = ({ children, bg="#fff", hideOnTap=true }: globalModalProps) => {
    return (
      <Modal
        isVisible={showState}
        coverScreen={true}
        backdropColor="#000"
        backdropOpacity={0.2}
        animationInTiming={400}
        backdropTransitionInTiming={200}
        animationOut={"fadeOut"}
        animationOutTiming={150}
        swipeThreshold={20}
        swipeDirection="down"
        onSwipeComplete={() => setShowState(false)}
        style={{ margin: 0, justifyContent: "flex-end", zIndex: 100 }}
        onBackdropPress={hideOnTap ? () => setShowState(!showState) : () => null}
        onBackButtonPress={hideOnTap ? () => setShowState(!showState) : () => null}
      >
        <>
        <View
          style={{
            paddingVertical: 36,
            backgroundColor: bg,
            paddingHorizontal: 15,
            borderTopRightRadius: 22,
            borderTopLeftRadius: 22,
          }}
        >
          {children}
        </View>
        <Toast 
        config={toastConfig}
        topOffset={0}
        />
        </>
      </Modal>
    );
  };

  return { CustomModal, openModal, closeModal };
};

export default useCustomModal;

const styles = StyleSheet.create({});
