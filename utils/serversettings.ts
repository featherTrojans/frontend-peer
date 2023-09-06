import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://featherafrica.co:3300/api/v1/",
  },
  staging: {
    apiUrl: "http://featherafrica.co:3300/api/v1/",
  },
  production: {
    apiUrl: "http://featherafrica.co:3300/api/v1/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest?.releaseChannel === "staging") return settings.staging;
  return settings.production;
};

export default getCurrentSettings();
