import axios from "axios";
import url from "@/axios/baseUrl";

let config = {

    baseURL: url(),
    // 请求超时时间
    timeout: 10000,
    // 每次请求携带cookie
    withCredentials: false,
    maxContentLength: Infinity,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
}



const service = axios.create(config)

service.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
service.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded"

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let cancel;

service.interceptors.response.use(
    responese => {

        let data = responese.data;

        return data
    },
    error => {
        // 处理被取消的请求
        if(axios.isCancel(error)){
            return new Promise(() =>{})
        }

        return error;
    }
)

service.defaults.withCredentials = false
export default service
