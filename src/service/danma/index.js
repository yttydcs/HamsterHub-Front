import download from "@/common/download";
import danma from "@/api/danma"

async function getXmlByUrl(url){
    return await download.getOther(url)
}

async function getCidForBili(bvid,proxy){
    let res = -1;
    try {
        if (proxy){
            res = (await danma.queryCid(null,bvid)).data[0].cid
        }else {
            res = (await danma.queryCidDirect(null,bvid)).data[0].cid
        }

    }catch(err){
        res = -1;
    }
    return res
}

async function getXmlByCidForBili(cid,proxy){
    let res = "";
    try {
        if(proxy){
            res = await danma.queryXmlForBili(cid)
        }else{
            res = await danma.queryXmlForBiliDirect(cid)
        }
    }catch(err){
        res = "";
    }
    return res
}

async function parseXmlForBili(text,addFunc){

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text, "text/xml");

    let childNodes = xmlDoc.documentElement.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
        // 检查是否是元素节点
        if(childNodes[i].nodeName !== "d"){
            continue;
        }

        let text = childNodes[i].textContent
        let data = childNodes[i].getAttribute("p")

        // insertBiliDanMa(text,mode,time,color)

        // 防止为空
        if(!data || !text){
            continue
        }

        let arr = data.split(",")


        let time = parseFloat(arr[0])
        let mode = arr[1]
        let color = decimalToHexColor(arr[3])
        addFunc(text,mode,time,color)
    }
}


async function parseJsonForDanDan(json,addFunc){

    let comments = json.comments;
    for (let i = 0; i < comments.length; i++) {

        let text = comments[i].m
        let data = comments[i].p

        // 防止为空
        if(!data || !text){
            continue
        }

        let arr = data.split(",")


        let time = parseFloat(arr[0])
        let mode = arr[1]
        let color = decimalToHexColor(arr[2])

        addFunc(text,mode,time,color)
    }
}



export function decimalToHexColor(decimalColorString) {
    const decimalColor = parseInt(decimalColorString, 10);

    if (isNaN(decimalColor)) {
        // 否则输出默认值
        return "#ffffff";
    }

    // 将十进制数转换为十六进制字符串
    let hexColor = decimalColor.toString(16);

    // 补全颜色代码到6位
    while (hexColor.length < 6) {
        hexColor = '0' + hexColor;
    }

    // 返回完整的十六进制颜色代码
    return '#' + hexColor;
}

export async function loadDanmakuForBiliById(value,addFunc,proxy){
    // "BV1Mx4y1i7Ny"
    try {
        let cid = await getCidForBili(value,proxy);

        if(!cid|| cid<=0){
            return 0;
        }

        let res = await getXmlByCidForBili(cid,proxy)

        await parseXmlForBili(res,addFunc)
    }catch {
        return 0;
    }

}

export async function loadDanmakuForBiliByUrl(value,addFunc,proxy){
    // "https://danmaku.vercel.app/api/bilibili/danmaku?cid=1526805156"
    let res = await getXmlByUrl(value,proxy)
    await parseXmlForBili(res,addFunc)
}

export async function loadDanmakuForDanDanByUrl(value,addFunc,proxy){
    // "https://api.dandanplay.net/api/v2/comment/12270001?withRelated=true"
    let res = await getXmlByUrl(value,proxy)
    await parseJsonForDanDan(res,addFunc)
}

const typeIndex={
    "BiliBili By Id" : loadDanmakuForBiliById,
    "BiliBili By Url" : loadDanmakuForBiliByUrl,
    "DanDan By Url" : loadDanmakuForDanDanByUrl
}

export async function loadDanmaku(type,value,addFunc,proxy){
    let func = typeIndex[type]
    if(func){
        await func(value,addFunc,proxy);
    }
}

export default {
    loadDanmakuForBiliById,
    loadDanmakuForBiliByUrl,
    loadDanmakuForDanDanByUrl,
    loadDanmaku,
}