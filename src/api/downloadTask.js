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
    create(root, parentId, url){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/downloadTask"

        // 构造提交数据
        let d = {
            "root": root,
            "parentId": parentId,
            "url": url
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },

    delete(tag){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/deleteTask"

        // 构造提交数据
        let d = {
            "tag": tag
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },


}