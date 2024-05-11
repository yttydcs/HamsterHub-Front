

function registerEnums(name,value){
    enums[name] = value;
}

function load(){
    registerEnums("enumDevice",["本地","阿里云盘","OneDrive"]);
    registerEnums("enumStrategyMode",["优先存储较大剩余容量设备", "优先存储较小剩余容量设备"]);
    registerEnums("enumStrategyType",["聚合", "备份"]);
    registerEnums("danmakuType",["BiliBili By Url", "DanDan By Url"]);
}

export function getEnum(name){
    return enums[name]
}

const enums = {};
load();
export default enums;