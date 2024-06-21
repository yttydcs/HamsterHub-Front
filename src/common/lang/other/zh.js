
// 中文
import registerRules from "@/common/rules/register";

const zhLangData = {
    name:"zh",
    lang:{
        searchBoxPlaceholder : "搜索",
        plsInput:"请输入",
        settingBtn:"设置",
        validateError:"输入数据存在异常",
        validateMissing:"缺少必要数据",
        processing:"正在处理请稍后",
        submitBtn: "提交",
        shareList:{
            code:"密码",
            expired:"过期时间"
        },
        danmakuSetting: {
            title: "弹幕设置",
            type:"类型",
            url:"参数"
        },
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
            darkMode: {
                title:"黑暗模式",
                description:"黑黑黑",
            },
            languageSwitch: {
                title:"语言",
                description:"部分内容需要刷新才能生效",
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
            addTask:"添加任务",
            select:"选择",
            selectBox:"选择下载目录",
            downloadPosition:"存放位置",
            placeholder:"点击选择下载位置",
            downloadUrl:"下载地址"
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
            },
            curdUser: {
                title: "修改用户数据",
                description: "希望用不上，这对使用者很不友好",
            }
        },
        video: {
            autoGo:"自动跳转至上次观看位置",
            restart: '重新播放',
            rewind: '后退 {seektime}s',
            play: '播放',
            pause: '暂停',
            fastForward: '快进 {seektime}s',
            seek: '移动',
            seekLabel: '{currentTime} / {duration}',
            played: '播放中',
            buffered: '缓存中',
            currentTime: '当前',
            duration: 'Duration',
            volume: '音量',
            mute: '静音',
            unmute: '取消静音',
            enableCaptions: '启用字幕',
            disableCaptions: '禁用字幕',
            download: '下载',
            enterFullscreen: '全屏',
            exitFullscreen: '推出全屏',
            frameTitle: '正在播放 {title}',
            captions: '字幕',
            settings: '设置',
            pip: '小窗口',
            menuBack: '返回',
            speed: '速度',
            normal: '正常',
            quality: '画质',
            loop: '循环',
            start: '开始',
            end: '结束',
            all: 'All',
            reset: '重置',
            disabled: '禁用',
            enabled: '启用',
            advertisement: '广告',
            qualityBadge: {
                2160: '4K',
                1440: 'HD',
                1080: 'HD',
                720: 'HD',
                576: 'SD',
                480: 'SD',
            },
        },
    }
}


export default zhLangData;