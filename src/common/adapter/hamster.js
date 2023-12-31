import loginData, {saveLoginData} from "@/common/loginData";
import { fileList } from"@/common/fileList"

// 用于hamster的登录适配方案

const successCode = 0; // 表示成功
// const expiredCode = 401; // 表示登录状态过期

export default {
    judgeLoginCode(code){
        console.log(code === successCode)

        return code === successCode;
    },
    setLoginDate(name,res){
        loginData.loginKey.loginKeyValue  = res.data.token;
        loginData.loginKey.loginType = "token";
        loginData.user.name = name;
        loginData.loginState = true;

        // 持久化
        saveLoginData()
    },
    setFileData(data){

        fileList.device = 0;
        // fileList.writable = data.data.write;

        const content = data.data;

        if(content === null || content === undefined){
            fileList.file.length = 0;
            return;
        }

        fileList.file.length = content.length
        for (let i = 0; i < content.length; i++) {
            fileList.file[i] = {}
            fileList.file[i].name = content[i].name
            fileList.file[i].is_dir = (content[i].is_dir===1)
            fileList.file[i].selected = false
            fileList.file[i].modified = content[i].modified
            fileList.file[i].size = content[i].size

            // 存储其他平台特有信息
            fileList.file[i].other = {}
            fileList.file[i].other["id"] = content[i]["id"]
            fileList.file[i].other["type"] = content[i]["type"]
            fileList.file[i].other["created"] = content[i]["created"]
            fileList.file[i].other["accountID"] = content[i]["accountID"]
            fileList.file[i].other["strategyId"] = content[i]["strategyId"]
            fileList.file[i].other["rfileId"] = content[i]["rfileId"]

        }
        console.log("h")
        console.log(fileList)
    }

}