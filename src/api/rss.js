import axois from "@/axios"

export default {

    queryList(){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/list"

        return axois[type]({
            method:"get",
            url:u,
        })

    },
    deleteList(id){

        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/del"

        // 构造提交数据
        let d = {
            "id": id
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d
        })
    },
    addList(root,parent,url,name,downloadId,replaceHost){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/add"

        // 构造提交数据
        let d = {
            "root":root,
            "parent":parent,
            "url":url
        }

        if (name){
            d["name"] = name;
        }

        if (downloadId){
            d["downloadId"] = downloadId;
        }

        if (replaceHost){
            d["replaceHost"] = replaceHost;
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d
        })
    },
    setListEnable(id,enable){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/enable"

        // 构造提交数据
        let d = {
            "id": id,
            "enable": enable
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d
        })
    },
    updateList(id,root,parent,url,name,downloadId,replaceHost){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/update"

        // 构造提交数据
        let d = {
            id,
            root,
            "parentIndex": parent,
            url,
            name,
            downloadId,
            replaceHost
        }

        return axois[type]({
            headers: {
                'Content-Type': 'application/json'
            },
            method:"post",
            url:u,
            data:d
        })
    },
    queryTasks(listId){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/task/list"

        let d = {
            "id":listId
        }

        return axois[type]({
            method:"get",
            url:u,
            params:d,
        })
    },
    deleteTask(id){

        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/rss/task/del"

        // 构造提交数据
        let d = {
            "id": id
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d
        })
    },




}