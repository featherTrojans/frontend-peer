import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { styles } from "./Globalmodal.styles";
import { Custombutton } from "../../../components";

type globalModalProps = {
  showState: boolean;
  onBgPress?: () => void;
  children: JSX.Element;
  btnFunction?: () => void;
  btnText?: string;
};

const Globalmodal = ({
  showState,
  onBgPress,
  children,
  btnFunction,
  btnText="continue",
}: globalModalProps) => {
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
      style={{ margin: 0, justifyContent: "flex-end", zIndex: 100 }}
      onBackdropPress={onBgPress}
      
    >
      <View style={styles.container}>
        {children}

        {btnFunction  && 

          <Custombutton btntext={btnText} onpress={btnFunction}/>

          
        }
      </View>
    </Modal>
  );
};

export default Globalmodal;
