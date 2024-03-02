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
        return {label:"root",id:fileList.others["id"]}
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
    let res = "/s/" + fileList.root;
    res = res + getPathString() + "?key=" + fileList.others["key"];
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
            return true;
        }
        return false;
    },

    setRoot(root){
        fileList.root = root;
    },

    async setPathByRoute(route){
        let target = decodeURI(route)

        let arr = target.split("/");

        // 如果是根目录不处理
        if(arr.length <= 2 || (arr.length === 3 && arr[2]==="")){
            return;
        }

        // 如果指定了root
        if (arr[2]){
            fileList.root = arr[2];
        }

        // 如果指定了后续目录
        let num = 0
        for (let i = 3; i < arr.length; i++) {
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
        window.loading.start()
        share.queryShareList(getCurRoot(),fileList.others["key"],curParent).then(function (res) {
            if (adapter.judgeLoginCode(res.code)) {
                adapter.setFileData(res,fileList)
            }
            window.loading.finish()
        }).catch((err)=>{
            window.loading.error()
        })
    },

    async fetchFileData(root,parent){
        return await share.queryShareList(root,fileList.others["key"],parent)
    },

    async uploadFile(fileObject){
        window.$message.info("只读状态，不可写入")
    },

    async newDir(name,parent=null){
        window.$message.info("只读状态，不可写入")
    },

    async downloadFile(vFile){

        if(vFile.is_dir){
            window.$message.info("不支持下载文件夹")
            return
        }

        let fileId = vFile.other.id;
        await share.download(fileList.root,fileList.others["key"],fileId)
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
        window.$message.info("只读状态，不可写入")
    },

    async moveFile(id,parentId){
        window.$message.info("只读状态，不可写入")
    },

}