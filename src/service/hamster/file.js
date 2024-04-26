import {reactive} from "vue";
import file from "@/api/file/hamster/file";
import adapter from "@/common/adapter/hamster"
import share from "@/api/share";
import download from "@/common/download";

const successCode = 0; // 表示成功

// 由service内部维护
export const fileList = reactive({
    device: 0, // 描述访问的是哪个后台，如hamster或者alist
    writable:true,
    isFile:false,
    root: "",
    history:{},
    path: [],
    file: [],
    others:{}, // 保存其他的信息
    readmeData:{id:"",url:""} // 存储readme文件的信息
});

function getPathString(){
    let arr = fileList.path
    let res = "/"
    for (let i = 0; i < arr.length; i++) {
        res = res + arr[i].label+"/"
    }
    return res
}

function getPathStringNoneLast(){
    let arr = fileList.path
    let res = ""
    for (let i = 0; i < arr.length; i++) {
        res = res + "/" + arr[i].label
    }
    return res
}

function getCurRoot(){
    return fileList.root
}

async function getDetail(target){
    return await file.getDetail(target.root,target.url)
}

async function getNextFileDetail(index){
    let target = {
        root : getCurRoot(),
        url : (getPathString()).slice(0, -1)
    }
    return (await getDetail(target)).data;
}

async function getCurPathNode(){
    if(fileList.path.length === 0){
        return {label:"root",id:"0"}
    }

    // 如果没有父目录id的缓存
    if(fileList.path[fileList.path.length-1].id === "-1"){
        let data = await getDetail({"root":fileList.root,"url":getPathStringNoneLast()});
        if("data" in data &&"type" in data.data[0] && "id" in data.data[0] &&data.data[0].type === 0){
            fileList.path[fileList.path.length-1].id = data.data[0].id
        }
    }

    return fileList.path[fileList.path.length-1]
}

function addPath(label,id){
    fileList.path.push({
        label:label,
        id:id
    })
}

function popPath(){
    fileList.isFile = false;
    return fileList.path.pop()
}

function popPathTo(postion){
    if(!(fileList.path.length > postion && postion>=0)){
        return {}
    }
    fileList.isFile = false;
    let res = fileList.path[postion]
    fileList.path.length = postion
    return res
}

function isDir(index){
    return fileList.file[index].is_dir
}

function isFile(){
    return fileList.isFile;
}


function getUrlString(){
    let res = "/" + fileList.root;
    res = res + getPathString()
    return res
}

export default {
    getFileListObject(){
        return fileList;
    },

    setPathLength(index){
        if(fileList.path.length > index){
            fileList.isFile = false;
        }
        fileList.path.length = index;
    },

    isDir,

    isFile,

    getNextFileDetail,

    getPathString,

    getCurRoot,

    getCurPathNode,

    enterPath(index) {
        addPath(fileList.file[index].name, fileList.file[index].other.id);
        fileList.isFile = !fileList.file[index].is_dir;
    },

    setRoot(root){
        fileList.root = root;
    },

    async setPathByRoute(route){
        let target = decodeURI(route)

        let arr = target.split("/");

        // 如果是根目录不处理
        if(arr.length === 1 || (arr.length === 2 && arr[1]==="")){
            return;
        }


        // 不是根目录，并且最后一位不是 / 或 \ 则说明目标是一个文件
        if(arr.length>2 && arr[arr.length-1] !==""){
            fileList.isFile = true
        }

        // 如果指定了root
        if (arr[1]){
            fileList.root = arr[1];
        }

        // 如果指定了后续目录
        let num = 0
        for (let i = 2; i < arr.length; i++) {
            // 必须不为空
            if(!arr[i]){
                break;
            }

            num = num+1;

            if(fileList.path.length < i-1){
                addPath("","-1")
            }

            if(arr[i] !== fileList.path[i-2]){
                fileList.path[i-2].label = arr[i];
                fileList.path[i-2].id = "-1";
            }

        }

        fileList.path.length = num
    },

    async getFileData(){
        if(!getCurRoot()){
            return
        }

        let urlString
        if (fileList.isFile){
            urlString = getUrlString().slice(0, -1)
        }else{
            urlString = getUrlString()
        }
        window.history.pushState({ path: urlString }, '', urlString);

        let curParent = (await getCurPathNode()).id

        // 目录可能已经不存在
        if(this.curParent === "-1"){
            return
        }

        if (!fileList.isFile){
            window.loading.start()
            file.getFile(getCurRoot(),curParent).then(function (res) {
                if (adapter.judgeLoginCode(res.code)) {
                    adapter.setFileData(res,fileList)
                }
                window.loading.finish()
            }).catch((err)=>{
                window.loading.error()
            })
        }
    },

    async fetchFileData(root,parent){
        return await file.getFile(root,parent)
    },

    async uploadFile(fileObject,hash="",root=null,parent=null,onUploadProgress=null){
        let curParent = parent
        let aimRoot = root
        let isExist = false;

        if(parent===null){
            curParent = (await getCurPathNode()).id
        }

        if(root === null){
            aimRoot = getCurRoot()
        }
        if(!!hash){
            let temp = await file.isExist(aimRoot,hash)
            if(temp.data){
                isExist = true
            }

        }

        if(!isExist){
            await file.uploadFile(aimRoot,curParent,"",fileObject,onUploadProgress)
        }else{
            await file.uploadFile(aimRoot,curParent,hash,new File([],fileObject.name),onUploadProgress)
        }
        await this.getFileData()
    },

    async newDir(name,parent=null){
        if(!name){
            window.$message.info("无法创建名字为空的文件夹")
            return
        }

        let curParent = parent

        if(curParent===null){
            curParent = (await getCurPathNode()).id
        }

        await file.mkDir(getCurRoot(),curParent,name)
    },

    async deleteFile(vFile){
        let fileId = vFile.other.id;
        await file.delete(fileId);
    },

    async downloadFile(vFile){

        if(vFile.is_dir){
            window.$message.info("不支持下载文件夹")
            return
        }

        let fileId = vFile.other.id;
        await file.download(fileId,vFile.name)
    },

    async copyFileUrl(vFile){
        if(vFile.is_dir){
            window.$message.info("不支持复制文件夹URL")
            return
        }

        let fileId = vFile.other.id;
        await file.copyUrl(fileId)
    },

    async shareFile(id,key,expiry){
        await share.create(id,key,expiry);
    },

    async moveFile(id,parentId){
        await file.moveFile(id,parentId)
    },

    async copyFile(id,parentId){
        await file.copyFile(id,parentId)
    },

    async rename(vFileId,name){
        if(!name){
            window.$message.info("名称不能为空")
        }else{
            await file.rename(vFileId,name)
        }
    },

    async getDownloadUrl(vFileId){
       let res = await file.getDownloadUrl(vFileId)
        return download.toAbsolute(res);
    }


}