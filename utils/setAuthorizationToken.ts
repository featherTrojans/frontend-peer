import axiosCustom from "../httpRequests/axiosCustom";

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

export default setAuthorizationToken;
