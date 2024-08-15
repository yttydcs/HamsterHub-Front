import axois from "@/axios"

export default {

    query(){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/taskList"

        return axois[type]({
            method:"get",
            url:u,
        })

    },
    create(root, parentId, url, name, downloader){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/downloadTask"

        // 构造提交数据
        let d = {
            "root": root,
            "parentId": parentId,
            "url": url,
            "name": name
        }

        if (downloader){
            d["downloadId"] = downloader
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },

    delete(tag, downloader){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/deleteTask"

        // 构造提交数据
        let d = {
            "tag": tag
        }

        if(downloader){
            d["downloadId"] = downloader
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },
    queryDownloader(){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/downloaderList"

        return axois[type]({
            method:"get",
            url:u,
        })

    },



}