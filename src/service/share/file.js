import {reactive} from "vue";
import file from "@/api/file/hamster/file";
import adapter from "@/common/adapter/hamster"
import share from "@/api/share";

const successCode = 0; // 表示成功

// 由service内部维护
export const fileList = reactive({
    device: 0, // 描述访问的是哪个后台，如hamster或者alist
    writable:false,
    root: "",
    history:{},
    path: [],
    file: [],
    others:{} // 保存其他的信息
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

async function getCurPathNode(){
    if(fileList.path.length === 0){
        return {label:"root",id:"0"}
    }

    // 如果没有父目录id的缓存
    if(fileList.path[fileList.path.length-1].id === "-1"){
        let data = await file.getDetail(fileList.root,getPathStringNoneLast());
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
    return fileList.path.pop()
}

function popPathTo(postion){
    if(!(fileList.path.length > postion && postion>=0)){
        return {}
    }

    let res = fileList.path[postion]
    fileList.path.length = postion
    return res
}

function isDir(index){
    return fileList.file[index].is_dir
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
        fileList.path.length = index;
    },

    isDir,

    getPathString,

    enterPath(index) {
        if (fileList.file[index].is_dir) {
            addPath(fileList.file[index].name, fileList.file[index].other.id);
        }
        console.log(fileList)
    },

    async setRoot(root){
        fileList.root = root;
    },

    async setPathByRoute(route){
        let target = decodeURI(route)

        let arr = target.split("/");



        // 如果是根目录不处理
        if(arr.length === 1 || (arr.length === 2)&& arr[1]===""){
            return;
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

        window.history.pushState({ path: getUrlString() }, '', getUrlString());

        let curParent = (await getCurPathNode()).id

        // 目录可能已经不存在
        if(this.curParent === "-1"){
            return
        }

        file.getFile(getCurRoot(),curParent).then(function (res) {
            if (adapter.judgeLoginCode(res.code)) {
                adapter.setFileData(res,fileList)
            }
        })
    },

    async fetchFileData(root,parent){
        return await file.getFile(root,parent)
    },

    async uploadFile(fileObject){
        let curParent = (await getCurPathNode()).id
        await file.uploadFile(getCurRoot(),curParent,"",fileObject)
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
        let fileId = vFile.other.id;
        await file.copyUrl(fileId)
    },

    async shareFile(id,key,expiry){
        await share.create(id,key,expiry);
    },

    async moveFile(id,parentId){
        await file.moveFile(id,parentId)
    },




}