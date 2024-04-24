import { reactive } from "vue";
import {darkTheme} from "naive-ui";
import {optionList} from "@/common/setting/option";

export function switchTheme() {
    if (theme.data !== null) {
        theme.data = null;
        optionList[0].list[0].data = false
        theme.mdTheme = "github"
    } else {

        theme.data = darkTheme;
        optionList[0].list[0].data = true
        theme.mdTheme = "dark"
    }
}

export function setDark(isDark) {
    if (isDark) {
        theme.data = darkTheme;
        theme.mdTheme = "dark"
    } else {
        theme.data = null;
        theme.mdTheme = "light"
    }
}


export const theme = reactive({ data:null,mdTheme:"github" });