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
    // curLang.lang = JSON.parse(JSON.stringify(langSet[index].lang));
    // curLang.lang = Object.assign({}, langSet[index].lang);
    // curLang.lang.user.register = "aaaaa"
    // curLang = Object.assign({}, curLang);
    // curLang.lang = langSet[index].lang
    console.log(curLang.lang)
    return true
}

export default curLang;