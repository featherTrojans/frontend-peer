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
      const credentials = await SecureStore.getItemAsync('credentials');
      if (credentials) {
          const myCreds = JSON.parse(credentials);
          return ({
              username: myCreds.username,
              password: myCreds.password,
          });
      } 
    } catch (e) {
      console.log(e);
    }
  };

  export {saveCredentials, getCredentials};