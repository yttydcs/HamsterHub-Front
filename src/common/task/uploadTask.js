import {reactive} from "vue";
import fileService from "@/service/hamster/file"
import file from "@/api/file/hamster/file";
import hash from "@/common/hash";

const KEY = "upload";


// let task:{
//     root:root,
//     parent:parent,
//     orderId:0,
//     name:"",
//     type:"",
//     status:"", // wait,hash,stop,error,doing
//     progress:0,
//     hash:"",
// }

// 读取本地数据，与默认值合并，返回vue3响应式数据
function loadUploadData(){
    const localDate = JSON.parse(localStorage.getItem(KEY));


    // 构建默认值
    let res = {
        isUpload:false,
        isHash:false,
        doing:[],
        error:[],
        done:[],
        curOrderId:0,
    };

    //赋值，防止undefined
    if(localDate !== undefined){
        res = Object.assign(res,localDate);
    }

    // 刚开始默认不执行任务
    res.isUpload = false;
    res.isHash = false;

    return reactive(
        res
    );

}

const uploadData = loadUploadData();

export function addTask(root,parentUrl,name,fileEntry,parent = null,type="file"){
    uploadData.curOrderId++;
    let orderId = uploadData.curOrderId


    uploadData.doing.push({
        root:root,
        parent:parent,
        orderId:orderId,
        name:name,
        type:"file",
        status:"wait", // wait,hash,ready,doing,stop,error
        progress:0,
        hash:"",
        parentUrl:parentUrl,
        fileEntry:fileEntry
    })
}

export async function setTasksParent(){
    let cache = {};

    for (let i = 0; i < uploadData.doing.length; i++) {
        if(uploadData.doing[i].parent!==null){
            // parent已经存在跳过
            continue
        }

        let parent = null;
        let parentUrl = uploadData.doing[i].parentUrl;

        if(parentUrl === '/' || parentUrl === ''){ // 根目录为0
            uploadData.doing[i].parent = 0;
        }else if(parentUrl in  cache){// 有缓存用缓存
            uploadData.doing[i].parent = cache[parentUrl];
        }else{

            let res = await file.getDetail(uploadData.doing[i].root,parentUrl);

            if("data" in res){
                parent = res.data[0].id;
                cache[parentUrl] = parent;
                uploadData.doing[i].parent = parent
            }else{
                // 出现异常跳过
            }
        }

    }

}

function readEntriesAsync(directory) {
    return new Promise((resolve, reject) => {
        let reader = directory.createReader();
        reader.readEntries(resolve, reject);
    });
}

function isEntry(obj){
    let s = Object.prototype.toString.call(obj)
    return s === "[object FileEntry]" || s === "[object DirectoryEntry]";
}

function isDataTransferItem(obj){
    let s = Object.prototype.toString.call(obj)
    return s === "[object DataTransferItem]";
}

async function addTasksDeep(files,items,root,parentUrl,parentId){
    for (let i = 0; i <items.length; i++) {
        let entry = items[i]

        if(!entry||!"isFile" in entry){
            window.$notification["error"]({
                title:"文件上传异常",
                description:"非预期的文件类型，该文件并未被上传！",
            })
            return;
        }


        if(entry.isFile){
            addTask(root,parentUrl,entry.name,entry,parentId)
        }else{
            let nextItems = await readEntriesAsync(entry)
            let nextUrl = parentUrl + entry.name;
            let nextParentId = null;
            // 验证是否存在

            let res = await file.getDetail(root,nextUrl);
            if("data" in res){ // 如果已经存在
                nextParentId = res.data[0].id;
            }else{ // 不存在则创建
                res = await file.mkDir(root,parentId,entry.name)
                nextParentId = res.data.id;
            }

            await addTasksDeep(files,nextItems,root,nextUrl + "/",nextParentId)

        }

    }
}

export async function addTasks(files,items,root,parentUrl,parentId){
    let nextUrl = parentUrl === "" ? "/" : parentUrl;
    let nextItems = [];
    for (let i = 0; i < items.length; i++) {
        let entry = items[i].webkitGetAsEntry();
        if(entry){
            nextItems.push(entry)
        }
    }

    await addTasksDeep(files,nextItems,root,nextUrl,parentId);

    saveData();
    startUpload();
}

function getFileFromEntry(fileEntry) {
    return new Promise((resolve, reject) => {
        fileEntry.file(resolve, reject);
    });
}

async function  uploader() {
    let i = 0
    let waiting = 0;
    while ( i < uploadData.doing.length) {

        if (uploadData.doing[i].status !== "ready"){
            if(uploadData.doing[i].status !== "wait" || uploadData.doing[i].status !== "hash"){// 防止空转
                waiting++
                hashQueue()
            }
            i++;
            continue;
        }

        uploadData.doing[i].status = "uploading"

        let fileObj = await getFileFromEntry(uploadData.doing[i].fileEntry)
        let hash = uploadData.doing[i].hash
        let root = uploadData.doing[i].root
        let parent = uploadData.doing[i].parent
        let index = i;

        let setProgress =(progressEvent)=>{
            uploadData.doing[index].progress = (progressEvent.loaded / progressEvent.total * 100 | 0);
        };

        await fileService.uploadFile(fileObj,hash,root,parent,setProgress);

        let temp  = uploadData.doing.splice(i,1)

        // 防止显示错误
        temp[0].progress = 100;
        uploadData.done.push(temp[0]);
        i=0;
        saveData()
    }

    if(waiting === 0){
        uploadData.isUpload = false;
    }else{
        setTimeout(uploader,1000);
    }


}

async function  hashQueue() {
    if(uploadData.isHash){
        return false // 已经在计算就不再新增
    }

    for (let i = 0; i < uploadData.doing.length; i++) {
        // 只计算在wait的
        if (uploadData.doing[i].status !== "wait"){
            continue;
        }

        // 锁定，防止重复计算
        uploadData.doing[i].status = "hash"

        let fileObj = await getFileFromEntry(uploadData.doing[i].fileEntry)
        let index = i;

        let setProgress =(cur,total)=>{
            let p = (cur / total * 100 | 0);
            let curP = uploadData.doing[index].progress;
            uploadData.doing[index].progress = p;
        };
        let res = await hash.fileToHash(fileObj,setProgress)

        uploadData.doing[i].hash = res;
        uploadData.doing[i].status = "ready"
        uploadData.doing[i].progress = 100

        saveData()
    }

    uploadData.isHash=false
}

export async function startUpload(){
    if(uploadData.isUpload){
        return false // 已经在上传的时候就不再继续
    }
    hashQueue()

    setTimeout(uploader,1000)

}
export function delDone(index){
    uploadData.done.splice(index,1)
    saveData()
}

export function saveData(){
    // localStorage.setItem(KEY, JSON.stringify(uploadData));
}

export function removeData(){
    localStorage.removeItem(KEY)
}



export default uploadData;