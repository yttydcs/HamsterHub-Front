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
        label: curLang.lang.explorerMenu.download,
        key: "download",
        show:false,
        icon: renderIcon(ArrowDownload24Filled),
        condition:1
    },{
        label: curLang.lang.explorerMenu.copyAddress,
        key: "copyAddress",
        show:false,
        icon: renderIcon(Copy24Filled),
        condition:1
    }
]);

export default fileContextMenuOption;