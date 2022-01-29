import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import { Sendingandreceive } from "../../../../components";
import { styles } from "./Pendingrequest.styles";

const {
  Backarrow,
  Senderimage,
  Receiverimage,
  Sendingarrow,
  Receivingarrow,
  Chatdark,
  Renegotiate,
  Cancelrequest,
  Backarrowgrey,
  // Trustedbadge
} = icons;

const { Trustedbadgepng } = images;

const actions = [
  {
    icon: <Chatdark />,
    title: "Chat with Susan",
  },
  {
    icon: <Renegotiate />,
    title: "Renegotiate Request",
  },
  {
    icon: <Cancelrequest />,
    title: "Cancel Request",
  },
];

const Pendingrequest = () => {
  return (
    <View style={styles.container}>
      {/* Icon at at the top */}
      <View style={styles.backArrow}>
        <Backarrow />
      </View>

      {/* images showing receiver and sender */}
      <View style={{ flex: 0.5 }}>
        <View style={styles.detailsContainer}>
          <Sendingandreceive />
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.detailsPrice}>NGN 35,000.00</Text>
          </View>
          <View style={styles.withdrawalChargeBg}>
            <Text style={styles.withdrawalChargeText}>
              Withdrawal Charges :{" "}
              <Text style={styles.withdrawalChargeSubText}>+ N750</Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 0.5 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.actionsHeaderText}>Actions</Text>
        </View>

        {actions.map(({ icon, title }, index) => (
          <View key={index} style={styles.actionContainer}>
            <View style={styles.actionData}>
              {icon}
              <Text style={styles.actionText}>{title}</Text>
            </View>

            <Backarrowgrey />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Pendingrequest;
