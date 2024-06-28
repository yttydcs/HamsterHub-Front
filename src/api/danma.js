import axois from "@/axios"
import download from "@/common/download";

let type = 2;
export default {

    queryCid(aid,bvid) {
        let u = "/api/proxy/queryPageListBili"


        //构造提交数据
        let d = {}

        if(aid){
            d["aid"] = aid;
        }

        if(bvid){
            d["bvid"] = bvid;
        }

        return axois[0]({
            method: "get",
            url: u,
            params:d
        })

    },

    queryXmlForBili(cid) {
        let u = "/api/proxy/queryXmlForBili"

        //构造提交数据
        let d = {}

        if(cid){
            d["cid"] = cid;
        }

        return axois[0]({
            method: "get",
            url: u,
            params:d
        })

    },

    queryCidDirect(aid,bvid) {
        let u = "https://api.bilibili.com/x/player/pagelist"

        //构造提交数据
        let d = {}

        if(aid){
            d["aid"] = aid;
        }

        if(bvid){
            d["bvid"] = bvid;
        }

        return axois[2]({
            method: "get",
            url: u,
            params:d
        })

    },

    queryXmlForBiliDirect(cid) {
        let u = "https://api.bilibili.com/x/v1/dm/list.so"

        //构造提交数据
        let d = {}

        if(cid){
            d["oid"] = cid;
        }

        return axois[2]({
            method: "get",
            url: u,
            params:d
        })

    },

}
