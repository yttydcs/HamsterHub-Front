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
        let u = "/api/queryShareFile"

        // 构造提交数据
        let d = {
            ticket:ticket,
        }

        console.log("key",key)

        if(key){
            d["key"]=key;
        }

        console.log("d",d)

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },

    create(id,key=null,expiry=""){

        let u = "/api/share"

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

    async getDownloadUrl(ticket,key,vFileId){
        let u = "/api/getShareDownloadUrl"

        // 构造提交数据
        let d = {
            "ticket": ticket,
        }

        if(key){
            d.key = key
        }

        if(vFileId){
            d.vFileId = vFileId
        }

        let data = (await axois[type]({
            method:"get",
            url:u,
            params:d,
        })).data

        return data

    },

    async download(ticket,key,vFileId){
        let url = await this.getDownloadUrl(ticket,key,vFileId);
        download.url(url)
    },

    queryShareList(ticket,key,parentId,page="0",limit="50"){
        let u = "/api/queryShareList"

        // 构造提交数据
        let d = {
            "ticket":ticket,
            "key":key,
            "parentId":parentId,
            "page":page,
            "limit":limit,
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },


}