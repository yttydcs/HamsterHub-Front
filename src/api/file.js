import axois from "@/axios"

export default {
    getFile(path="/",key="",page=1,pageLimit=50,refresh=false,type=0,url = ""){
        if(type === 0){ // 云匣默认
            return 0;
        }else if(type === 1){ // alist
            // 获得url
            let u = "/api/fs/list"

            // 构造提交数据
            let d = {
                path:path,
                password:key,
                page:page,
                per_page:pageLimit,
                refresh:refresh
            }

            return axois[type]({
                method:"post",
                url:u,
                data:d
            })
        }
    },


}