import { reactive } from "vue";

/*  数据格式
*
*   device: 1, // 描述访问的是哪个后台，如hamster或者alist
*   writable:false,
*   path: [],
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


export const fileList = reactive({
    device: 1, // 描述访问的是哪个后台，如hamster或者alist
    writable:false,
    root: "1",
    path: [],
    file: []
});