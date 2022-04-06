import axios from "axios";

const axiosCustom = axios.create({
    // baseURL:"https://featherafrica.co:3300/api/v1/",
    baseURL:"https://feather.com.ng:3300/api/v1/",
})


// baseURL:"http://44.202.108.194/api/v1/"


export default axiosCustom