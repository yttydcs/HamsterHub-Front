import axois from "@/axios"
import {removeLoginData} from "@/common/loginData";

export default {
    login(name,pwd,lasting=false,type=0,url = ""){

     // type  1.云匣默认 2.alist
     // 设置网址
     let u
     if(type === 0){
         u = url||"/api/loginAccount"
     }else if(type === 1){
         u = url||"/api/auth/login"
     }else{
         return
     }

     // 构造提交数据
     let d = {
         "username":name,
         "password":pwd,
         "lasting":lasting
     }

     return axois[type]({
         method:"post",
         url:u,
         data:d
     })

    },
    register(name,pwd,type=0,url = ""){

        // type  1.云匣默认 2.alist
        // 设置网址
        let u
        if(type === 0){
            u = url||"/api/registerAccount"
        }
        // else if(type === 1){
        //     u = url||"/api/auth/login"
        // }else{
        //     return
        // }

        // 构造提交数据
        let d = {
            "username":name,
            "password":pwd
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    },
    changePwd(oldPwd,newPwd,type=0,url = ""){

        // type  1.云匣默认 2.alist
        // 设置网址
        let u
        if(type === 0){
            u = url||"/api/changePassword"
        }
        // else if(type === 1){
        //     u = url||"/api/auth/login"
        // }else{
        //     return
        // }

        // 构造提交数据
        let d = {
            "oldPassword":oldPwd,
            "newPassword":newPwd
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },
    async logout(type=0,url = ""){

        // type  1.云匣默认 2.alist
        // 设置网址
        let u
        if(type === 0){
            u = url||"/api/logout"
        }

        await axois[type]({
            method:"post",
            url:u,
        })

        removeLoginData();
    },
}