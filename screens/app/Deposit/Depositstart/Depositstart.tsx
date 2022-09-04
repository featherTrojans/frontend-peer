import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Backheader,
  Chooseamountmodal,
  Custombutton,
  Horizontaline,
  Mainwrapper,
  Successmodal,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import useCustomModal from "../../../../utils/useCustomModal";
import { getCurrentLocation } from "../../../../utils/customLocation";
import { doesIncludeActiveStates } from "../../../../utils/utils";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useAlert from "../../../../utils/useAlerts";

const { Newlogo } = icons;
const { Lagosbadge, Ogunbadge, Osunbadge, Oyobadge } = images;

const states = [
  {
    logo: Lagosbadge,
    state: "Lagos State",
  },
  {
    logo: Oyobadge,
    state: "Oyo State",
  },
  {
    logo: Osunbadge,
    state: "Osun State",
  },
  {
    logo: Ogunbadge,
    state: "Ogun State",
  },
];


const Depositstart = ({navigation, route}) => {
  const type = route.params.type;
  const reference = route.params.reference;
  const { CustomModal: PickstateModal, openModal, closeModal } = useCustomModal();
  const {CustomModal:AmountModal, openModal:openAmountModal, closeModal:closeAmountModal } = useCustomModal();
  const {CustomModal:SuccessContainerModal, openModal:openSuccessModal, closeModal: closeSuccessModal} = useCustomModal()
  const {CustomModal:LoadingModal, openModal:openLoadingModal, closeModal:closeLoadingModal} = useCustomModal()
  const {successAlert, errorAlert} = useAlert()
  const [locationLoading, setLocationLoading] = useState(false);
  const [coords, setCoords] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setLocationLoading(true);
      const { coordinates, address, locationObj }: any =
        await getCurrentLocation();
      if (!doesIncludeActiveStates(locationObj)) {
        openModal()
      }
      setCoords({ ...coordinates, locationText: address });
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (amount) => {
    openLoadingModal();
    try {
      if (type === "create") {
        await axiosCustom.post("/status/create", {
          amount: Number(amount),
          longitude: coords.longitude,
          latitude: coords.latitude,
          locationText: coords.locationText,
        });
      } else {
        await axiosCustom.put("/status/update", {
          amount: Number(amount),
          longitude: coords.longitude,
          latitude: coords.latitude,
          locationText: coords.locationText,
          reference,
        });
      }
      closeLoadingModal()
      openSuccessModal()
      successAlert(`You have successfully updated your deposit status to ${amount}`, true)
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChnage = (amount)=>{
    closeModal()
    closeAmountModal()
    handleSubmit(amount)
  }
  return (
    <Mainwrapper>
      <Backheader title="Deposit" />
      <PickstateModal>
        <View>
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.medium,
              color: COLORS.blue9,
            }}
          >
            Supported States
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              marginTop: 10,
              color: COLORS.grey16,
            }}
          >
            You will be notified when these features are available in your
            region
          </Text>

          <View style={{ marginTop: 30, marginBottom: 40 }}>
            {states.map(({ logo, state }, index) => {
                const isLast = states.length === index+1 
              return (
                <View key={index}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
                      source={logo}
                    />
                    <Text
                      style={{
                        marginLeft: 12,
                        ...fontsize.smaller,
                        ...FONTS.medium,
                        lineHeight: 25,
                        color: COLORS.blue9,
                      }}
                    >
                      {state}
                    </Text>
                  </View>
                  {!isLast && <Horizontaline marginV={20} />}
                </View>
              );
            })}
          </View>
            <View style={{marginBottom: 20}}>
          <Custombutton btntext="Okay, Continue" onpress={() => console.log("hellow")}/>
          </View>
        </View>

      </PickstateModal>
      <AmountModal>
        <Chooseamountmodal headerText={'How much do you want to deposit'} onpress={handleAmountChnage} />
      </AmountModal>
      <LoadingModal>
        <View style={{alignItems: "center", paddingVertical: 20, paddingHorizontal:50}}>


          <View style={{width:50, height:50, 
            marginBottom: 20,
             borderRadius: 25, borderWidth: 10, borderColor:"#000", backgroundColor:"transparent"}} />


          <Text style={{textAlign:"center", color: COLORS.blue9,...FONTS.regular, ...fontsize.small}}>Fetching your current location to create your deposit</Text>
        </View>
      </LoadingModal>
      <SuccessContainerModal>
            <Successmodal 
              btnText="Great, Continue" 
              successMsg="Your deposit status has been created successfully" btnFunction={()=>{navigation.navigate("Home")}} 
            />
      </SuccessContainerModal>
      
      
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <Newlogo />

        <Text
          style={{
            marginTop: 36,
            marginBottom: 20,
            ...fontsize.bbsmall,
            ...FONTS.medium,
            color: COLORS.blue9,
          }}
        >
          Start earning today with deposits
        </Text>
        <Text
          style={{
            ...fontsize.smaller,
            ...FONTS.regular,
            lineHeight: 20,
            color: COLORS.grey2,
          }}
        >
          We take the security and safety of our customers very seriously,
          kindly ensure you adhere to the safety advices below before
          proceeding.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <Custombutton btntext="Create Deposit" onpress={openAmountModal} />
      </View>
    </Mainwrapper>
  );
};

export default Depositstart;

const styles = StyleSheet.create({});
