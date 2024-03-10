import { reactive } from "vue";

const KEY = "upload";


// 读取本地数据，与默认值合并，返回vue3响应式数据
function loadUploadData(){
    const localDate = JSON.parse(localStorage.getItem(KEY));

    // 构建默认值
    let res = [];

    //赋值，防止undefined
    if(localDate !== undefined){
        res = Object.assign(res,localDate);
    }

    return reactive(
        res
    );

}



const uploadData = loadUploadData();

export function saveData(){
    localStorage.setItem(KEY, JSON.stringify(uploadData));
}

export function removeData(){
    localStorage.removeItem(KEY)
}

export default uploadData;