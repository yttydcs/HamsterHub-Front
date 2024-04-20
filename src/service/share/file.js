import {reactive} from "vue";
import file from "@/api/file/hamster/file";
import adapter from "@/common/adapter/hamster"
import share from "@/api/share";

const successCode = 0; // 表示成功

// 由service内部维护
export const fileList = reactive({
    device: 0, // 描述访问的是哪个后台，如hamster或者alist
    writable:false,
    isFile:false,
    root: "",
    history:{},
    path: [],
    file: [],
    others:{rootParent:"-1"} // 保存其他的信息
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
    return await share.getShare(target.ticket,target.key,target.vFileId)
}

async function getRootParent(){

    if (fileList.others.rootParent != "-1"){
        return fileList.others.rootParent
    }

    let target = {
        ticket : getCurRoot(),
        key : fileList.others["key"],
    }

    let res = await getDetail(target);
    if(!"data" in res || !"id" in res.data){
        return "-1";
    }

    fileList.others.rootParent = res.data.id;

    return res.data.id
}

async function getNextFileDetail(index){
    let id = null;

    // 防止刷新直接进的时候异常
    if (!index){
        if(fileList.path.length===0){
            id = await getRootParent()
        }else{
            id = fileList.path[fileList.path.length-1].id;
        }
    }else{
        id = fileList.file[index].other.id;
    }

    let target = {
        ticket : getCurRoot(),
        key : fileList.others["key"],
        vFileId: id
    }
    return [(await getDetail(target)).data];
}

async function getCurPathNode(){
    if(fileList.path.length === 0){
        return {label:"root",id:fileList.others["id"]}
    }

    // 如果没有父目录id的缓存
    if(fileList.path[fileList.path.length-1].id === "-1"){

        let id = null

        if(fileList.path.length>1){
            id = fileList.path[fileList.path.length-2].id
        }

        let target = {
            ticket : getCurRoot(),
            key : fileList.others["key"],
            vFileId:id
        }

        let data = await getDetail(target);
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
    let res = "/s/" + fileList.root;

    if (fileList.isFile){
        res = res + getPathString().slice(0, -1)
    }else{
        res = res + getPathString()
    }

    res = res + "?key=" + fileList.others["key"];
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

    getDetail,

    getNextFileDetail,

    getPathString,

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
        if(arr.length <= 2 || (arr.length === 3 && arr[2]==="")){
            return;
        }

        // 临时代码，待能刷新时取消
        // arr.length=3

        // 不是根目录，并且最后一位不是 / 或 \ 则说明目标是一个文件
        if(arr.length>3 && arr[arr.length-1] !==""){
            fileList.isFile = true
        }

        // 如果指定了root
        if (arr[2]){
            fileList.root = arr[2];
        }

        // 如果指定了后续目录
        let num = 0
        let id = 0
        // 如果需要遍历path
        if(3 < arr.length){
            // let target = {
            //     ticket : getCurRoot(),
            //     key : fileList.others["key"],
            // }
            // let res = (await getDetail(target)).data;

            id = await getRootParent()
        }

        for (let i = 3; i < arr.length; i++) {
            // 必须不为空
            if(!arr[i]){
                break;
            }

            num = num+1;



            if(fileList.path.length < i-2){
                addPath("","-1")
            }


            let res = await (share.findShareByName(getCurRoot(),fileList.others["key"],id,arr[i]));
            if(!"data" in res){
                // 出现异常，后续不再继续
                num--;
                break;
            }

            if(arr[i] !== fileList.path[i-3]){
                fileList.path[i-3].label = arr[i];
                fileList.path[i-3].id = res.data.id;
                id = res.data.id;
                if(res.data.type){
                    fileList.isFile=true;
                }
            }

        }

        fileList.path.length = num
    },

    async getFileData(){
        if(!getCurRoot()){
            return
        }
        let urlString = getUrlString()
        window.history.pushState({ path: urlString }, '', urlString);

        let curParent = (await getCurPathNode()).id

        // 目录可能已经不存在
        if(this.curParent === "-1"){
            return
        }

        if (!fileList.isFile){
            window.loading.start()
            share.queryShareList(getCurRoot(),fileList.others["key"],curParent).then(function (res) {
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

    async copyFile(id,parentId){
        window.$message.info("只读状态，不可写入")
    },

}