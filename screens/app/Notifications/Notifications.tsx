import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./Notifications.styles";
import { icons } from "../../../constants";
import { Backheader } from "../../../components";
import { string } from "yup";
import { Shadow } from "../../../constants/theme";
import Customstatusbar from "../../shared/Customstatusbar";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
import moment from "moment";
import { RFValue } from "react-native-responsive-fontsize";
const { Arrowin, Useravatar, Logoavatar, Upgradenowarrow, Arrowout } = icons;

const DATA = [
  {
    date: "Today",
    messages: [
      {
        type: "credit",
        title: "Wallet credit",
        time: "2:39pm",
        message:
          "Hey, you just got credited NGN 15,650 in your Primary Wallet from @akinthomas23",
      },
    ],
  },
  {
    date: "Yesterday",
    messages: [
      {
        type: "account",
        title: "Upgrade Account Type",
        time: "2:39pm",
        message:
          "Hey padi, upgrade your account today, do more with the feather app.",
      },
    ],
  },
  {
    date: "",
    messages: [
      {
        type: "withdrawal",
        title: "Cash Withdrawal",
        time: "2:39pm",
        message:
          "Hey padi, upgrade your account today, do more with the feather app.",
      },
    ],
  },
  {
    date: "",
    messages: [
      {
        type: "withdrawal",
        title: "Cash Withdrawal",
        time: "2:39pm",
        message:
          "Hey padi, upgrade your account today, do more with the feather app.",
      },
    ],
  },
  {
    date: "",
    messages: [
      {
        type: "account",
        title: "Upgrade Account Type",
        time: "2:39pm",
        message:
          "Hey padi, upgrade your account today, do more with the feather app.",
      },
    ],
  },
];

type notificationProps = {
  type: string;
  title: string;
  time: string;
  message: string;
};

const messageicon = (type: string) => {
  switch (type) {
    case "Wallet Credit":
      return (
        <View style={styles.creditIcon}>
          <Arrowin />
        </View>
      );

      break;

      case "Wallet Debit":
        return (
          <View style={styles.debitIcon}>
            <Arrowout />
          </View>
        );
  
        break;
    case "account":
      return <Useravatar />;
      break;
    case "Cash Withdrawal":
      return <Logoavatar />;
      break;
    
      case "Cash Deposit":
      return <Logoavatar />;
      break;

    default:
      return <Logoavatar />;
      break;
  }
};

const Notification = ({
  date,
  messages,
}: {
  date: string;
  messages: notificationProps[];
}) => {

  return (
    <View style={[{ marginBottom: RFValue(28), ...Shadow, borderRadius: RFValue(15) }]}>
      <View style={{ marginBottom: RFValue(24) }}>
        <Text style={styles.date}>{date}</Text>
      </View>
      {messages.map(
        ({ type, title, createdAt:time, description: message }: notificationProps, index: number) => {
          const isLastItem = index === messages.length;
          const isUpgrade = type === "account";
          const formattedTime = `${moment(time).format('h:mm')}${moment(time).format('a')}`
          return (
            <View
              style={[
                styles.notificationContainer,
                { marginBottom: !isLastItem ? RFValue(10) : 0 },
              ]}
              key={index}
            >
              <View>
                {/* Sender Icons */}
                {messageicon(title)}
              </View>
              <View style={[styles.infoContainer, { flex: 1 }]}>
                <View style={styles.titleandtime}>
                  {/* Top Section */}
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.time}>{formattedTime}</Text>
                </View>
                {/* Horizontal line */}
                <View style={styles.horizontalLine} />
                <View>
                  <Text style={styles.message}>{message}</Text>
                  {isUpgrade && (
                    <View style={styles.upgradeNow}>
                      <Text style={styles.upgradeNowText}>
                        Upgrade Now <Upgradenowarrow />
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        }
      )}
    </View>
  );
};

const Notifications = () => {

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getAllNotifications = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/notifications");
      console.log(response, "Here is the notifications");
      setNotifications(response?.data?.data?.notifications);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(true);
      // setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header title */}
      <View>
        <Backheader title="Notifications" />
      </View>
      <Customstatusbar />
      <View style={styles.listContainer}>
        {/* Flatlist list of notifications */}
        <FlatList
          data={formatData(notifications)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Notification date={item.time} messages={item.data} />
          )}
          keyExtractor={(item) => item.time}
          // ListEmptyComponent={}
        />
      </View>
    </View>
  );
};

export default Notifications;
