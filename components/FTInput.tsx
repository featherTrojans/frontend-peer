import React from "react";
import {
  Text,
  View,
  TextInput,

} from "react-native";
import { Controller } from "react-hook-form";
import { icons, COLORS } from "../constants";
import { FTInputStyles } from "../assets/styles/components";

const {  textInput, errorMessageText, inputLabel } =
  FTInputStyles;

const { Transfericon } = icons;

type inputProps = {
  label?: string;
  placeholderText?: string;
  mT?: number;
  mB?: number;
  control: any;
  name: string;
  rules?: any;
};

const FTInput = ({
  label,
  placeholderText,
  mT = 0,
  mB = 0,
  name,
  rules = {},
  control,
}: inputProps) => {
  return (
    <View
      style={{
        marginTop: mT,
        marginBottom: mB,
        borderColor: COLORS.inputBorderColorDark,
      }}
    >
      <Text style={inputLabel}>{label}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[
                textInput,
                {
                  borderColor: error
                    ? COLORS.pink1
                    : value && !error
                    ? COLORS.blue16
                    : COLORS.grey15,
                },
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholderText}
              placeholderTextColor={COLORS.grey18}
            />
            {error && <Text style={errorMessageText}> {error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default FTInput;
