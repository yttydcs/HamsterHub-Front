import axois from "@/axios"

export default {

    query(){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/fetchAccountAll"


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
    create(d){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/addAccount"

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {'Content-Type': 'application/json'},
        })

    },

    update(d){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/updateAccount"

        return axois[type]({
            method:"post",
            url:u,
            data:d,
            headers: {'Content-Type': 'application/json'},
        })

    },

    delete(id){
        // 设置类不做兼容
        let type = 0;

        // 设置网址
        let u = "/api/delAccount"

        // 构造提交数据
        let d = {
            "id": id
        }

        return axois[type]({
            method:"post",
            url:u,
            data:d,
        })

    },


}