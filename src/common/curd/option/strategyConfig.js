import device from "@/api/device";
import strategy from "@/api/strategy";
import {getEnum} from "@/common/enums";

let enumStrategyMode = getEnum("enumStrategyMode")
let enumStrategyType = getEnum("enumStrategyType")
// let enumPermissionType = []
// 实时获取选项的方法
async function deviceIdsFetch(selected=[]){
    let items = (await device.query()).data
    let res = []
    for (let i = 0; i < items.length; i++) {
        if(!items[i].configured || selected.indexOf(items[i].id)>=0){
            res.push({
                label: items[i].id,
                value: items[i].id,
            })
        }
    }
    return res
}






async function permissionFetch(selected=[]){

    let res = [
        {
            label: "普通用户",
            value: "0",
        },{
            label: "管理员",
            value: "1",
        },

    ]

    return res
}


// device curd config


// 用于动态生成表单， 第一个对象表示索引,删除时传递该值
const formModel = [
    {
        title: "id", // 显示在表头上的名字
        key: "id",
        type: "text", // 决定了显示方式和修改方式
        show: true, // 是否在列表中显示
        create: false, // 是否在新建表单中提交
        modify: true, //是否在修改表单中提交
        modifyHide: true //是否在修改表单中隐藏，多用于主键一类的不可修改但要提交的情况
    },{
        title: "name",
        key: "name",
        type: "text",
        show: true,
        create: true,
        modify: true,
    },{
        title: "type",
        key: "type",
        type: "enum",
        typeValue: enumStrategyType,
        show: true,
        create: true,
        modify: true,
    },{
        title: "mode",
        key: "mode",
        type: "enum",
        typeValue: enumStrategyMode,
        show: true,
        create: true,
        modify: true,
    },{
        title: "permissions",
        key: "permissions",
        type: "array",
        typeValue:permissionFetch,
        show: true,
        create: true,
        modify: true,
    },{
        title: "root",
        key: "root",
        type: "text",
        show: true,
        create: true,
        modify: true,
    },{
        title: "fileSystem",
        key: "fileSystem",
        type: "text",
        show: true,
        create: true,
        modify: true,
    },{
        title: "param",
        key: "param",
        type: "text",
        typeValue: deviceIdsFetch,
        show: true,
        create: true,
        modify: true,
    },
]

// 表单对应的方法
let formFun = {
    get:strategy.query,
    create:strategy.create,
    update:strategy.update,
    delete:strategy.delete
}

export const strategyConfig = {
    model: formModel,
    fun: formFun
};