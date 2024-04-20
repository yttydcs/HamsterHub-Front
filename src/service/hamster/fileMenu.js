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
    Rename24Filled
} from "@vicons/fluent";
import curLang from "@/common/lang";

const renderIcon = (icon) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        });
    };
};
// Delete24Filled

const fileContextMenuOption = reactive([
    {
        label: curLang.lang.explorerMenu.open,
        key: "open",
        show:false,
        icon: renderIcon(OpenFolder24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.delete,
        key: "delete",
        show:false,
        icon: renderIcon(Delete24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.download,
        key: "download",
        show:false,
        icon: renderIcon(ArrowDownload24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.share,
        key: "share",
        show:false,
        icon: renderIcon(ShareAndroid24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.rename,
        key: "rename",
        show:false,
        icon: renderIcon(Rename24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.copyAddress,
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
        label: curLang.lang.explorerMenu.copy,
        key: "copy",
        show:false,
        icon: renderIcon(SendCopy24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.move,
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
        label: curLang.lang.explorerMenu.newDir,
        key: "newDir",
        show:false,
        icon: renderIcon(FolderAdd24Filled),
        condition:0
    },
    // {
    //     label: "属性",
    //     key: "detail",
    //     show:false,
    //     icon: renderIcon(AppsListDetail24Filled),
    //     condition:1
    // },

]);

export default fileContextMenuOption;