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

    getShare(ticket,key,vFileId){
        let u = "/api/queryShareFile"

        // 构造提交数据
        let d = {
            ticket:ticket,
        }

        if (key){
            d["key"]=key;
        }

        if (vFileId){
            d["vFileId"]=encodeURIComponent(vFileId);
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },

    create(id,key=null,expiry="", name="", root=null){

        let u = "/api/share"

        // 构造提交数据
        let d = {
            root,
            vFileId:encodeURIComponent(id),
            key:key,
            expiry:expiry,
            name:name
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },

    delete(id,root){
        let u = "/api/deleteShare"

        // 构造提交数据
        let d = {
            root,
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
            d.vFileId =encodeURIComponent(vFileId);
        }

        let data = (await axois[type]({
            method:"get",
            url:u,
            params:d,
        })).data

        return data

    },

    async download(ticket,key,vFileId){
        let url = ""
        try {
            let data = (await this.getShare(ticket, key, vFileId)).data
            // 不能下载文件夹
            if(data.type===0){
                window.$message.error ("无法下载文件夹")
                return;
            }

            url = await this.getDownloadUrl(ticket,key,vFileId);
        }catch (e) {

        }

        if (url === undefined){
            return;
        }

        download.url(url)
    },

    queryShareList(ticket,key,parentId,page="0",limit="50"){
        let u = "/api/queryShareList"

        // 构造提交数据
        let d = {
            "ticket":ticket,
            "key":key,
            "parentId":encodeURIComponent(parentId),
            "page":page,
            "limit":limit,
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },

    findShareByName(ticket,key,parentId,name){
        let u = "/api/searchShareFile"

        // 构造提交数据
        let d = {
            ticket:ticket,
            parentId:encodeURIComponent(parentId),
            name:encodeURIComponent(name),
        }

        if (key){
            d["key"]=key;
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },


}