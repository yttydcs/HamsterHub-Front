import { reactive } from "vue";



// 读取本地数据，与默认值合并，返回vue3响应式数据
function loadLoginData(){
    const localLoginDate = JSON.parse(localStorage.getItem('loginData'))

    // 构建默认值
    let res = {
        loginState :false,
        loginKey:{
            loginType:null,//登录验证的类型
            loginKeyValue:"" // 登录验证的值，如token、session等
        },
        user: {
            id:0,
            name: null,
            avatarSrc: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        }
    }

    //赋值，防止undefined
    if(localLoginDate !== undefined){
        res = Object.assign(res,localLoginDate)
    }

    return reactive(
        res
    )

}



const loginData = loadLoginData()

export function saveLoginData(){
    localStorage.setItem("loginData", JSON.stringify(loginData));
}

export function removeLoginData(){
    loginData.loginState = false;
    loginData.loginKey.loginKeyValue = "";
    loginData.user = {};
    localStorage.setItem("loginData", JSON.stringify(loginData));
    location.href("/login");
}

export default loginData;