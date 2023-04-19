import * as SecureStore from "expo-secure-store";

const saveCredentials = async (username, password) => {
  const credentials = { username, password };
  try {
    await SecureStore.setItemAsync("credentials", JSON.stringify(credentials));
    // console.log("Credentials saved and encrypted on device memory.");
  } catch (e) {
    console.log(e);
  }
};

const getCredentials = async () => {
  try {
    const credentials = await SecureStore.getItemAsync("credentials");
    if (credentials) {
      const myCreds = JSON.parse(credentials);
      return {
        username: myCreds.username,
        password: myCreds.password,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync("credentials");
  } catch (e) {
    console.log(e);
  }
};

const saveBiometricsAccess = async () => {
  try {
    await SecureStore.setItemAsync("savebiometrics", "true");
  } catch (err) {
    console.log(err);
  }
};

const getBiometricsAccess = async () => {
  try {
    const checkIfAccess = await SecureStore.getItemAsync("savebiometrics");
    return checkIfAccess;
  } catch (err) {
    console.log(err);
  }
};
const removeBiometricsAccess = async () => {
  try {
    await SecureStore.deleteItemAsync("savebiometrics");
  } catch (err) {
    console.log(err);
  }
};

export {
  saveCredentials,
  getCredentials,
  deleteCredentials,
  saveBiometricsAccess,
  getBiometricsAccess,
  removeBiometricsAccess,
};
