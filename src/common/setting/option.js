import {reactive, toRefs} from "vue";
import {deviceConfig} from "@/common/curd/deviceConfig";
import {strategyConfig} from "@/common/curd/strategyConfig";
import {setDark} from "@/common/theme";
import curLang from "@/common/lang";

/*  用于自动生成setting界面
*
*       {
*           type: "group",
*           title : "个人设置",
*           description: "",
*           list:[
*               {
*                   type: "item",
*                   title: "个人选项",
*                   key: "settingKey",
*                   valueType: "Boolean",
*                   value: "",
*               }
*           ]
*       }
*
* */


/**
 * valueType 备选
 * boolean 界面显示switch
 * input 界面显示文本输入按钮
 * curd 界面展示一个标准增删改查界面
 */


export const optionList = reactive([
    {
        type: "group",
        text: curLang.lang.localSetting,
        title : "curLang.lang.localSetting" ,
        description: "",
        list:[
            {
                type: "item",
                text:curLang.lang.localSetting.darkMode,
                key: "settingKey",
                valueType: "boolean",
                value: "",
                data: false,
                handle:setDark,
            },
            // ,{
            //     type: "item",
            //     title: "个人选项2",
            //     description: "asd",
            //     key: "settingKey",
            //     valueType: "input",
            //     value: "",
            // },{
            //     type: "item",
            //     title: "个人选项3",
            //     description: "asd",
            //     key: "settingKey",
            //     valueType: "curd",
            //     value: "",
            // },
        ]
    },
    {
        type: "group",
        text: curLang.lang.storeSetting,
        title : "存储",
        description: "",
        list:[
            {
                type: "item",
                text:curLang.lang.storeSetting.device,
                key: "settingKey",
                valueType: "curd",
                value: deviceConfig,
            },{
                type: "item",
                text:curLang.lang.storeSetting.strategy,
                key: "settingKey",
                valueType: "curd",
                value: strategyConfig,
            },
        ]
    },
]);