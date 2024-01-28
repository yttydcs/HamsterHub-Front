import axois from "@/axios"
import download from "@/common/download";

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
        let u = "/api/queryShare"

        // 构造提交数据
        let d = {
            ticket:ticket,
        }

        if(!key){
            d["key"]="";
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

    async getDownloadUrl(ticket,key){
        let u = "/api/downloadShare"

        // 构造提交数据
        let d = {
            "ticket": ticket,

        }

        if(key){
            d.key = key
        }

        let data = (await axois[type]({
            method:"get",
            url:u,
            params:d,
        })).data

        return data

    },

    async download(ticket,key){
        let url = await this.getDownloadUrl(ticket,key);
        download.url(url)
    },


}