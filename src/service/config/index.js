import config from "@/api/config";
import { reactive } from "vue";

const localSaveKey = "config";
let hash = "1"

async function set(key,value){
    await config.set(key,value);
}

async function get(key,value){
    return (await config.getValue(key,value)).data;
}

async function query(){
    let res = {}

    try {
        res = await config.query(hash);
    }catch (e) {
        return {}
    }


    try{
        if(res.data.hash.value){
            this.hash = res.data.hash.value;
        }

    }catch (e) {
    }

    // 缓存数据
    if(res.data!==null){
        _saveData(res.data)
    }

    return res
}


// 读取本地数据，与默认值合并，返回vue3响应式数据
async function loadData(){
    let localDate = null;
    try {
        let temp = JSON.parse(localStorage.getItem(localSaveKey));

        if(temp){
            localDate = temp;
        }else{
            localDate = {}
        }
    }catch (e) {
        localDate = {}
    }

    try{
        if(localDate.hash.value){
            hash = localDate.hash.value
        }

    }catch (e) {

    }

    // 获取数据
    let res = (await query()).data;

    //合并
    if(res){
        localDate = Object.assign(localDate,res);
    }

    return reactive(
        localDate
    )

}

const data =await loadData()

function _saveData(value){
    localStorage.setItem(localSaveKey, JSON.stringify(value));
}

export function saveData(){
    localStorage.setItem(localSaveKey, JSON.stringify(data));
}

async function getObj(){
    return data;
}


export default {
    set,
    get,
    query,
    getObj
}