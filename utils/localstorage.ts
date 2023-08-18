import AsyncStorage from "@react-native-async-storage/async-storage";

const AWEEKAFTER = 1000 * 60 * 60 * 24 * 7;

const setDataInstorage = async (key, data) => {
  console.log(data, "before string");
  data = JSON.stringify(data);
  console.log(data, "after string");
  await AsyncStorage.setItem(key, data);
};

const getDataFromStorage = async (key) => {
  let stringdata = await AsyncStorage.getItem(key);
  console.log(stringdata, "stringing");
  if (stringdata) {
    return JSON.parse(stringdata);
  }
  return null;
};

const clearDataFromStorage = async (key) => {
  await AsyncStorage.removeItem(key);
};

export {
  setDataInstorage,
  getDataFromStorage,
  clearDataFromStorage,
  AWEEKAFTER,
};
