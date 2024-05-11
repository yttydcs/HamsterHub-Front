import axois from "@/axios"
import download from "@/common/download";

let type = 2;
export default {

    queryCid(aid,bvid) {
        let u = "https://danmaku.vercel.app/api/bilibili/video"


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

    queryXmlForBili(cid) {
        let u = "https://danmaku.vercel.app/api/bilibili/danmaku"

        //构造提交数据
        let d = {}

        if(cid){
            d["cid"] = aid;
        }

        return axois[2]({
            method: "get",
            url: u,
            params:d
        })

    },

}
