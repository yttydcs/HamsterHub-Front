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
            per_page:pageLimit,
            refresh:refresh
        }

        console.log(d)

        return axois[type]({
            method:"get",
            url:u,
            params:d
        })

    }

}