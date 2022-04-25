import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Backheader, Bottombtn } from "../../../../../components";
import {
  COLORS,
  FONTS,
  fontsize,
  icons,
  SIZES,
} from "../../../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Shadow } from "../../../../../constants/theme";
import Customstatusbar from "../../../../shared/Customstatusbar";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../../../../../context/AuthContext";
import showerror from "../../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import { styles } from "./Airtimedetails.styles";
import { SafeAreaView } from "react-native-safe-area-context";

const { Inputdropdown, Addressbook } = icons;

type PaybillsinputProps = {
  inputSymbol: string;
  rightIcon?: JSX.Element;
  placeholder: string;
  editable?: boolean;
  value?: any;
  onChangeText?: any;
  keyboardType?: any;
};

const Paybillsinput = ({
  inputSymbol,
  rightIcon,
  placeholder,
  editable = true,
  ...props
}: PaybillsinputProps) => {
  return (
    <View style={styles.paybillsInput}>
      <Text style={styles.atSymbol}>{inputSymbol}</Text>
      <Text style={styles.boundaryLine}>|</Text>
      <TextInput
        editable={editable}
        style={{ flex: 1, height: 62 }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.black}
        {...props}
      />
      {rightIcon}
    </View>
  );
};

const Airtimedetails = ({ navigation, route }) => {
  const { amount } = route.params;
  const toast = useToast();
  const { authdata } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState<null | string>(
    authdata?.userDetails?.phoneNumber
  );
  const [items, setItems] = useState([
    { label: "@    |    MTN", value: "MTN" },
    { label: "@    |    Airtel", value: "Airtel" },
    { label: "@    |    Globacom", value: "Glo" },
    { label: "@    |    9mobile", value: "9mobile" },
  ]);

  const activeColor = (activeIndex: number) => {
    return index === activeIndex ? "#003AD6" : "#000000";
  };
  const animateToIndex = (indexPoint: number) => {
    setIndex(indexPoint);
    Animated.spring(horizontalOffset, {
      toValue: singleWidth() * indexPoint,
      useNativeDriver: true,
    }).start();
  };
  const singleWidth = () => {
    let calcWidth = SIZES.width;
    return calcWidth / 2;
  };
  const horizontalOffset = useRef(new Animated.Value(0)).current;

  const handleToNext = () => {
    if (!amount || !phone || !value) {
      return showerror(toast, null, "All fields are compulsory");
    }
    navigation.navigate("Airtimepurchasepin", {
      type: "airtime",
      data: {
        amount: amount,
        phone: phone,
        network: value,
      },
    });
  };

  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: COLORS.white }} >
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Customstatusbar />

      <Backheader
        title={index === 0 ? "Purchase Airtime" : "Purchase Airtime & Data"}
      />
      <KeyboardAwareScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
        <Text style={styles.headerText}>
          Select your preferred network provider and receivers phone number.
        </Text>

        <View style={styles.selectionTypeContainer}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={{
                width: singleWidth(),
                paddingVertical: 24,
              }}
              activeOpacity={0.7}
              onPress={() => animateToIndex(0)}
            >
              <Text style={[styles.selectionType, { color: activeColor(0) }]}>
                Airtime
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: singleWidth(), paddingVertical: 24 }}
              activeOpacity={0.7}
              onPress={() => animateToIndex(1)}
            >
              <Text style={[styles.selectionType, { color: activeColor(1) }]}>
                Mobile Data
              </Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            style={[
              styles.animatedLine,
              {
                width: singleWidth(),
                transform: [{ translateX: horizontalOffset }, { scaleX: 1 }],
              },
            ]}
          />
        </View>

        <View style={styles.inputsContainer}>
          {index === 0 ? (
            <>
              <Paybillsinput
                inputSymbol="#"
                placeholder={amount}
                editable={false}
              />
              {/* <Paybillsinput
                inputSymbol="@"
                placeholder="Select Network"
                rightIcon={<Inputdropdown />}
              /> */}
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="@    |    Select Network"
                placeholderStyle={{
                  color: COLORS.black,
                  ...fontsize.small,
                  ...FONTS.regular,
                }}
                textStyle={{
                  color: COLORS.black,
                  ...fontsize.small,
                  ...FONTS.regular,
                }}
                style={{
                  height: 62,
                  paddingLeft: 20,
                  borderColor: "#E6E6E6",
                  marginBottom: 15,
                }}
                containerStyle={{}}
                dropDownContainerStyle={{
                  borderColor: COLORS.grey1,
                }}
              />
              <Paybillsinput
                value={phone}
                onChangeText={(text: string) => setPhone(text)}
                inputSymbol="#"
                placeholder="Input phone number"
                // rightIcon={<Addressbook />}
                keyboardType={"numeric"}
              />
            </>
          ) : (
            <>
              <View style={{flex: 1,  justifyContent: "center", alignItems: "center"}}>
                <Text>Coming Soon</Text>
              </View>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Bottombtn title="proceed" onpress={handleToNext} />
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Airtimedetails;
