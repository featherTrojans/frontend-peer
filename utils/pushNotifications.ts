import { Alert , Platform} from "react-native"
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



//Registers device for push Notifications
export const registerForPushNotificationsAsync = async () => {
    let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


//Schdeule Push Notifications

// export const  sendSchedulePushNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "You've got mail! 📬",
//         body: 'Here is the notification body',
//         data: { data: 'goes here', takeTo: "Newtransactions" },
//       },
//       trigger: { seconds: 5 },
//     });
//   }