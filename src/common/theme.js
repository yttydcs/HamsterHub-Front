import { reactive } from "vue";
import {darkTheme} from "naive-ui";
import {optionList} from "@/common/setting/option";

export function switchTheme() {
    if (theme.data !== null) {
        theme.data = null;
        theme.settingData = false
        theme.mdTheme = "light"
    } else {
        theme.data = darkTheme;
        theme.settingData = true
        theme.mdTheme = "dark"
    }
}

export function setDark(isDark) {
    if (isDark) {
        theme.data = darkTheme;
        theme.mdTheme = "dark"
        theme.settingData = true
    } else {
        theme.data = null;
        theme.mdTheme = "light"
        theme.settingData = false
    }
}


export const theme = reactive({ data:null, mdTheme:"light", settingData:true });