import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import { toastConfig } from "../../../../App";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { COLORS, icons } from "../../../../constants";
const { Cancelicon, Cancelicony } = icons;

const Chatmodal = ({
  isVisible,
  onModalHide,
  onClosePress,
  children,
  height,
}: any) => {
  return (
    <View>
      <Modal
        onModalHide={onModalHide}
        isVisible={isVisible}
        animationOut="slideOutDown"
        avoidKeyboard={true}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <>
          <View
            style={[
              styles.modalWrapper,
              { height: height ? `${height}%` : "auto" },
            ]}
          >
            <Pressable onPress={onClosePress} style={styles.cancelBtn}>
              <Cancelicon />
            </Pressable>
            {children}
          </View>
          <Toast config={toastConfig} topOffset={getStatusBarHeight(true)} />
        </>
      </Modal>
    </View>
  );
};

export default Chatmodal;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "#fff",
    padding: 16,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    textAlign: "center",
  },
  text: {
    paddingVertical: 16,
  },
  cancelBtn: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.grey1,
    marginBottom: 30,
    borderRadius: 30 / 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
});
