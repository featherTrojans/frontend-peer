import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { styles } from "./Globalmodal.styles";

type globalModalProps = {
  showState: boolean;
  onBgPress: () => void;
  children: JSX.Element;
  btnFunction?: () => void;
  btnText?: string;
};

const Globalmodal = ({
  showState,
  onBgPress,
  children,
  btnFunction,
  btnText = "CONTINUE",
}: globalModalProps) => {
  return (
    <Modal
      isVisible={showState}
      coverScreen={true}
      backdropColor="#000"
      backdropOpacity={0.2}
      style={{ margin: 0, justifyContent: "flex-end" }}
      onBackdropPress={onBgPress}
    >
      <View style={styles.container}>
        {children}

        {btnFunction  && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={btnFunction}
            style={styles.btnStyle}
          >
            <Text style={styles.btnText}>{btnText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default Globalmodal;
