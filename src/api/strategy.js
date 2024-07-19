import axois from "@/axios"

export default {

    query(){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/queryStrategy"


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
    getStrategyType(){

        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/strategyType"

        return axois[type]({
            method:"get",
            url:u,
        })

    },
    getStrategyMode(){

        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/strategyMode"


        return axois[type]({
            method:"get",
            url:u,
        })

    },
    create(d){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/createStrategy"

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
        let u = "/api/modifyStrategy"

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
        let u = "/api/deleteStrategy"

        // 构造提交数据
        let d = {
            "strategyId": id
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },

    getStrategySize(root,combine = "0"){

        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/queryStrategySize"

        let d = {
            root,
            combine
        };

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },


}