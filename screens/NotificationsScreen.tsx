import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { icons, COLORS, SIZES } from "../constants";
import { FTIconwithbg, FTMainwrapper, FTTitlepagewrapper } from "../components";
import axiosCustom from "../httpRequests/axiosCustom";
import formatData from "../utils/fomatTrans";
import moment from "moment";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { NotificationScreenStyles } from "../assets/styles/screens";

const {
  container,
  listContainer,
  notificationContainer,
  iconBg,
  titleandtime,
  iconAndTitleWrap,
  titleAndTimeWrap,
  emptyListWrap,
  dateText,
  titleText,
  timeText,
  messageText,
  horizontalLine,
  upgradeNow,
  upgradeNowText,
  emptyListText,
  loadingWrap,
} = NotificationScreenStyles;
const {
  Arrowin,
  Useravatar,
  Logoavatar,
  Upgradenowarrow,
  Arrowout,
  Withdrawalnotificationicon,
  Emptynotification,
} = icons;

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
  createdAt: string;
  description: string;
};

const messageicon = (type: string) => {
  switch (type) {
    case "Wallet Credit":
      return <FTIconwithbg size={29} Icon={Arrowin} bG={COLORS.green3} />;
      break;

    case "Wallet Debit":
      return <FTIconwithbg size={29} Icon={Arrowout} bG={COLORS.red2} />;
      break;
    case "account":
      return <Useravatar />;
      break;
    case "Fund Reversal":
      return <FTIconwithbg size={29} Icon={Arrowin} bG={COLORS.green3} />;
      break;
    case "Cash Withdrawal":
      return <FTIconwithbg size={29} Icon={Arrowin} bG={COLORS.grey1} />;
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
  index,
}: {
  date: string;
  index: number;
  messages: notificationProps[];
}) => {
  return (
    <Animatable.View animation="slideInUp" delay={index * 50}>
      <Text style={dateText}>{date}</Text>

      {messages.map(
        (
          {
            type,
            title,
            createdAt: time,
            description: message,
          }: notificationProps,
          index: number
        ) => {
          const isLastItem = index === messages.length;
          const isUpgrade = type === "account";
          const formattedTime = `${moment(time).format("h:mm")}${moment(
            time
          ).format("a")}`;
          return (
            <Animatable.View
              animation="slideInUp"
              delay={index * 50}
              style={[
                notificationContainer,
                { marginBottom: !isLastItem ? RFValue(10) : 0 },
              ]}
              key={index}
            >
              <View style={titleAndTimeWrap}>
                <View style={iconAndTitleWrap}>
                  {messageicon(title)}
                  <Text style={titleText}>{title}</Text>
                </View>
                <Text style={timeText}>{formattedTime}</Text>
              </View>

              <View style={horizontalLine} />

              <View>
                <Text style={messageText}>{message}</Text>
                {isUpgrade && (
                  <View style={upgradeNow}>
                    <Text style={upgradeNowText}>
                      Upgrade Now <Upgradenowarrow />
                    </Text>
                  </View>
                )}
              </View>
            </Animatable.View>
          );
        }
      )}
    </Animatable.View>
  );
};

const NotificationsScreen = () => {
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
      setLoading(false);
      // setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  const EmptyNotification = () => {
    return (
      <View style={emptyListWrap}>
        <Emptynotification />
        <Text style={emptyListText}>
          Oops, you have no pending notifications here.{" "}
        </Text>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper title="Notifications">
      <View style={listContainer}>
        {loading ? (
          <View style={loadingWrap}>
            <ActivityIndicator size="large" color={COLORS.blue6} />
          </View>
        ) : (
          <FlatList
            data={formatData(notifications)}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({
              item,
              index,
            }: {
              item: { time: string; data: any };
              index: number;
            }) => (
              <Notification
                date={item.time}
                messages={item.data}
                index={index}
              />
            )}
            keyExtractor={(item) => item.time}
            ListEmptyComponent={() => <EmptyNotification />}
          />
        )}
      </View>
    </FTTitlepagewrapper>
  );
};

export default NotificationsScreen;
