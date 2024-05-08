import device from "@/api/device";
import {getEnum} from "@/common/enums";
import {createTemplate} from "@/common/curd/kv/device";

let enumDevice = getEnum("enumDevice")


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
        typeValue:enumDevice,
        show: true,
        create: true,
        modify: true,
    },{
        title: "param",
        key: "param",
        type: "kv",
        require: "name",
        typeValue:createTemplate,
        show: false,
        create: true,
        modify: true,
    },{
        title: "strategy",
        key: "strategyId",
        type: "text",
        show: true,
        create: false,
        modify: false,
    },
]

// 表单对应的方法
let formFun = {
    get:device.query,
    create:device.create,
    update:device.update,
    delete:device.delete
}

export const deviceConfig = {
    model: formModel,
    fun: formFun
};