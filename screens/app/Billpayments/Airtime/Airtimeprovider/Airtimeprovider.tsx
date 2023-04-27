import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Backheader,
  Custombutton,
  Horizontaline,
  Input,
  Mainwrapper,
} from "../../../../../components";
import { electrictystyles } from "../../Electricity/Electricitytype/Electricitytype.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import useCustomModal from "../../../../../utils/useCustomModal";

const {
  Forwardarrow,
  Mtnlogo,
  Gloicon,
  Ikejaelectricityicon,
  Ashicon,
  Briefcaseicon,
  Searcontacticon,
} = icons;

const Airtimeprovider = ({ navigation, route }) => {
  const { billType, amount } = route.params;

  const Eachoption = ({ image, type, network }) => {
    const { CustomModal, openModal, closeModal } = useCustomModal();

    const [phone, setPhone] = useState<null | number>(null);

    const handlePhoneChange = (text) => {
      setPhone(text);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={electrictystyles.eachoption}
        onPress={openModal}
      >
        <CustomModal>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.medium,
                  color: COLORS.blue9,
                }}
              >
                Airtime Purchase
              </Text>
              {/* {showLogo(logotype)} */}
              <Image
                style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                source={{
                  uri: image,
                }}
              />
            </View>

            {/* Formik Starts */}

            <Formik
              initialValues={{
                amount: amount,
                network: network,
                phone: "",
              }}
              onSubmit={(values) => {
                closeModal();
                navigation.navigate("Airtimepurchasepin", {
                  type: billType,
                  data: {
                    network: values.network,
                    amount: values.amount,
                    phone: values.phone,
                  },
                });
              }}
            >
              {(formikProps) => {
                const {
                  isSubmitting,
                  isValid,
                  handleBlur,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                } = formikProps;

                return (
                  <>
                    <View style={{ marginTop: 25, marginBottom: 35 }}>
                      <Input
                        icon={<Ashicon />}
                        placeholder="Enter Amount"
                        name="amount"
                        inputbg={COLORS.inputBgColor}
                        formikProps={formikProps}
                        value={amount}
                        editable={false}
                      />
                      <Input
                        icon={<Briefcaseicon />}
                        placeholder="Network Type"
                        name="network"
                        inputbg={COLORS.inputBgColor}
                        formikProps={formikProps}
                        value={network}
                        editable={false}
                      />
                      <Input
                        icon={<Briefcaseicon />}
                        placeholder="Phone Number"
                        name="phone"
                        inputbg={COLORS.inputBgColor}
                        keyboardType="numeric"
                        formikProps={formikProps}
                        // onChangeText={handlePhoneChange}
                        // defaultValue={phone}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("BillContacts", {
                            amount,
                            billType,
                            network,
                          })
                        }
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: COLORS.trasparentPurple,
                            alignSelf: "flex-start",
                            paddingVertical: 9,
                            paddingHorizontal: 14,
                            borderRadius: 18,
                          }}
                        >
                          <Searcontacticon />
                          <Text
                            style={{
                              ...fontsize.smallest,
                              ...FONTS.regular,
                              color: COLORS.purple2,
                              marginLeft: 8,
                            }}
                          >
                            Search Contacts
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <Custombutton
                      btntext="Yeah, Continue"
                      // onpress={() => console.log("Airtimepurchasepin", {type:  billType, data: {network: network, amount: amount, phone: phone}})}

                      onpress={handleSubmit}
                    />
                  </>
                );
              }}
            </Formik>
            {/* Formik ends here */}
          </View>
        </CustomModal>

        <View style={electrictystyles.logoandtitlewrap}>
          <Image
            style={{ width: 34, height: 34, borderRadius: 34 / 2 }}
            source={{
              uri: image,
            }}
          />
          <Text style={electrictystyles.optiontitle}>{type}</Text>
        </View>
        <Forwardarrow />
      </TouchableOpacity>
    );
  };

  const providertypes = [
    {
      title: "MTN Nigeria",
      network: "MTN",
      logotype:
        "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fmtn-logo-40644FC8B0-seeklogo.com.png?alt=media&token=a45a8f22-f6ee-42da-b048-7bb26295d7a1",
    },
    {
      title: "Globacom",
      network: "Glo",
      logotype:
        "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FGlobacom%20Limited%20Logo%20(2).png?alt=media&token=a1bf3984-a862-451e-a8b5-6f3b96b1fea4",
    },
    {
      title: "9 Mobile",
      network: "9Mobile",
      logotype:
        "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2F9mobile%20Logo%20(1).png?alt=media&token=011b2934-d9b5-449d-89c5-66eb46fff497",
    },
    {
      title: "Airtel Nigeria",
      network: "Airtel",
      logotype:
        "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FAirtel%20Nigeria%20Logo%20(1).png?alt=media&token=5dba1e6a-3cce-43fa-972f-df17926db7ff",
    },
  ];

  return (
    <Mainwrapper>
      <Backheader title="Select Provider" />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={electrictystyles.blockwrap}>
          <Text style={electrictystyles.headertext}>
            Choose your preferred provider
          </Text>

          {providertypes.map(({ title, logotype, network }, index) => {
            const isLast = providertypes.length === index + 1;
            return (
              <View key={index}>
                <Eachoption image={logotype} type={title} network={network} />
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            );
          })}
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Airtimeprovider;

const styles = StyleSheet.create({});
