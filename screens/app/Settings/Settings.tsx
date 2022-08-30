import React, { useContext, useMemo } from "react";
import { Text, View, TouchableOpacity, Share, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { styles } from "./Settings.styles";
import { AuthContext } from "../../../context/AuthContext";
import Customstatusbar from "../../shared/Customstatusbar";
import { Backheader, Copyaccountinfo, Upgrademodal } from "../../../components";
import useCustomModal from "../../../utils/useCustomModal";
// import { handleOpenWithLinking } from "../../../utils/handleOpenWithLinking";

const {
  Defaultuseravatar,
  Ratingstar,
  Memoji1,
  Upgradeicon,
  Forwardarrow,
  Memoji2,
  Lockicon,
  Shareappicon,
  Supporticon,
  Feathersmallicon,
  Shareaccounticon,
  Walletmanageicon,
} = icons;

type IconwithtitleProps = {
  bg: string;
  icon: jSX.Element;
  title: string;
  onpress: () => void;
};

const Iconwithtitle = ({ bg, icon, title, onpress }: IconwithtitleProps) => {
  return (
    <TouchableOpacity
      style={[styles.alignedContainer, styles.iconWithTitleContainer]}
      activeOpacity={0.6}
      onPress={onpress}
    >
      <View style={styles.alignedContainer}>
        {/* icons */}
        <View style={[styles.iconBg, { backgroundColor: bg }]}>{icon}</View>
        <Text style={styles.iconTitle}>{title}</Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};

const abbreviateName = (name: string) => {
  if (name?.length > 18) {
    const splitName = name.replace(/\s+/g, " ").split(" ");

    if (splitName.length >= 2) {
      return `${splitName[0]} ${splitName[1][0]}${"."}`;
    }
  }
  return name;
};

const handleOpenWithWebBrowser = (name: string, email: string) => {
  WebBrowser.openBrowserAsync(
    `https://www.feather.africa/support/app/${name}/${email}`
  );
};

const handleOpenWithLinking = () => {
  Linking.openURL("https://www.feather.africa");
};

const rateAppOnPlayStore = () => {
  Linking.openURL("https://play.google.com/store/apps/details?id=feather.peer");
};

const shareAppLink = async () => {
  const result = await Share.share(
    {
      title: "Feather Beta",
      // message: "https://play.google.com/store/apps/details?id=feather.peer",
      // message: `${"Account: 12333 "} \n ${"Age: 14" } \n ${"Job: Design"}`,
      url: "https://play.google.com/store/apps/details?id=feather.peer",
    },
    {
      dialogTitle: "Feather Beta",
      subject: "Feather Beta",
    }
  );
};

const Settings = ({ navigation }) => {
  const { authdata, setAuthData, setToken } = useContext(AuthContext);
  const {CustomModal, openModal} = useCustomModal()
  const {CustomModal: UpgradeuserModal, openModal:openUpgradeModal, closeModal:closeUpgradeModal} = useCustomModal()

  const usertype = authdata?.userDetails?.userLevel < 2 ? "newbie" : "Odogwu"
  const isNewbie = usertype === "newbie"
  const handleSignout = () => {
    setToken("");
    setAuthData({});
  };

  const Rightside = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{ ...fontsize.small, ...FONTS.medium, color: COLORS.black }}
        >
          Became an Agent
        </Text>
        <TouchableOpacity
        activeOpacity={0.8}
          onPress={() => navigation.navigate("Becomeanagent")}
          style={{
            marginLeft: 10,
            backgroundColor: COLORS.red3,
            paddingVertical: 5,
            paddingHorizontal: 10.5,
            borderRadius: 18,
          }}
        >
          <Text
            style={{ ...fontsize.smallest, color: COLORS.white, ...FONTS.bold }}
          >
            New
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}>
      <Customstatusbar />

      <Backheader
        title="Settings"
        showArrow={false}
        rightComponent={<Rightside />}
      />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* user image */}
          {/* <View style={{ width: 60, height: 60 }}> */}
            {/* <Defaultuseravatar /> */}
            {authdata?.userDetails.imageUrl !== null ? (
              <Image
                style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                source={{
                  uri: authdata?.userDetails.imageUrl,
                }}
              />
            ) : (
              <Defaultuseravatar />
            )}
          {/* </View> */}
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.profileName}>
              {abbreviateName(authdata?.userDetails?.fullName)}
            </Text>
            <Text style={styles.profileUsername}>
              @{authdata?.userDetails?.username}
            </Text>
          </View>
        </View>

        <CustomModal>
          <Copyaccountinfo />
        </CustomModal>
        <UpgradeuserModal bg={COLORS.white3}>
            <Upgrademodal closeUpgradeModal={closeUpgradeModal} />
        </UpgradeuserModal>

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 22,
            backgroundColor: COLORS.blue6,
            paddingTop: 20,
            paddingBottom: 18,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Memoji1 />
              <View
                style={{
                  backgroundColor: COLORS.deposit,
                  paddingHorizontal: 11,
                  marginLeft: 10.5,
                  paddingTop: 8,
                  paddingBottom: 6,
                  borderRadius: 13,
                }}
              >
                <Text
                  style={{
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    color: COLORS.white,
                    textTransform: "capitalize"
                  }}
                >
                  {usertype}
                </Text>
              </View>
            </View>


            {isNewbie &&
              <Text
              style={{
                ...fontsize.smallest,
                color: COLORS.yellow3,
                ...FONTS.bold,
                lineHeight: 22,
              }}
              // onPress={() => navigation.navigate("Addbvn")}
              onPress={openUpgradeModal}
            >
              Upgrade
            </Text>
            
            }
            
          </View>

          <View>
            <Text
              style={{
                ...fontsize.small,
                ...FONTS.regular,
                color: COLORS.white,
                lineHeight: 18,
              }}
            >
              Hey 👋 Padi, upgrade your profile today and get a bank account
              created for you to receive money.
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 26,
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    color: COLORS.white,
                  }}
                >
                  Account Number :
                </Text>
                <Text
                  style={{
                    ...fontsize.bsmall,
                    color: COLORS.white,
                    ...FONTS.bold,
                  }}
                >
                 {!isNewbie ?  "1000063012" : "* * * * * * * * * *"}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    color: COLORS.white,
                  }}
                >
                  Bank Name :{" "}
                </Text>
                <Text
                  style={{
                    ...fontsize.bsmall,
                    ...FONTS.bold,
                    color: COLORS.white,
                  }}
                >
                  VFD Bank
                </Text>
              </View>


                <TouchableOpacity activeOpacity={0.8} onPress={openModal} style={{backgroundColor: COLORS.blue8,width: 35, height: 35, borderRadius: 30, justifyContent: "center", alignItems: "center"}}>
                  <Shareaccounticon />
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <BottomSheet
        index={0}
        snapPoints={["45%", "65%"]}
        style={{
          shadowColor: COLORS.grey2,
          shadowOpacity: 0.5,
          shadowOffset: { width: 10, height: 5 },
          shadowRadius: 6,
          elevation: 10,
          backgroundColor: "white",
          borderRadius: 25,
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 15,
            // paddingTop: 25,
            // marginBottom: 45
            paddingBottom: 45,
          }}
        >
          <Iconwithtitle
            bg="#CECCCC"
            icon={<Memoji2 />}
            title="My Profile"
            onpress={() => navigation.navigate("Editprofile")}
          />
          <Iconwithtitle
            bg="#FFE3E3"
            icon={<Walletmanageicon />}
            title="Wallet Management"
            onpress={() => navigation.navigate("Walletmanagement")}
          />
          <Iconwithtitle
            bg="#E5FAF6"
            icon={<Lockicon />}
            title="Security & Privacy"
            onpress={() => navigation.navigate("Securityprivacy")}
          />
          <Iconwithtitle
            bg="#FFF5E5"
            icon={<Shareappicon />}
            title="Share Feather App"
            onpress={() => shareAppLink()}
          />
          <Iconwithtitle
            bg="#F1E5FF"
            icon={<Supporticon />}
            title="Support / Help Desk"
            // onpress={() => handleOpenWithWebBrowser(authdata?.userDetails?.fullName?.split(" ")[0], authdata?.userDetails?.email)}
            onpress={() => navigation.navigate("CustomWebViewSupport")}
          />
          <Iconwithtitle
            bg="#E6ECFF"
            icon={<Feathersmallicon />}
            title="About Feather"
            onpress={() => handleOpenWithLinking()}
          />

          <View style={styles.horizontalLine} />

          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={handleSignout}>
              <Text
                style={{
                  ...fontsize.small,
                  ...FONTS.bold,
                  marginBottom: 35,
                  color: COLORS.pink1,
                }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => rateAppOnPlayStore()}
            >
              <Text style={{ ...fontsize.small, ...FONTS.medium }}>
                Rate App
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default Settings;
