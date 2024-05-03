
// 中文
import registerRules from "@/common/rules/register";

const zhLangData = {
    name:"zh",
    lang:{
        searchBoxPlaceholder : "搜索",
        plsInput:"请输入",
        settingBtn:"设置",
        validateError:"输入数据存在异常",
        processing:"正在处理请稍后",
        leftMenu:{
            file :"文件",
            share :"分享",
            task :"任务",
            upload: "文件上传",
            download: "离线下载",
        },
        curd:{
            addTitle:"新增",
            changeTitle:"修改",
            addBtn:"新增",
            changeBtn:"修改",
            removeBtn:"删除",
            refreshBtn:"刷新",
            submitBtn:"提交",
            cancelBtn:"取消",
        },
        user:{
            login:"登陆",
            register:"注册",
            username:"用户名",
            password:"密码",
            againPassword:"重复密码",
            saveSession:"保留登陆状态",
            address:"手机号",
            sendCodeBtn:"发送",
            code:"验证码"
        },
        loginRules:{
            name:"请输入用户名",
            pwd:"请输入密码",
        },
        registerRules:{
            name:"请输入用户名",
            pwd:"请输入密码",
            checkPwd:"请再次输入密码",
            checkPwdNotSame:"密码不一致",
            address:"请输入手机号",
            addressNotPhone:"请输入正确的手机号",
            code:"请输入验证码",
            cooldown:"处于冷却时间",
        },
        userSetting:{
            title:"用户设置",
            avatarTitle:"头像",
            avatarDes:"点击即可重新上传头像",
            pwdTitle:"密码",
            pwdDes:"定时修改密码保证以密码安全",
            pwdBtn:"修改",
            logout:"退出登陆"
        },
        changePwdBox:{
            title:"修改密码",
            oldPwd:"旧密码",
            newPwd:"新密码",
            submit:"提交"
        },
        localSetting:{
            title:"本地设置",
            darkMode:{
                title:"黑暗模式",
                description:"黑黑黑",
            },
        },
        storeSetting:{
            title:"存储设置",
            device:{
                title:"设备",
                description:"进入存储设备管理界面",
            },
            strategy:{
                title:"策略",
                description:"进入存储策略管理界面",
            },
        },
        explorerMenu:{
            open:"打开",
            delete:"删除",
            download:"下载",
            share:"分享",
            rename:"重命名",
            copyAddress:"复制链接",
            copy:"复制",
            move:"移动",
            newDir:"新建文件夹",
        },
        explorerDetail:{
            name:"名称",
            size:"尺寸",
            type:"类型",
            version:"版本",
            created:"创建日期",
            modified:"修改日期",
            downloadBtn:"下载"
        },
        taskUpload:{
            title:"文件上传",
            doing:"执行",
            done:"结束",
        },
        taskDownload:{
            title:"离线下载",
            doing:"执行",
            done:"结束",
        },
        confirmBtn:{
            ok:"确定",
            cancel:"取消"
        },
        form: {
            name: "名称",
            shareCode: "提取码",
            expiry: "过期时间"
        },
        userManageSetting: {
            title: "用户管理",
            canRegister: {
                title: "允许注册",
                description: "启用之后则允许注册新用户",
            }
        },
    }
}


export default zhLangData;