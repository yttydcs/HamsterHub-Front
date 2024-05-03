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
    register(name,pwd,phone,code,type=0,url = ""){

        // type  1.云匣默认 2.alist
        // 设置网址
        let u
        if(type === 0){
            u = url||"/api/registerAccount"
        }


        // 构造提交数据
        let d = {
            "username":name,
            "password":pwd,
            "phone":phone,
            "code":code
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
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
        try{
            await axois[type]({
                method:"post",
                url:u,
            })
        }catch (e) {
            console.log(e)
        }


        removeLoginData();
    },
    changeUserAvatar(file,type=0){

        let u = "/api/uploadAvatar"

        // 构造提交数据
        let d = {
            file:file,
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {'Content-Type': 'multipart/form-data'},
            timeout: Infinity,
        })

    },

    sendCode(phone,type=0){

        let u = "/api/sendPhoneCode"

        // 构造提交数据
        let d = {
            phone:phone,
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d,
        })

    },
}