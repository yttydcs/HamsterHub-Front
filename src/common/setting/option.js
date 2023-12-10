import { reactive } from "vue";

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
                title: "个人选项",
                description: "asd",
                key: "settingKey",
                valueType: "boolean",
                value: "",
            },{
                type: "item",
                title: "个人选项2",
                description: "asd",
                key: "settingKey",
                valueType: "input",
                value: "",
            },{
                type: "item",
                title: "个人选项3",
                description: "asd",
                key: "settingKey",
                valueType: "curd",
                value: "",
            },
        ]
    },
    {
        type: "group",
        title : "个人设置",
        description: "",
        list:[
            {
                type: "item",
                title: "个人选项",
                description: "asd",
                key: "settingKey",
                valueType: "boolean",
                value: "",
            },{
                type: "item",
                title: "个人选项2",
                description: "asd",
                key: "settingKey",
                valueType: "input",
                value: "",
            },{
                type: "item",
                title: "个人选项3",
                description: "asd",
                key: "settingKey",
                valueType: "curd",
                value: "",
            },
        ]
    },
]);