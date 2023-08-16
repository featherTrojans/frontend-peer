import AsyncStorage from "@react-native-async-storage/async-storage";

const AWEEKAFTER = 1000 * 60 * 60 * 24 * 7;

const setDataInstorage = async (key, data) => {
  data = JSON.stringify(data);
  await AsyncStorage.setItem(key, data);
};

const getDataFromStorage = async (key) => {
  let stringdata = await AsyncStorage.getItem(key);
  if (stringdata) {
    return JSON.parse(stringdata);
  }
  return null;
};

export { setDataInstorage, getDataFromStorage, AWEEKAFTER };
