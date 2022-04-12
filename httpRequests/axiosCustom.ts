import axios from "axios";

const Server = {
    dev:"https://featherafrica.co:3300/api/v1/",
    live:"https://feather.com.ng:3300/api/v1/"
}

const axiosCustom = axios.create({
    baseURL:Server.dev
})


// baseURL:"http://44.202.108.194/api/v1/"


export default axiosCustom