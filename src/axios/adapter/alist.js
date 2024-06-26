import axios from "axios";
import url from "@/axios/baseUrl";

import loginData,{ saveLoginData } from "@/common/loginData";

let config = {
    baseURL: url,
    // 请求超时时间
    timeout: 10000,
    // 每次请求携带cookie
    withCredentials: true
}

const successCode = 200;
const msgIndex = "message"
const expiredCode = 401; // 表示登录状态过期

const service = axios.create(config)
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let cancel;
service.interceptors.request.use(
    config => {
        config.headers.set("Authorization",loginData.loginKey.loginKeyValue)
        return config
    }, error => {
        return error;
    }
)

service.interceptors.response.use(
    responese => {

        let data = responese.data;

        // 如果存在msg就弹出消息提示
        if(msgIndex in data){
            if(data.code === successCode){
                window.$message.success(data[msgIndex]);
            }else{
                window.$message.error(data[msgIndex]);
                if(data.code === expiredCode){

                    loginData.loginKey.loginKeyValue = "";
                    loginData.loginState = false;

                    saveLoginData()
                }
            }


        }
        return data
    },
    error => {

        // 处理被取消的请求
        if(axios.isCancel(error)){
            return new Promise(() =>{})
        }

        if(error.response === undefined || !"data" in error.response){
            // Message({message: "未知错误", type: 'error', duration: 5 * 1000})
            return error
        }


        let data = error.data

        if(msgIndex in data){
            if(data.code === successCode){
                window.$message.success(data[msgIndex])
            }else{
                window.$message.error(data[msgIndex])
            }
        }
        return error;
    }
)

service.defaults.withCredentials = true
export default service
