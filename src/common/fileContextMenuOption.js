import {reactive} from "vue";
import { h } from "vue";
import { NIcon } from "naive-ui";
import {OpenFolder24Filled,
    Delete24Filled,
    ArrowDownload24Filled,
    ShareAndroid24Filled,
    Copy24Filled,
    SendCopy24Filled,
    ArrowMove24Regular,
    FolderAdd24Filled,
    AppsListDetail24Filled,

} from "@vicons/fluent";
// import {Open24Filled} from "@vicons/";

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

const renderIcon = (icon) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        });
    };
};
Delete24Filled

export const fileContextMenuOption = reactive([
    {
        label: "打开",
        key: "open",
        show:false,
        icon: renderIcon(OpenFolder24Filled),
        condition:1
    },{
        label: "删除",
        key: "delete",
        show:false,
        icon: renderIcon(Delete24Filled),
        condition:1
    },{
        label: "下载",
        key: "download",
        show:false,
        icon: renderIcon(ArrowDownload24Filled),
        condition:1
    },{
        label: "分享",
        key: "share",
        show:false,
        icon: renderIcon(ShareAndroid24Filled),
        condition:1
    },{
        label: "复制链接",
        key: "copyAddress",
        show:false,
        icon: renderIcon(Copy24Filled),
        condition:1
    },{
        key: 'divider1',
        type: 'divider',
        show:false,
        icon: renderIcon(OpenFolder24Filled),
        condition:1
    },{
        label: "复制",
        key: "copy",
        show:false,
        icon: renderIcon(SendCopy24Filled),
        condition:1
    },{
        label: "移动",
        key: "move",
        show:false,
        icon: renderIcon(ArrowMove24Regular),
        condition:1
    },{
        key: 'divider2',
        type: 'divider',
        show:false,
        icon: renderIcon(OpenFolder24Filled),
        condition:1
    },{
        label: "新建文件夹",
        key: "newDir",
        show:false,
        icon: renderIcon(FolderAdd24Filled),
        condition:0
    },{
        label: "属性",
        key: "detail",
        show:false,
        icon: renderIcon(AppsListDetail24Filled),
        condition:1
    },

]);