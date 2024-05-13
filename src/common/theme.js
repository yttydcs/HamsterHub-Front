import { reactive } from "vue";
import {darkTheme} from "naive-ui";
import {optionList} from "@/common/setting/option";

export function switchTheme() {
    if (theme.data !== null) {
        theme.data = null;
        theme.data = false
        theme.mdTheme = "light"
    } else {

        theme.data = darkTheme;
        theme.data = true
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


export const theme = reactive({ data:null, mdTheme:"light", settingData:true });