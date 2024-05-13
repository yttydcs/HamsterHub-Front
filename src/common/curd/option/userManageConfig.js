import userManage from "@/api/userManage";
import {getEnum} from "@/common/enums";

let enumUser = getEnum("enumUserType")

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
        title: "username",
        key: "username",
        type: "text",
        show: true,
        create: true,
        modify: true,
    },{
        title: "type",
        key: "type",
        type: "enum",
        typeValue:enumUser,
        show: true,
        create: true,
        modify: true,
    },{
        title: "phone",
        key: "phone",
        type: "text",
        show: true,
        create: true,
        modify: true,
    },{
        title: "email",
        key: "email",
        type: "text",
        show: true,
        create: true,
        modify: true,
    },
]

// 表单对应的方法
let formFun = {
    get:userManage.query,
    create:userManage.create,
    update:userManage.update,
    delete:userManage.delete
}

export const userManageConfig = {
    model: formModel,
    fun: formFun
};