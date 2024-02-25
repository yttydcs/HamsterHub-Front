import loginData, {saveLoginData} from "@/common/loginData";
import { fileList } from"@/common/fileList"

// 用于hamster的登录适配方案

const successCode = 0; // 表示成功
// const expiredCode = 401; // 表示登录状态过期

export default {
    judgeLoginCode(code){
        return code === successCode;
    },
    setLoginDate(name,res){
        loginData.loginKey.loginKeyValue  = res.data.token;
        loginData.loginKey.loginType = "token";
        loginData.user.name = name;
        loginData.loginState = true;
        loginData.user.id = res.data.id;
        loginData.user.avatarSrc = process.env["VUE_APP_URL"]+ "api/queryAvatar?accountId="+loginData.user.id;

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
        fileList.history = {};
        fileList.file.length = 0;
        let pos = -1;
        for (let i = 0; i < content.length; i++) {
            let historyKey =content[i].parentId + content[i].name
            let p;
            if(historyKey in fileList.history){
                fileList.history[historyKey].id.push(content[i]["id"])
                if(fileList.history[historyKey].version>content[i]["version"]){
                    continue
                }else{
                    fileList.history[historyKey].version = content[i]["version"];
                    p = fileList.history[historyKey].pos;
                }
            }else{
                pos++;
                p = pos;
                fileList.history[historyKey] = {
                    id:[content[i]["id"]],
                    version:content[i]["version"],
                    pos:pos
                };
            }

            fileList.file[p] = {}
            fileList.file[p].name = content[i].name
            fileList.file[p].is_dir = (content[i]["type"]===0)
            fileList.file[p].selected = false
            fileList.file[p].modified = content[i].modified
            fileList.file[p].size = content[i].size

            // 存储其他平台特有信息
            fileList.file[p].other = {}
            fileList.file[p].other["id"] = content[i]["id"]
            fileList.file[p].other["type"] = content[i]["type"]
            fileList.file[p].other["created"] = content[i]["created"]
            fileList.file[p].other["accountID"] = content[i]["accountID"]
            fileList.file[p].other["strategyId"] = content[i]["strategyId"]
            fileList.file[p].other["rfileId"] = content[i]["rfileId"]
            fileList.file[p].other["version"] = content[i]["version"]

        }

    }

}