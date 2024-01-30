import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";

//Registers device for push Notifications
export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }
  const  devicePushToken = (await Notifications.getExpoPushTokenAsync()).data;
  if (__DEV__) {
    console.log(devicePushToken, "here");
  }



  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return devicePushToken;
};




//Schdeule Push Notifications

export const sendSchedulePushNotification = async (title, message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
      data: { data: "goes here", redirectTo: "Root" },
    },
    trigger: { seconds: 6 },
  });
};

export const sendTokenToDB = async(token:string)=>{
  
  const tokenExtractor = (string: any) => {
    const firstIndex = string.indexOf("[");
    return string.slice(firstIndex + 1, -1);
  };
  try {
    
    const response = await axiosCustom.post("/auth/token/create", {
      messageToken: token,
    });
    return response
  } catch (err) {
    console.log(err.response);
  }
}

