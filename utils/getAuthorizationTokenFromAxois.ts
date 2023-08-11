import axiosCustom from "../httpRequests/axiosCustom";

const getAuthorizationTokenFromAxois = (): string => {
  const token = axiosCustom.defaults.headers.common["token"];
  if (token) return token;
  return "";
};

export default getAuthorizationTokenFromAxois;
