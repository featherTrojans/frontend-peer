import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Backheader, Bottombtn, Viewbalance } from "../../../../components";
import { styles } from "./Withdraw.styles";

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
    full_name: "Adgbemi ",
    username: "@adetiger6",
    price: 68500,
    status: "pending",
  },
  {
    image: <Requestee2 />,
    full_name: "Okikiola ",
    username: "@gyroscope",
    price: 63000,
    status: "pending",
  },
  {
    image: <Requestee3 />,
    full_name: "Michael",
    username: "@Toonnibaby",
    price: 18300,
    status: "accepted",
  },
  {
    image: <Requestee3 />,
    full_name: "Michael",
    username: "@Toonnibaby",
    price: 18300,
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

// Requestee profile
const Requesteeprofile = ({ list }: { list: any }) => {
  const { image, full_name, username, price, status } = list;
  return (
    <View style={styles.withdrawProfileContainer}>
      <View style={{ flexDirection: "row" }}>
        {/* Image */}
        {image}

        <View style={styles.namesContainer}>
          <Text style={styles.withdrawProfileName}>{full_name}</Text>
          <Text style={styles.withdrawProfileUsername}>{username}</Text>
        </View>
      </View>

      <View style={styles.priceAndCheck}>
        <Text style={styles.withdrawProfilePrice}>N{price}</Text>

        {status === "accepted" && <Acceptedcheck />}
      </View>
    </View>
  );
};

const Withdraw = () => {
  const [active, setActive] = useState("pending");

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
          renderItem={({ item }) => <Requesteeprofile list={item} />}
          keyExtractor={(item) => `${item.full_name}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Withdraw" />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance />
        <View style={{ flex: 1 }}>
          {REQUEST.length < 1 ? <Emptyrequest /> : <Requestlist />}
        </View>
      </View>

      <Bottombtn
        title="NEW TRANSACTION"
        onpress={() => console.log("New Transaction clicked")}
      />
    </View>
  );
};

export default Withdraw;
