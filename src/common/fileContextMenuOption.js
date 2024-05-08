import {reactive} from "vue";

export function openMenuByCondition(condition,data=""){
    for (let i = 0; i < fileContextMenuOption.length; i++) {
        if(fileContextMenuOption[i].condition === condition){
            fileContextMenuOption[i].show = true;
            fileContextMenuOption[i].data = data;
        }
    }
}
export function closeAllMenu(){
    for (let i = 0; i < fileContextMenuOption.length; i++) {
        fileContextMenuOption[i].show = false
    }
}

export function findByKey(key){
    let res = -1

    for (let i = 0; i < fileContextMenuOption.length; i++) {
        if(key === fileContextMenuOption[i].key){
            res = i;
            break
        }
    }

    return res;
}

export const fileContextMenuOption = reactive([]);