import { Alert } from "react-native";

function requestDevicePermission(title, message, DevicePermit) {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, [
      {
        text: "Don't Allow",
        onPress: () => {
          resolve(false);
        },
        style: "cancel",
      },
      {
        text: "Allow",
        onPress: async () => {
          console.log("know if it should request ");
          try {
            const { status } = await DevicePermit.requestPermissionsAsync();
            console.log(status, "know to grant access or not");
            if (status === "granted") {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (error) {
            console.log(error);
            resolve(false);
          }
        },
      },
    ]);
  });
}

const getAndroidPermission = async (title, message, DevicePermit) => {
  let { status } = await DevicePermit.getPermissionsAsync();
  console.log(status, "know if is popping the alert");
  if (status == "granted") {
    return true;
  }

  let returnstatus = await requestDevicePermission(
    title,
    message,
    DevicePermit
  );
  return returnstatus;

  // try {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //     {
  //       title: title,
  //       message: message,
  //       buttonNeutral: "Ask Me Later",
  //       buttonNegative: "Cancel",
  //       buttonPositive: "OK",
  //     }
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } catch (err) {
  //   return false;
  // }
};

export default async (title, message, DevicePermit) => {
  const returnstatus = await getAndroidPermission(title, message, DevicePermit);
  return returnstatus;
};
