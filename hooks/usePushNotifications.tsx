import { useEffect, useState, useRef } from "react";
import * as Notification from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/pushNotifications";
import { customNavigation, navigationRef } from "../utils/customNavigation";

// customNavigation

// navigationRef

export function usePushNotification() {
    const [expoPushToken, setExpoPushToken] = useState<string>();
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then((token) => {
        setExpoPushToken(token);
      });
  
      notificationListener.current = Notification.addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
        }
      );
  
      responseListener.current =
        Notification.addNotificationResponseReceivedListener((response) => {
          const { data } = response.notification.request.content;
          // console.log(data, "here is the notification data")
          customNavigation(data.redirectTo, {});
        });
  
      return () => {
        Notification.removeNotificationSubscription(notificationListener.current);
        Notification.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
  
    //Instant Notifications
    const sendPushNotification = async (
      receiverMsgToken: string,
      title: string,
      body: string,
      redirectTo: string,
      channelId?: string
    ) => {
      const message = {
        to: receiverMsgToken,
        sound: "default",
        title: title,
        body: body,
        data: { someData: "here is the data", redirectTo: redirectTo },
        channelId: channelId ? channelId : "default",
      };
  
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    };
  
    return {
      sendPushNotification: sendPushNotification,
      expoPushToken: expoPushToken,
    };
  }