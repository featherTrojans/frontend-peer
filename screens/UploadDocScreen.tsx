import { View, Text } from "react-native";
import React from "react";
import {
  FTCustombutton,
  FTHeaderandsubheader,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";

const UploadDocScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });

  const onsubmit = () => {};
  return (
    <FTTitlepagewrapper title="Upload Documents">
      <FTHeaderandsubheader
        header="Upload identity 
          documents"
        subHeader=""
      />
      <FTInput
        placeholderText="ID type"
        name="id_type"
        label="ID Type"
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
      <FTInput
        placeholderText="Upload Document"
        name="id_image"
        label="Address"
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
      <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
    </FTTitlepagewrapper>
  );
};

export default UploadDocScreen;
