import { reactive } from "vue";
import fileService from "@/service/hamster/file"
import file from "@/api/file/hamster/file";

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
        doing:[],
        error:[],
        done:[],
        curOrderId:0,
    };

    //赋值，防止undefined
    if(localDate !== undefined){
        res = Object.assign(res,localDate);
    }

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
        status:"wait", // wait,hash,ready,stop,error,doing
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

            // let res2 = await file.getDetail(uploadData.doing[i].root,parentUrl);
            // console.log(res2)

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
    // console.log(files,items,root,parentUrl,parentId)
    for (let i = 0; i <items.length; i++) {
        let entry = items[i]

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

            // console.log(res)
            // let nextParentId = res.data.id;

            await addTasksDeep(files,nextItems,root,nextUrl + "/",nextParentId)

        }

    }
}

export async function addTasks(files,items,root,parentUrl,parentId){
    let nextUrl = parentUrl === "" ? "/" : parentUrl;
    let nextItems = [];
    for (let i = 0; i < items.length; i++) {
        nextItems.push(items[i].webkitGetAsEntry())
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
    while ( i < uploadData.doing.length) {

        if (uploadData.doing[i].status !== "wait"){
            i++;
            continue;
        }

        let fileObj = await getFileFromEntry(uploadData.doing[i].fileEntry)
        let hash = uploadData.doing[i].hash
        let root = uploadData.doing[i].root
        let parent = uploadData.doing[i].parent
        let index = i;
        let setProgress =(progressEvent)=>{
            console.log(progressEvent.loaded , progressEvent.total)
            let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)
            console.log(persent)
            uploadData.doing[index].progress = persent;
        };

        await fileService.uploadFile(fileObj,hash,root,parent,setProgress);

        let temp  = uploadData.doing.splice(i,1)
        // 防止显示错误
        temp[0].progress = 100;
        uploadData.done.push(temp[0]);
        i=0;
        saveData()
    }
}

export async function startUpload(){
    if(uploadData.isUpload){
        return false // 已经在上传的时候就不再继续
    }

    await uploader()

    uploadData.isUpload = false
}
export function delDone(index){
    uploadData.done.splice(index,1)
    saveData()
}

export function saveData(){
    localStorage.setItem(KEY, JSON.stringify(uploadData));
}

export function removeData(){
    localStorage.removeItem(KEY)
}



export default uploadData;