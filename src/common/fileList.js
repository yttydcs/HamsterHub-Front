import { reactive } from "vue";

/*  数据格式
*
*   device: 1, // 描述访问的是哪个后台，如hamster或者alist
*   writable:false,
*   path: [{label:"a",id:"0"}],
*   file: [{
*      name:"文件1",
*      url:"https://static.vecteezy.com/system/resources/previews/000/388/410/original/illustration-of-document-icon-vector.jpg",
*      is_dir:false,
*      selected: false,
*      modified: "",
*      size:0,
*      other:{}
*   }]
*
* */

export function getPathString(){
    let arr = fileList.path
    let res = "/"
    for (let i = 0; i < arr.length; i++) {
        res = res + arr[i].label+"/"
    }
    return res
}

export function getCurRoot(){
    return fileList.root
}

export function getCurPathNode(){
    if(fileList.path.length === 0){
        return {label:"root",id:"0"}
    }
    return fileList.path[fileList.path.length-1]
}

export function addPath(label,id){
    fileList.path.push({
        label:label,
        id:id
    })
}

export function popPath(){
    return fileList.path.pop()
}

export function popPathTo(postion){
    if(!(fileList.path.length > postion && postion>=0)){
        return {}
    }

    let res = fileList.path[postion]
    fileList.path.length = postion
    return res
}

export function isDir(index){
    let res = true
    // if(fileList.device)

    return res
}

export const fileList = reactive({
    device: 0, // 描述访问的是哪个后台，如hamster或者alist
    writable:false,
    root: "1",
    path: [],
    file: []
});