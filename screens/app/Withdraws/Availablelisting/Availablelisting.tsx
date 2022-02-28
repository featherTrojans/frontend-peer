import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { images, icons, COLORS, fontsize, FONTS } from "../../../../constants";
import { styles } from "./Availablelisting.styles";

const { Backarrow, Forwardarrow, Requestee1, Requestee2, Requestee3 } = icons;
const { Mapimage } = images;

const USERDATAS = [
  {
    image: <Requestee1 />,
    name: "Adeoba Oluwadagbemi ",
    distance: 10,
    noOfBadges: 398,
  },
  {
    image: <Requestee2 />,
    name: "Jennifer Blossom",
    distance: 10,
    noOfBadges: 398,
  },
  {
    image: <Requestee3 />,
    name: "Bode Ajisafe ",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee1 />,
    name: "Thomas Uzoechina",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee3 />,
    name: "Malik Abubarkar",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee2 />,
    name: "Oreoluwa Badmus",
    distance: 17,
    noOfBadges: 18,
  },
  {
    image: <Requestee1 />,
    name: "Thomas Uzoechina",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee3 />,
    name: "Malik Abubarkar",
    distance: 30,
    noOfBadges: 19,
  },
  {
    image: <Requestee2 />,
    name: "Oreoluwa Badmus",
    distance: 17,
    noOfBadges: 18,
  },
];

const listingtypes = ["peers", "businesses", "agents"];

const Singleuser = ({ profile }: any) => {
  const { image, name, distance, noOfBadges } = profile;
  return (
    <View style={styles.userContainer}>
      <View style={styles.detailsContainer}>
        {/* Image */}
        {image}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.otherInfo}>
            <Text style={styles.distance}>~{distance} Mins away</Text>
            <View style={styles.smallDot} />
            <Text style={styles.numberOfBadges}>{noOfBadges} Badges</Text>
          </View>
        </View>
      </View>
      <View>
        <Forwardarrow />
      </View>
    </View>
  );
};

const Availablelisting = () => {
  const [active, setActive] = useState("peers");
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Mapimage}
          resizeMode="cover"
          style={styles.imageContainer}
      >
        <View>
          <Backarrow />
        </View>
        <BottomSheet
          snapPoints={["50%", "90%"]}
          style={{ paddingHorizontal: 15 }}
        >
          <View style={styles.listingTypeContainer}>
            {listingtypes.map((listingtype, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeBg,
                  active === listingtype && styles.isActive,
                ]}
                onPress={() => setActive(listingtype)}
              >
                <Text
                  style={[
                    styles.typeText,
                    active === listingtype && styles.isActiveColor,
                  ]}
                >
                  {listingtype}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={USERDATAS}
            renderItem={({ item }) => <Singleuser profile={item} />}
            keyExtractor={(item) => item.name}
          />
        </BottomSheet>
      </ImageBackground>
    </View>
  );
};

export default Availablelisting;
