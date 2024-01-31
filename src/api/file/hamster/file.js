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
    getFile(root="0",parentId="0",page=1,pageLimit=50,refresh=false,url = "",){

        let u = "/api/queryList"

        // 构造提交数据
        let d = {
            root:root,
            parentId:parentId,
            page:page,
            limit:pageLimit,
            refresh:refresh
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    },


    uploadFile(root="0",parentId="0",hash="",file){

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
            headers: {'Content-Type': 'multipart/form-data'}
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


    delete(aim){
        let u = "/api/delete"

        // 构造提交数据
        let d = {
            vFileId:aim,
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    },

    async getDownloadUrl(id){
        let u = "/api/getDownloadUrl"

        // 构造提交数据
        let d = {
            vFileId:id,
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

    async download(id){
        let url =await this.getDownloadUrl(id);
        download.url(url)
    },

    async copyUrl(id){
        let url =await this.getDownloadUrl(id);
        copyText(download.toAbsolute(url));
    },


    getDetail(root,url){
        let u = "/api/queryFile"

        // 构造提交数据
        let d = {
            root:root,
            url:url
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d,
        })
    },

    moveFile(vFileId,parentId){
        let u = "/api/move"

        // 构造提交数据
        let d = {
            vFileId:vFileId,
            parentId:parentId
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })
    }



}