import { StyleSheet, Text, View, FlatList } from "react-native";
import React, {useEffect, useState} from "react";
import { styles } from "./Notifications.styles";
import { icons } from "../../../constants";
import { Backheader } from "../../../components";
import { string } from "yup";
import { Shadow } from "../../../constants/theme";
import Customstatusbar from "../../shared/Customstatusbar";
import axiosCustom from "../../../httpRequests/axiosCustom";
const { Arrowin, Useravatar, Logoavatar, Upgradenowarrow } = icons;

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
    case "credit":
      return (
        <View style={styles.senderIcon}>
          <Arrowin />
        </View>
      );

      break;
    case "account":
      return <Useravatar />;
      break;
    case "withdrawal":
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

  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])





  const getAllNotifications = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/notifications");
      console.log(response, "Here is the notifications")
      setNotifications(response.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(true);
      // setRefreshing(false);
    }
  };


  useEffect(() => {
    getAllNotifications()
  })
  return (
    <View style={[{ marginBottom: 28, ...Shadow, borderRadius: 15 }]}>
      <View style={{ marginBottom: 24 }}>
        <Text style={styles.date}>{date}</Text>
      </View>
      {messages.map(
        ({ type, title, time, message }: notificationProps, index: number) => {
          const isLastItem = index === messages.length;
          const isUpgrade = type === "account"
          return (
            <View
              style={[
                styles.notificationContainer,
                { marginBottom: !isLastItem ? 10 : 0 },
              ]}
              key={index}
            >
              <View >
                {/* Sender Icons */}
                {messageicon(type)}
              </View>
              <View style={[styles.infoContainer, { flex: 1 }]}>
                <View style={styles.titleandtime}>
                  {/* Top Section */}
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.time}>{time}</Text>
                </View>
                {/* Horizontal line */}
                <View style={styles.horizontalLine} />
                <View>
                  <Text style={styles.message}>{message}</Text>
                  {isUpgrade && <View style={styles.upgradeNow}><Text style={styles.upgradeNowText}>Upgrade Now <Upgradenowarrow /></Text></View>}
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
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Notification date={item.date} messages={item.messages} />
          )}
          keyExtractor={(item) => item.date}
          // ListEmptyComponent={}
        />
      </View>
    </View>
  );
};

export default Notifications;
