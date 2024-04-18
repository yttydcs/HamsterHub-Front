import { reactive } from "vue";
import en from "./other/en"
import zh from "./other/zh"
// 语言选项

const langSet = [zh,en];

function loadData(){
    let res = JSON.parse(JSON.stringify(langSet[0]))
    return reactive(
        res
    )
}

const curLang = loadData()

function copyObj(target,origin){
    for (let key in origin) {
        if(typeof origin[key] ==="object"){
            copyObj(target[key],origin[key]);
        }else{
            target[key]=origin[key];
        }

    }
}

export function switchLang(index){

    if(index > langSet.length){
        return false;
    }
    curLang.name = langSet[index].name
    copyObj(curLang.lang,langSet[index].lang)
    return true
}

export default curLang;