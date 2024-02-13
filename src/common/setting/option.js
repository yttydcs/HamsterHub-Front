import { reactive } from "vue";
import {deviceConfig} from "@/common/curd/deviceConfig";
import {strategyConfig} from "@/common/curd/strategyConfig";
import {setDark} from "@/common/theme";

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
        title : "个人设置",
        description: "",
        list:[
            {
                type: "item",
                title: "黑暗模式",
                description: "黑黑黑",
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
        title : "存储",
        description: "",
        list:[
            {
                type: "item",
                title: "设备",
                description: "进入存储设备管理界面",
                key: "settingKey",
                valueType: "curd",
                value: deviceConfig,
            },{
                type: "item",
                title: "策略",
                description: "进入存储策略管理界面",
                key: "settingKey",
                valueType: "curd",
                value: strategyConfig,
            },
        ]
    },
]);