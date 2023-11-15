import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CableiucnumberScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTDetailsModal,
  FTInput,
  FTLoader,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import axiosCustom from "../httpRequests/axiosCustom";
import Bluecardicon from "../assets/icons/Cardactionicons/Bluecardicon";
import { useAlert } from "../hooks";

const {} = CableiucnumberScreenStyles;

const CableiucnumberScreen = ({ navigation, route }) => {
  const [accountinfo, setaccouninfo] = useState();
  const biller = route?.params?.biller;
  const price = route?.params?.price;
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [content, setContent] = useState<any>({ child: null });
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const { errorAlert } = useAlert();

  const switchModals = (value, data) => {
    const action = async (pin) => {
      try {
        await axiosCustom.post("bills/subscribe", {
          service: biller,
          smartcard_number: data.iucnumber,
          productCode: biller,
          userPin: pin,
          amount: price,
          customerName: `${data.lastName} ${data.firstName}`,
        });
        navigation.navigate("transactionsuccess_screen");
      } catch (err) {
        throw err;
      }
    };
    const onpress = () => {
      navigation.navigate("transactionpin_screen", { action });
    };
    switch (value) {
      case 0:
        setContent({
          child: (
            <FTDetailsModal
              modalTitle="Bill Details"
              title={`${data.lastName} ${data.firstName}`}
              info={data.iucnumber}
              onPress={onpress}
              Icon={Bluecardicon}
              extraComponent={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                ></View>
              }
            />
          ),
        });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const onsubmit = async (data) => {
    setloading(true);
    try {
      const response = await axiosCustom.post("/bills/details", {
        package: biller,
        decoderNo: data.iucnumber,
      });

      const acctinfo = response.data.data;
      if (!acctinfo?.firstName) {
        throw { response: { data: { message: "Account not available" } } };
      }

      setaccouninfo(acctinfo);
      //  if not a an object, return error
      switchModals(0, { ...response.data.data, iucnumber: data.iucnumber });
    } catch (err) {
      errorAlert(err);
    } finally {
      setloading(false);
    }
  };
  return (
    <FTTitlepagewrapper
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={276}
      title="IUC Number"
    >
      <FTLoader loading={loading} />
      <FTInput
        label="Enter IUC Number"
        placeholderText="Enter Number"
        name="iucnumber"
        control={control}
        mB={20}
        mT={20}
      />
      <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
    </FTTitlepagewrapper>
  );
};

export default CableiucnumberScreen;

const styles = StyleSheet.create({});
