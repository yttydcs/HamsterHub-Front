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
        label: "打开",
        key: "open",
        show:false,
        icon: renderIcon(OpenFolder24Filled),
        condition:1
    },{
        label: "下载",
        key: "download",
        show:false,
        icon: renderIcon(ArrowDownload24Filled),
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
        label: "属性",
        key: "detail",
        show:false,
        icon: renderIcon(AppsListDetail24Filled),
        condition:1
    },

]);

export default fileContextMenuOption;