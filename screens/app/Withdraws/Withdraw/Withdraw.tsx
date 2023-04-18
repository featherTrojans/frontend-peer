import { View, ActivityIndicator } from "react-native";
import React, { useState, useRef } from "react";
import { icons } from "../../../../constants";
import {
  Backheader,
  Chooseamountmodal,
  Loader,
  Mainwrapper,
  Viewbalance,
} from "../../../../components";
import useAlert from "../../../../utils/useAlerts";

type DataProps = {
  image: JSX.Element;
  full_name: string;
  username: string;
  price: string;
};

interface withdrawobj {
  agent: string;
  agentUsername: string;
  amount: string;
  charges: string;
  createdAt: string;
  meetupPoint: string;
  negotiatedFee: string;
  phoneNumber: string;
  reference: string;
  status: string;
  total: string;
}

const Withdraw = ({ navigation }) => {
  const { errorAlert } = useAlert();
  const [withdrawrequest, setWithdrawrequest] = useState([]);
  const [loading, setLoading] = useState(false);
  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });

  const handleWithdraw = (amount) => {
    if (Number(amount) < 200) {
      errorAlert(
        null,
        "You can't make a withdraw request of less than NGN 200"
      );
      return;
    }

    navigation.navigate("Availablelisting", { amount, activate: false });
  };

  if (loading) {
    return (
      <Mainwrapper>
        <>
          <Backheader title="Withdraw" />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <ActivityIndicator />
          </View>
        </>
      </Mainwrapper>
    );
  }

  return (
    <Mainwrapper>
      <>
        <Backheader title="Withdraw" />
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Viewbalance />
          </View>

          <View
            style={{
              paddingVertical: 36,
              backgroundColor: "#fff",
              paddingHorizontal: 15,
              borderTopRightRadius: 22,
              borderTopLeftRadius: 22,
            }}
          >
            <Chooseamountmodal
              headerText={"How much do you want to withdraw?"}
              onpress={handleWithdraw}
            />
          </View>
        </View>
      </>
    </Mainwrapper>
  );
};

export default Withdraw;
