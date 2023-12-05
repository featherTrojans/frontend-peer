import React, { useState } from "react";
import { Text, View, TextInput, Pressable, TextInputProps } from "react-native";
import { Controller } from "react-hook-form";
import { icons, COLORS, fontsize, FONTS } from "../constants";
import { FTInputStyles } from "../assets/styles/components";

const {
  textInput,
  errorMessageText,
  inputLabel,
  dropdownPlaceholder,
  dropdownWrap,
  passwordInputWrap,
  passwordInput,
} = FTInputStyles;
const { Dropdownicon, Eyecrossed, Eyeopenicon } = icons;

type inputProps = {
  label?: string;
  placeholderText?: string;
  mT?: number;
  mB?: number;
  control: any;
  name: string;
  rules?: any;
  type?: "input" | "dropdown" | "password";
  onPress?: () => void;
  rightComponent?: any;
  editable?: boolean;
  textInputProps?: TextInputProps;
};

const FTInput = ({
  label,
  placeholderText,
  mT = 0,
  mB = 0,
  name,
  rules = {},
  type = "input",
  control,
  onPress,
  rightComponent,
  editable = true,
  textInputProps,
}: inputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  let togglePassword = () => {
    setShowPassword((s) => !s);
  };

  const renderInputType = () => {
    const [isFocused, setIsFocused] = useState(false);
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
                {...textInputProps}
                style={[
                  textInput,
                  {
                    borderColor: error
                      ? COLORS.pink1
                      : isFocused && !error
                      ? COLORS.blue16
                      : COLORS.grey15,
                  },
                ]}
                onChangeText={onChange}
                editable={editable}
                onBlur={(e) => setIsFocused(false)}
                onFocus={(e) => setIsFocused(true)}
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

  const renderPasswordType = () => {
    const [isFocused, setIsFocused] = useState(false);
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
            <View style={{ marginBottom: 20 }}>
              <View
                style={[
                  passwordInputWrap,
                  {
                    borderColor: error
                      ? COLORS.pink1
                      : value && !error
                      ? COLORS.blue16
                      : COLORS.grey15,
                  },
                ]}
              >
                <TextInput
                  onChangeText={onChange}
                  editable
                  onBlur={onBlur}
                  returnKeyType="done"
                  value={value}
                  placeholderTextColor={COLORS.grey9}
                  style={passwordInput}
                  secureTextEntry={showPassword}
                />
                <Pressable hitSlop={30} onPress={togglePassword} style={{}}>
                  {!showPassword ? <Eyeopenicon /> : <Eyecrossed />}
                </Pressable>
              </View>
              {error && <Text style={errorMessageText}> {error.message}</Text>}
            </View>
          )}
        />
      </View>
    );
  };

  const renderDropdownType = () => {
    let name = placeholderText?.toLowerCase();
    let placeholders = ["enter", "upload", "select", "04 April 2004"];
    let isActive = () => {
      for (let sample of placeholders) {
        if (name?.includes(sample.toLowerCase())) {
          return true;
        }
      }
    };

    return (
      <View
        style={[
          {
            marginTop: mT,
            marginBottom: mB,
          },
        ]}
      >
        <Text style={inputLabel}>{label}</Text>

        <Pressable
          onPress={onPress}
          style={[textInput, { justifyContent: "center" }]}
        >
          <View style={dropdownWrap}>
            <Text
              style={[
                dropdownPlaceholder,
                { color: isActive() ? COLORS.grey18 : COLORS.blue9 },
              ]}
            >
              {placeholderText}
            </Text>
            {rightComponent ? rightComponent : <Dropdownicon />}
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <>
      {type === "dropdown" && renderDropdownType()}
      {type === "input" && renderInputType()}
      {type === "password" && renderPasswordType()}
    </>
  );
};

export default FTInput;
