// 图标索引
const iconTypeIndex = {
    gif: "gif",
    ico: "img",
    jpeg: "img",
    jpg: "img",
    png: "img",
    txt: "text",
    yaml: "text",
    cfg: "text",
    md: "text",
    m4a: "audio",
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    flac: "audio",
    mp4: "video",
    flv: "video",
    xlsx: "excel",
    xls: "excel",
    pptx: "ppt",
    ppt: "ppt",
    docx: "word",
    doc: "word",
    java: "code",
    c: "code",
    'c++': "code",
    cpp: "code",
    pdf: "pdf",
    zip: "zip",
    rar: "zip",
    "7z": "zip",
    mkv:"video",
}

// 预览方式的索引
const openTypeIndex = {
    gif: "img",
    ico: "img",
    jpeg: "img",
    jpg: "img",
    png: "img",
    txt: "text",
    yaml: "text",
    cfg: "text",
    md: "md",
    m4a: "audio",
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    flac: "audio",
    mp4: "video",
    flv: "video",
    docx: "docx",
    xlsx: "xlsx",
    xls: "xls",
    pdf: "pdf",
    java: "text",
    c: "text",
    'c++': "text",
    mkv:"video",
}

export default {
    getIconTypeByName(name){
        let arr = name.split(".");
        if(arr.length <= 1){
            return "file"
        }

        let suffix = arr.pop()

        if(iconTypeIndex.hasOwnProperty(suffix)){
            return iconTypeIndex[suffix]
        }

        return "file"
    },
    getOpenTypeByName(name){
        if(!name){
            return "file"
        }

        let arr = name.split(".");
        if(arr.length <= 1){
            return "file"
        }

        let suffix = arr.pop()

        if(openTypeIndex.hasOwnProperty(suffix)){
            return openTypeIndex[suffix]
        }

        return "file"
    },
}