import axois from "@/axios"

let type = 0;
export default {

    query(){
        let u = "/api/queryShares"


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

    getShare(ticket,key){
        let u = "/api/queryShares"

        // 构造提交数据
        let d = {
            ticket:ticket,
            key:key
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },

    create(id,key=null,expiry=""){

        let u = "/api/shareFile"

        if(!expiry){
            expiry = 10000
        }

        // 构造提交数据
        let d = {
            vFileId:id,
            key:key,
            expiry:expiry
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },

    delete(id){
        let u = "/api/deleteShare"

        // 构造提交数据
        let d = {
            "shareId": id
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },


}