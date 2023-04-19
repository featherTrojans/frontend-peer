import { Platform, PermissionsAndroid } from "react-native";
import * as Contacts from "expo-contacts";

const permissiontypes = {
  contact: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
};

const getAndroidPermission = async (title, message, type) => {
  if (Platform.OS == "android") {
    let statusbool = await PermissionsAndroid.check(permissiontypes[type]);

    if (statusbool) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: `Feather Needs ${title} Permission`,
        message: message,
        buttonNegative: "Don't Allow",
        buttonPositive: "Allow",
      }
    );
    if (status == PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  }
  return true;
};

export default async (title, message, type, permission) => {
  const anstatus = getAndroidPermission(title, message, type);
  if (!anstatus) {
    return [];
  }

  return await permission();
};
