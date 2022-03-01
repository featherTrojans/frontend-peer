import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { Backheader, Bottombtn, Viewbalance } from "../../../components";
import { styles } from "../Withdraws/Withdraw/Withdraw.styles";

const {
  Backarrow,
  Cryingicon,
  Requestee1,
  Requestee2,
  Requestee3,
  Acceptedcheck,
} = icons;

type DataProps = {
  image: JSX.Element;
  full_name: string;
  username: string;
  price: string;
};

const REQUEST = [
  {
    image: <Requestee1 />,
    full_name: "Adegbemi Tosin",
    username: "@adetiger6",
    price: 6000,
    base_charge: 250,
    status: "pending",
  },
  {
    image: <Requestee2 />,
    full_name: "Okikiola Omotosho ",
    username: "@gyroscope",
    price: 63000,
    base_charge: 1800,
    status: "pending",
  },
  {
    image: <Requestee3 />,
    full_name: "Michael Fowosore",
    username: "@Toonnibaby",
    price: 18300,
    base_charge: 650,
    status: "accepted",
  },
  {
    image: <Requestee3 />,
    full_name: "Ayobami Lawal",
    username: "@Toonnibaby",
    price: 18300,
    base_charge: 560,
    status: "pending",
  },
];

// Component to show when the list is empty
const Emptyrequest = () => {
  return (
    <View style={styles.emptyListContainer}>
      {/* Crying icons */}
      <Cryingicon />
      {/* Information text */}
      <Text style={styles.emptyListText}>
        Padi, you have not performed any cash request today, Start Now.
      </Text>
    </View>
  );
};


const Deposit = ({navigation}) => {
  const [active, setActive] = useState("pending");


  // Requestee profile
const Requesteeprofile = ({ list, onpress}:  any ) => {
  const { image, full_name, username, price, status, base_charge } = list;
  return (
    <TouchableOpacity style={styles.depositProfileContainer} activeOpacity={0.7} onPress={onpress}>
      <View style={styles.depositProfileDetails}>
        {/* Tro replace this with the user image */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: COLORS.grey1,
          }}
        />
        <View style={{ marginLeft: 13 }}>
          <Text style={styles.depositProfileName}>{full_name}</Text>
          <Text style={styles.depositAmount}>
            NGN {price}{" "}
            <Text style={styles.depositBasecharge}>
              + NGN {base_charge} Charges
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


  const REQUESTDATA = REQUEST.filter((req) => req.status === active);

  const Requestlist = () => {
    return (
      <View style={styles.requestContainer}>
        <View style={styles.listHeaderContainer}>
          <TouchableOpacity onPress={() => setActive("pending")}>
            <Text
              style={[
                styles.listHeaderText,
                active === "pending" && styles.activeStyles,
              ]}
            >
              Pending Requests
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActive("accepted")}>
            <Text
              style={[
                styles.listHeaderText,
                active === "accepted" && styles.activeStyles,
              ]}
            >
              Accepted Requests
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={REQUESTDATA}
          renderItem={({ item }) => <Requesteeprofile list={item}    onpress={() =>
            navigation.navigate(
              item.status === "pending"
                ? "Pendingdeposit"
                : "Accepteddeposit"
            )
          } />}
          keyExtractor={(item) => `${item.full_name}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Viewbalance navigate={() => navigation.navigate("Addcash")}/>
        <View style={{ flex: 1 }}>
          {REQUEST.length < 1 ? <Emptyrequest /> : <Requestlist />}
        </View>
      </View>

      {/* <Bottombtn
        title="NEW DEPOSIT"
        onpress={() => console.log("New Transaction clicked")}
      /> */}
    </View>
  );
};

export default Deposit;
