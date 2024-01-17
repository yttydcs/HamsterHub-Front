import { reactive } from "vue";
import {darkTheme} from "naive-ui";
import {optionList} from "@/common/setting/option";

export function switchTheme() {
    if (theme.data !== null) {
        theme.data = null;
        optionList[0].list[0].data = false
    } else {
        theme.data = darkTheme;
        optionList[0].list[0].data = true
    }
}

export function setDark(isDark) {
    if (isDark) {
        theme.data = darkTheme;
    } else {
        theme.data = null;
    }
}


export const theme = reactive({ data:null });