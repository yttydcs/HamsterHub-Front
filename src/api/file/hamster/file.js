import axois from "@/axios"

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

        return process.env["VUE_APP_URL"]+"api" + data
    },

    async download(id){

        let url =await this.getDownloadUrl(id);

        if(url === ""){
            return;
        }

        let iframe = document.createElement('iframe')

        // 防止影响页面，并设置属性
        iframe.style.display = 'none'
        iframe.style.height = 0
        iframe.src = url

        // 加入dom树
        document.body.appendChild(iframe)
        setTimeout(function () {
            document.body.removeChild(iframe)
        }, 100);




        // axois[type]({
        //     responseType: 'blob',
        //     method:"get",
        //     url:u,
        //     params:d,
        //     headers: {'Content-Type': 'application/octet-stream'}
        // }).then(res =>{
        //     // console.log(res)
        //     // if(!res.data){
        //     //     return
        //     // }
        //
        //     let url = window.URL.createObjectURL(res)
        //     let a = document.createElement('a')
        //     a.style.display = 'none'
        //     a.href = url
        //     a.setAttribute('download',name)
        //     document.body.appendChild(a)
        //     a.click() //执行下载
        //     window.URL.revokeObjectURL(a.href) //释放url
        //     document.body.removeChild(a) //释放标签
        //
        // })
    },



    async copyUrl(id){
        let url =await this.getDownloadUrl(id);
        copyText(url);
    }

}