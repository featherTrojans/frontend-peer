import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTKeyboardwrapper,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION, navigation } from "../utils";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { useAlert, useCustomModal } from "../hooks";
import { nigeriastates, stateslgs } from "../utils/countryandstate";
import axiosCustom from "../httpRequests/axiosCustom";
import { COLORS, FONTS, SIZES, fontsize } from "../constants";

const UploadDocScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [id_image, setid_image] = useState({});
  const [content, setContent] = useState<any>({ child: null, height: 400 });
  const [country_state, setCountrystate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("Select");
  const [localGov, setLocalGov] = useState("Select");
  const [selectDoc, setSelectDoc] = useState("Select Document");

  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();

  const closeStateModal = (item) => {
    setCity(item);
    setShowModal(false);
  };

  const closeLocalGovModal = (item) => {
    setLocalGov(item);
    setShowModal(false);
  };

  const StateModal = () => {
    return (
      <FlatList
        data={nigeriastates}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeStateModal(item)}>
              <Text
                style={{
                  paddingVertical: 15,
                  textTransform: "capitalize",
                  ...fontsize.smallest,
                  ...FONTS.medium,
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  };

  const LocalGovModal = () => {
    return (
      <FlatList
        data={nigeriastates}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeLocalGovModal(item)}>
              <Text
                style={{
                  paddingVertical: 15,
                  textTransform: "capitalize",
                  ...fontsize.smallest,
                  ...FONTS.medium,
                }}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  };

  const switchModals = (value: number) => {
    switch (value) {
      case 0:
        setContent({ child: <StateModal />, height: SIZES.height - 200 });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <LocalGovModal />, height: SIZES.height - 200 });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result?.assets[0]?.uri, "result body");
      setid_image({
        uri: `${result?.assets[0]?.uri}`,
        type: "Image/jpeg",
        name: "id_image",
      });
    }
  };

  const onsubmit = async (values) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("address", values.address);
    formdata.append("city", city);
    formdata.append("state", country_state);
    formdata.append("country", "Nigeria");
    formdata.append("postal_code", values.postal_code);
    formdata.append("house_no", values.id_type);
    formdata.append("id_type", values.address);
    formdata.append("id_no", values.id_no);
    formdata.append("id_image", id_image);
    try {
      const response = await axiosCustom.post("user/upgrade/veteran", formdata);
      navigation.navigate("Dashboard");
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };


  const UploadDocumentBtn = () => {
    return (
      <TouchableOpacity style={{backgroundColor: COLORS.green4, paddingVertical: 11, paddingHorizontal: 16, borderRadius: 12}} activeOpacity={0.8} onPress={handleImageUpload}>
        <Text style={{...fontsize.smallest, ...FONTS.semibold, color: COLORS.white}}>Upload Document</Text>
      </TouchableOpacity>
    )
  }

  return (
    <FTTitlepagewrapper
      title="Upload Documents"
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FTKeyboardwrapper>
        <FTHeaderandsubheader
          header="Upload identity 
          documents"
          subHeader=""
        />

        <FTInput
          placeholderText={city}
          name="state"
          label="State"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
          type="dropdown"
          onPress={() => switchModals(0)}
        />

          <FTInput
          placeholderText={localGov}
          name="localgov"
          label="Local Government"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
          type="dropdown"
          onPress={() => switchModals(1)}
        />

        <FTInput
          placeholderText="Input House No"
          name="house_no"
          label="House No"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
        />
        <FTInput
          placeholderText="Enter Address"
          name="address"
          label="Address"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={15}
        />
        <FTInput
          placeholderText="Enter Postal No"
          name="postal_code"
          label="Postal Code"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={15}
        />
        <FTInput
          placeholderText="Enter ID Type"
          name="id_type"
          label="ID Number"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={15}
        />
        <FTInput
          placeholderText="Enter ID Number"
          name="id_no"
          label="ID Number"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={15}
        />

        <FTInput
          placeholderText={selectDoc}
          name="id_image"
          label="Upload Document"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={15}
          type="dropdown"
          onPress={() => console.log("Yestys")}
        rightComponent={<UploadDocumentBtn />}
        />
        
        <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default UploadDocScreen;
