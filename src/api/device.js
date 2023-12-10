import axois from "@/axios"

export default {

    query(){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/queryDevice"


        // 构造提交数据
        // let d = {
        //     "username":name,
        //     "password":pwd
        // }

        return axois[type]({
            method:"get",
            url:u,
        })

    },
    getDeviceType(){

        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/deviceType"


        return axois[type]({
            method:"get",
            url:u,
        })

    },
    create(d){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/createDevice"

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {'Content-Type': 'application/json'},
        })

    },

    update(d){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/modifyDevice"

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {'Content-Type': 'application/json'},
        })

    },

    delete(id){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/deleteDevice"

        // 构造提交数据
        let d = {
            "deviceId": id
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },


}