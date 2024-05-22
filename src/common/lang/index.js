import {reactive, ref} from "vue";
import en from "./other/en"
import zh from "./other/zh"
// 语言选项

const langSet = [zh,en];

export const langSelectOption = [
    { label: "中文", value: 0 },
    { label: "English", value: 1 },
]

export const curLangIndex = ref(0)

function loadData(){
    let res = JSON.parse(JSON.stringify(langSet[0]))

    const language = localStorage.getItem('language');

    if(language && language!==language[0].name){
        for(let i=0;i<langSet.length;i++){
            if(langSet[i].name === language){
                res.name = langSet[i].name
                copyObj(res.lang,langSet[i].lang)
                curLangIndex.value = i
                break;
            }
        }
    }

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

    curLangIndex.value = index;
    curLang.name = langSet[index].name
    copyObj(curLang.lang,langSet[index].lang)

    // 持久化
    localStorage.setItem('language',langSet[index].name);

    return true
}

export default curLang;