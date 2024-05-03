import axois from "@/axios"

export default {

    query(hash){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/querySysConfig"


        // 构造提交数据
        let d = {
            "hash":hash,
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },

    set(key, value){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/setSysConfig"

        // 构造提交数据
        let d = {
            "key":key,
            "value":value
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },




}