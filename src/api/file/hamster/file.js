import axois from "@/axios"
import download from "@/common/download";
// 用于复制
function copyText(str){
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', str);
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

// 云匣的文件访问api
let type = 0;

export default {
    getFile(root="0",parentId="0",page=null,pageLimit=50,refresh=false,url = "",){
        // 默认不分页
        let u = "/api/queryList"

        // 构造提交数据
        let d = {
            root:root,
            parentId:encodeURIComponent(parentId),
            limit:pageLimit,
            refresh:refresh
        }

        if(page){
            d['page'] = page
        }

        if(pageLimit){
            d['pageLimit'] = pageLimit
        }

        if(refresh){
            d['refresh'] = refresh
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },


    uploadFile(root="0",parentId="0",hash="",file,onUploadProgress=null){

        let u = "/api/upload"

        // 构造提交数据
        let d = {
            root:root,
            parentId:parentId,
            file:file,
            hash:hash
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {'Content-Type': 'multipart/form-data'},
            timeout: Infinity,
            onUploadProgress: onUploadProgress
        })

    },

    mkDir(root="0",parentId="0",name=""){
        let u = "/api/mkdir"

        // 构造提交数据
        let d = {
            root:root,
            parentId:parentId,
            name:name
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    },


    delete(aim,root = "0"){
        let u = "/api/delete"

        // 构造提交数据
        let d = {
            root,
            vFileId:aim,
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    },

    async getDownloadUrl(id,root="0",preference=null){
        let u = "/api/getDownloadUrl"

        // 构造提交数据
        let d = {
            root,
            vFileId:encodeURIComponent(id),
            preference
        }

        let data = (await axois[type]({
            method:"get",
            url:u,
            params:d,
        })).data

        if(!data){ // 防止异常
            return ""
        }

        return  data
    },

    async download(id,root="0",preference=null){
        let url =await this.getDownloadUrl(id,root,preference);
        download.url(url,true)
    },

    async copyUrl(id,root="0",preference=null){
        let url =await this.getDownloadUrl(id,root,preference);
        copyText(download.toAbsolute(url));
    },

    getDetail(root,url){
        let u = "/api/queryFile"

        // 构造提交数据
        let d = {
            root:root,
            url:encodeURIComponent(url)
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d,
        })
    },

    moveFile(vFileId,parentId,root){
        let u = "/api/move"

        // 构造提交数据
        let d = {
            root,
            vFileId:vFileId,
            parentId:parentId
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    },

    copyFile(vFileId,parentId,root){
        let u = "/api/copy"

        // 构造提交数据
        let d = {
            root,
            vFileId:vFileId,
            parentId:parentId
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    },

    isExist(root,hash){
        let u = "/api/isExist"

        // 构造提交数据
        let d = {
            root:root,
            hash:hash
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d,
        })
    },

    rename(vFileId,name,root){
        let u = "/api/rename"

        // 构造提交数据
        let d = {
            root,
            vFileId:vFileId,
            name:name
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    },

}