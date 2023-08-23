import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTKeyboardwrapper,
  FTLoader,
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
import { UploadDocScreenStyles } from "../assets/styles/screens";
import { AuthContext } from "../context/AuthContext";

const { optionText, uploadDocBtnWrap, uploadDocBtnText } =
  UploadDocScreenStyles;

const UploadDocScreen = () => {
  const { authdata, setAuthData } = useContext(AuthContext);
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [id_image, setid_image] = useState({});
  const [content, setContent] = useState<any>({ child: null, height: 400 });
  const [country_state, setCountrystate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("Select");
  const [localGov, setLocalGov] = useState("Select");
  const [selectDoc, setSelectDoc] = useState("Select Document");
  const [id_type, setIdtype] = useState("Select");
  const { successAlert } = useAlert();

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

  const closeidtypeModal = (item) => {
    setIdtype(item);
    setShowModal(false);
  };

  const StateModal = () => {
    return (
      <FlatList
        data={nigeriastates}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeStateModal(item)}>
              <Text style={optionText}>{item}</Text>
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
        data={stateslgs[city] || []}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeLocalGovModal(item)}>
              <Text style={optionText}>{item}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  };

  const IdtypeModal = () => {
    return (
      <FlatList
        data={["NIGERIAN_NIN"]}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeidtypeModal(item)}>
              <Text style={optionText}>{item}</Text>
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
      case 2:
        setContent({ child: <IdtypeModal />, height: SIZES.height - 500 });
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
    console.log(values, city, localGov, id_image);

    // return;
    setLoading(true);
    const formdata = new FormData();
    formdata.append("address", values.address);
    formdata.append("city", city);
    formdata.append("state", localGov);
    formdata.append("country", "Nigeria");
    formdata.append("postal_code", values.postal_code);
    formdata.append("house_no", values.house_no);
    formdata.append("id_type", id_type);
    formdata.append("id_no", values.id_no);
    formdata.append("id_image", id_image);

    try {
      await axiosCustom.post("user/veteran/upgrade", formdata);
      setAuthData({
        ...authdata,
        userDetails: {
          ...authdata.userDetails,
          userLevel: 3,
          address: values.address,
          city,
          state: localGov,
          country: "Nigeria",
          postalCode: values.postal_code,
          houseNo: values.house_no,
          id_type: id_type,
          id_no: values.id_no,
        },
      });

      successAlert("Document uploaded successfully");
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const UploadDocumentBtn = () => {
    return (
      <TouchableOpacity
        style={uploadDocBtnWrap}
        activeOpacity={0.8}
        onPress={handleImageUpload}
      >
        <Text style={uploadDocBtnText}>Upload Document</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FTTitlepagewrapper
      title="Upload Documents"
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FTLoader loading={loading} />
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
          rules={VALIDATION.HOUSE_NO_VALIDATION}
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
          rules={VALIDATION.POSTAL_NO_VALIDATION}
          mB={15}
        />
        <FTInput
          placeholderText={id_type}
          name="id_type"
          label="ID Type"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={15}
          type="dropdown"
          onPress={() => switchModals(2)}
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
          placeholderText={id_image.uri ? "image uploaded" : "Select Document"}
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
