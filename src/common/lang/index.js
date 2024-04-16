import { reactive } from "vue";
import en from "./other/en"
import zh from "./other/zh"
import Vue from "vue"; // 导入 Vue 模块
// 语言选项

const langSet = [zh,en];

function loadData(){

    let res = Object.assign({},langSet[0])

    return reactive(
        res
    )

}

const curLang = loadData()

export function switchLang(index){

    if(index > langSet.length){
        return false;
    }

    const newLang = langSet[index];
    Object.assign(curLang, newLang);
    return true
}

export default curLang;