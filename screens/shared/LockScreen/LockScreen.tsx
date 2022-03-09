import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {useState} from "react";
import Modal from "react-native-modal";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { styles } from "./LockScreen.style";
import { JustifyBetween } from "../../../global/styles";
import SecureDot from "../../../assets/icons/SecureDot";
import { Bottombtn, Numberbtn } from "../../../components";

const LockScreen = ({modal, setModal}: any) => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];
    const [pin, setPin] = useState<string[]>([]);
    
    const handleSetAmount = (value: string) => {
        if (pin.length < 4) {
          setPin((oldamount) => [...oldamount, value]);
        }
      };
      const handleRemoveAmount = () => {
        if (pin.length > 0) {
          const newdata = [...pin];
          newdata.pop();
          setPin(newdata);
          console.log(newdata);
        }
      };
    const handleSubmit = ()=>{
      setPin([])
      setModal(false)
    }
  return (
    <Modal
      isVisible={modal}
      coverScreen={true}
      backdropColor="#000"
      backdropOpacity={0.2}
      style={{ margin: 0, flex:1 }}
    >
     <View style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <JustifyBetween style={{ marginBottom: 10 }}>
          <View>
            <Text style={styles.header}>Lock Screen </Text>
            <Text style={styles.header}>4-digit secure pin to unlock</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={styles.activeDot} />
          </View>
        </JustifyBetween>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>Transaction PIN</Text>
        </View>

        <View style={styles.pinContainer}>
          <View style={styles.pinInputContainer}>
            <View style={styles.pinView}>{pin[0] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[1] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[2] && <SecureDot />}</View>
            <View style={styles.pinView}>{pin[3] && <SecureDot />}</View>
          </View>
        </View>

        <View style={styles.numberBtnContainer}>
          {numbers.map((number, index) => {
            return (
              <Numberbtn key={index} onpress={() => handleSetAmount(number)}>
                {number}
              </Numberbtn>
            );
          })}

          <Numberbtn onpress={() => handleRemoveAmount()}>X</Numberbtn>
        </View>


        
      </View>
      <Bottombtn
        title="submit"
        onpress={handleSubmit}
        disabled={pin.length !== 4}
      />
    </View>
    </Modal>
  );
};

export default LockScreen;
