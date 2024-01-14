import axois from "@/axios"


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

    download(id,name){
        let u = "/api/download"

        // 构造提交数据
        let d = {
            vFileId:id,
        }

        axois[type]({
            responseType: 'blob',
            method:"get",
            url:u,
            params:d,
            headers: {'Content-Type': 'application/octet-stream'}
        }).then(res =>{
            // console.log(res)
            // if(!res.data){
            //     return
            // }

            let url = window.URL.createObjectURL(res)
            let a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.setAttribute('download',name)
            document.body.appendChild(a)
            a.click() //执行下载
            window.URL.revokeObjectURL(a.href) //释放url
            document.body.removeChild(a) //释放标签

        })
    }

}