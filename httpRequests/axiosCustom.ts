import axios from "axios";

export default axios.create({
    baseURL:"http://feather.com.ng/api/v1/",
    // baseURL:"http://44.202.108.194/api/v1/"
})