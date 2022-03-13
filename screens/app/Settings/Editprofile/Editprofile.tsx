import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./Editprofile.styles";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { Bottombtn } from "../../../../components";
import Defaultuseravatar from "../../../../assets/icons/Defaultuseravatar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { string } from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";

const { Backarrow } = icons;

type EditinputProps = {
  label: string;
  value?: string;
};

const Editinput = ({ label, value }: EditinputProps) => {
  return (
    <View style={{ marginBottom: 30 }}>
      {/* Label */}
      <Text style={styles.labelText}>{label}</Text>
      <TextInput style={styles.textInput} placeholder={value} />
    </View>
  );
};

const Basicsettings = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBg}>
            <Defaultuseravatar />
          </View>
          <Text style={styles.avatarText}>Tap to change display picture</Text>
        </View>
        <View style={styles.editInputContainer}>
          <Editinput label="Username" value="@freshsaint" />
          <Editinput label="Firstname" value="Sarah" />
          <Editinput label="Lastname" value="Jones" />
        </View>

        <Bottombtn
          title="Save changes"
          onpress={() => console.log("Saved chnages")}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};
const Personalsettings = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.editInputContainer}>
          <Editinput label="gender" value="-" />
          <Editinput label="Date of Birth" value="-" />
          <Editinput label="Address Line 1" value="-" />
          <Editinput label="Address Line 2" value="-" />
          <Editinput label="LGA" value="-" />
        </View>
        <Bottombtn
          title="Save changes"
          onpress={() => console.log("Saved chnages")}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const Documentsettings = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.documentContainer}>
          <View style={{ marginRight: 35 }}>
            <Text style={styles.identityText}>Identity Verification</Text>
            <Text style={styles.identitySubText}>
              Kindly provide feather with a valid means of identity to upgrade
              your account.
            </Text>
          </View>

          <View style={{ marginTop: 45 }}>
            <Editinput label="ID Type" value="--- Select Type ---" />
            <Editinput label="ID Number" value="Enter valid ID number" />

            <View style={styles.uploadIdBtn}>
              <Text style={styles.uploadIdText}>Upload ID</Text>
            </View>
          </View>
        </View>

        <View style={styles.documentContainer}>
          <View>
            <Text style={styles.identityText}>Utility Bill Verification</Text>
            <Text style={styles.identitySubText}>
              Kindly provide feather with your utility bill carrying your
              address of not more than 3 months back.
            </Text>
          </View>

          <View style={[styles.uploadIdBtn, { marginTop: 42 }]}>
            <Text style={styles.uploadIdText}>Upload Utility Bill</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const Editprofile = () => {
  const singleWidth = () => {
    let calcWidth = SIZES.width;
    return calcWidth / 3;
  };

  const horizontalOffset = useRef(new Animated.Value(0)).current;
  const scrolling = useRef(new Animated.Value(0)).current;
  const [snap, setSnap] = useState(0)

  const ref = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    ref.current.scrollTo({
      x: SIZES.width * index,
      y: 0,
      animated: true,
    });
  }, [index]);

  useEffect(() => {
    console.log(scrolling)
  }, [scrolling])

  const animateToIndex = (indexPoint: number) => {
    setIndex(indexPoint);
    Animated.spring(horizontalOffset, {
      toValue: singleWidth() * indexPoint,
      useNativeDriver: true,
    }).start();
  };



  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.mainHeaderContainer}>
        {/* Icons */}
        <Backarrow />
        <Text style={styles.mainHeaderText}>Edit Profile</Text>
        <View />
      </View>

      <View style={{ position: "relative" }}>
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity
            style={{
              width: singleWidth(),
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(0)}
          >
            <Text style={[styles.subheadersText]}>
              Basic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: singleWidth() }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(1)}
          >
            <Text style={[styles.subheadersText]}>Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: singleWidth() }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(2)}
          >
            <Text style={[styles.subheadersText]}>Documents</Text>
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
            transform: [{ translateX: horizontalOffset}, { scaleX: 0.8 }],
          }}
        />
      </View>

      <Animated.ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        // onScroll={Animated.event(
        //   [{
        //     nativeEvent: {
        //       contentOffset: {
        //         x: horizontalOffset,
        //       },
        //     },
        //   }],
        //   { useNativeDriver: true },
        // )}
      >
        <Basicsettings />
        <Personalsettings />
        <Documentsettings />
      </Animated.ScrollView>
    </View>
  );
};

export default Editprofile;
