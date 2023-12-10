import loginData, {saveLoginData} from "@/common/loginData";
import { fileList } from"@/common/fileList"

// 用于Alist的登录适配方案

const successCode = 200; // 表示成功
const expiredCode = 401; // 表示登录状态过期

export default {
    judgeLoginCode(code){
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
        fileList.device = 1;
        fileList.writable = data.data.write;

        const content = data.data.content;

        if(content === null || content === undefined){
            fileList.file.length = 0;
            return;
        }

        fileList.file.length = content.length
        for (let i = 0; i < content.length; i++) {
            fileList.file[i] = {}
            fileList.file[i].name = content[i].name
            fileList.file[i].is_dir = content[i].is_dir
            fileList.file[i].selected = false
            fileList.file[i].modified = content[i].modified
            fileList.file[i].size = content[i].size

            // 存储其他平台特有信息
            fileList.file[i].other = {}
            fileList.file[i].other["thumb"] = content[i]["thumb"]
            fileList.file[i].other["type"] = content[i]["type"]
            fileList.file[i].other["sign"] = content[i]["sign"]
            fileList.file[i].other["created"] = content[i]["created"]
            fileList.file[i].other["hash_info"] = content[i]["hash_info"]
            fileList.file[i].other["hashinfo"] = content[i]["hashinfo"]

        }
    }

}