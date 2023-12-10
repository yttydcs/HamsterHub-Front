import { reactive } from "vue";
import en from "./other/en"
import zh from "./other/zh"
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

    curLang.name = langSet[index].name
    curLang.lang = langSet[index].lang

    return true
}

export default curLang;