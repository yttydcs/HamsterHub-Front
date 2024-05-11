import download from "@/common/download";
import danma from "@/api/danma"

async function getXmlByUrl(url){
    await download.getOther()
    return await download.getOther(url)
}

async function getCidForBili(bvid){
    let res = -1;
    try {
        res = (await danma.queryCid(null,bvid)).data.cid
    }catch(err){
        res = -1;
    }
    return res
}

async function getXmlByCidForBili(cid){
    let res = "";
    try {
        res =await danma.queryXmlForBili(cid)
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
    console.log(text)

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(text, "text/xml");
    console.log(xmlDoc)


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
        // console.log(text,mode,time,color)


    }
}



export function decimalToHexColor(decimalColorString) {
    const decimalColor = parseInt(decimalColorString, 10);

    // 确保输入是一个十进制数
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

export default {
    getXmlByCidForBili,
    getCidForBili,
    getXmlByUrl,
    parseXmlForBili
}