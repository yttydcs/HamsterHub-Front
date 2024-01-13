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

export const fileContextMenuOption = reactive([
    {
        label: "打开",
        key: "open",
        show:false,
        condition:1
    },{
        label: "删除",
        key: "delete",
        show:false,
        condition:1
    },{
        label: "下载",
        key: "download",
        show:false,
        condition:1
    },{
        label: "分享",
        key: "share",
        show:false,
        condition:1
    },{
        label: "复制链接",
        key: "copyAddress",
        show:false,
        condition:1
    },{
        key: 'divider1',
        type: 'divider',
        show:false,
        condition:1
    },{
        label: "复制",
        key: "copy",
        show:false,
        condition:1
    },{
        label: "移动",
        key: "move",
        show:false,
        condition:1
    },{
        key: 'divider2',
        type: 'divider',
        show:false,
        condition:1
    },{
        label: "新建文件夹",
        key: "newDir",
        show:false,
        condition:0
    },{
        label: "属性",
        key: "detail",
        show:false,
        condition:1
    },

]);