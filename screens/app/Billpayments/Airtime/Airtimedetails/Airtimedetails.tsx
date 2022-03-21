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


const { Inputdropdown, Addressbook } = icons;

type PaybillsinputProps = {
  inputSymbol: string;
  rightIcon?: JSX.Element;
  placeholder: string;
  editable?: boolean
  value?:any,
  onChangeText?:any,
  keyboardType?:any
};

const Paybillsinput = ({
  inputSymbol,
  rightIcon,
  placeholder,
  editable = true,
  ...props
}: PaybillsinputProps) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.paybillInput,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
      }}
    >
      <Text style={{ ...fontsize.bsmall }}>{inputSymbol}</Text>
      <Text style={{ marginLeft: 15.5, marginRight: 16.5 }}>|</Text>
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
  const {amount} = route.params
  const { authdata } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState<null | string>(authdata?.phoneNumber);
  const [items, setItems] = useState([
    { label: "@    |    MTN", value: "MTN" },
    { label: "@    |    Airtel", value: "Airtel" },
    { label: "@    |    Globacom", value: "Glo" },
    { label: "@    |    9mobile", value: "9mobile" }
  ]);

  console.log(authdata)

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


  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Customstatusbar />

      
      <Backheader
        title={index === 0 ? "Purchase Airtime" : "Purchase Airtime & Data"}
      />
      <KeyboardAwareScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
        <Text
          style={{
            marginTop: 16,
            ...fontsize.bsmall,
            ...FONTS.regular,
            marginRight: 55,
          }}
        >
          Select your preferred network provider and receivers phone number.
        </Text>

        <View style={{ position: "relative", marginTop: 30, ...Shadow}}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                width: singleWidth(),
                paddingVertical: 24,
              }}
              activeOpacity={0.7}
              onPress={() => animateToIndex(0)}
            >
              <Text
                style={[
                  {
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    textAlign: "center",
                    color: activeColor(0),
                  },
                ]}
              >
                Airtime
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: singleWidth(), paddingVertical: 24 }}
              activeOpacity={0.7}
              onPress={() => animateToIndex(1)}
            >
              <Text
                style={[
                  {
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    textAlign: "center",
                    color: activeColor(1),
                  },
                ]}
              >
                Mobile Data
              </Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            style={{
              position: "absolute",
              width: singleWidth(),
              height: 1.5,
              backgroundColor: COLORS.blue6,
              bottom: 0,
              left: 0,
              transform: [{ translateX: horizontalOffset }, { scaleX: 1 }],
            }}
          />
        </View>

        <View style={{ marginTop: 40,minHeight:400, flex: 1 }}>
          {index === 0 ? (
            <>
              <Paybillsinput inputSymbol="#" placeholder={amount} editable={false} />
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
                  marginBottom: 15
                }}
                containerStyle={{}}
                dropDownContainerStyle={{
                  borderColor: COLORS.grey1
                }}
              />
              <Paybillsinput
                value={phone}
                onChangeText={(text:string)=>setPhone(text)}
                inputSymbol="#"
                placeholder="08012345678"
                rightIcon={<Addressbook />}
                keyboardType={"numeric"}
              />
            </>
          ) : (
            <>
              <Paybillsinput inputSymbol="#" placeholder="Globacom" />
              <Paybillsinput
                inputSymbol="#"
                placeholder="3GB (2 Days) - N980.00"
                rightIcon={<Inputdropdown />}
              />
              <Paybillsinput
                inputSymbol="#"
                placeholder="08098653012"
                rightIcon={<Addressbook />}
                keyboardType={"numeric"}
              />
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Bottombtn
        title="proceed"
        onpress={() => navigation.navigate("Airtimepurchasepin",{type:"airtime", data:{
          amount:amount,
          phone:phone,
          network:value
        }})}
      />
    </KeyboardAwareScrollView>
  );
};

export default Airtimedetails;
