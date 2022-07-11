import axios from "axios";
import serversettings from "../utils/serversettings";

const Server = {
    live:"https://featherafrica.co:3300/api/v1/",
    dev:"https://feather.com.ng:3300/api/v1/"
}

const axiosCustom = axios.create({
    baseURL: serversettings.apiUrl
})


// baseURL:"http://44.202.108.194/api/v1/"


export default axiosCustom