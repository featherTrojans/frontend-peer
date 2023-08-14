import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION, navigation } from "../utils";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import FTHorizontaline from "../components/FTHorizontaline";
import { useAlert, useCustomModal } from "../hooks";
import { COLORS, FONTS, fontsize } from "../constants";
import { nigeriastates, stateslgs } from "../utils/countryandstate";
import axiosCustom from "../httpRequests/axiosCustom";

const CategoryOption = ({
  option,
  active,
  setActive,
  closeModal,
}: {
  option: string;
  active: Boolean;
  setActive: any;
  closeModal: any;
}) => {
  return (
    <>
      <Pressable
        onPress={() => {
          setActive(option);
          closeModal();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: "red",
          // marginBottom: 25
        }}
      >
        <Text style={{ ...fontsize.smaller, ...FONTS.regular }}>{option}</Text>
        {/* {active == option && <Pickedoptioncheck />} */}
      </Pressable>
      <FTHorizontaline marginV={15} />
    </>
  );
};

const CustomPressible = ({
  title,
  value,
  onchange,
  placeholder,
  options,
}: any) => {
  const { CustomModal, openModal, closeModal } = useCustomModal();

  return (
    <Pressable
      onPress={openModal}
      style={{
        backgroundColor: COLORS.white,

        paddingVertical: 15,
        borderRadius: 6,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          ...fontsize.xsmallest,
          ...FONTS.medium,
        }}
      >
        {title}
      </Text>
      <FTHorizontaline marginV={14} />
      <Text>{value === null ? "--- select ---" : value}</Text>

      <CustomModal height="80%">
        <FlatList
          data={options}
          renderItem={({ item: option, index }) => (
            <CategoryOption
              key={index + option}
              option={option}
              active={value}
              setActive={onchange}
              closeModal={closeModal}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </CustomModal>
    </Pressable>
  );
};

const UploadDocScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const [id_image, setid_image] = useState({});
  const [country_state, setCountrystate] = useState(null);
  const [city, setcity] = useState(null);
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();

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
  return (
    <FTTitlepagewrapper title="Upload Documents">
      <ScrollView>
        <FTHeaderandsubheader
          header="Upload identity 
          documents"
          subHeader=""
        />
        <CustomPressible
          options={nigeriastates}
          value={country_state}
          onchange={setCountrystate}
          title="State"
        />
        <CustomPressible
          options={stateslgs[country_state] || []}
          value={city}
          onchange={setcity}
          title="Local Government"
        />

        <FTInput
          placeholderText="input House No"
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
          placeholderText="Upload Document"
          name="id_image"
          label="Upload Documen"
          control={control}
          rules={VALIDATION.PHONE_NUMBER_VALIDATION}
          mB={15}
        />
        <View>
          <TouchableOpacity onPress={handleImageUpload}>
            <Text>Press Me</Text>
          </TouchableOpacity>
        </View>
        <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default UploadDocScreen;
