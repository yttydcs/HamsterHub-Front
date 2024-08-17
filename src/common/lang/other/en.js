
// 英文
const enLangData = {
    name:"en",
    lang:{
        searchBoxPlaceholder : "Search",
        plsInput:"Please input",
        settingBtn:"Setting",
        editBox:"Edit",
        validateError: "Input data contains errors",
        validateMissing: "Missing required data",
        processing:"Processing, please wait",
        submitBtn: "Submit",
        rssTask:{
            pubDate: "Publication Date",
            size: "Size",
            filter: "Filter",
            rssListId: "Subscription ID:"
        },
        rssList:{
            root: "Binding Strategy",
            parent: "Storage Location",
            addRSS: "Add Subscription",
            editRSS: "Edit Subscription",
            selectBox: "Select Storage Location",
            rssName: "Subscription Name",
            downloadPosition: "Storage Location",
            downloadUrl: "Subscription URL",
            replaceHost: "Replace Domain",
            mirrorHost: "Mirror Proxy",
            filter: "Filter"
        },
        shareList:{
            code:"Code",
            expired:"Expired"
        },
        danmakuSetting: {
            title: "Danmaku Setting",
            type:"Type",
            url:"Url",
            proxy: "Use Backend Proxy"
        },
        leftMenu:{
            file: "File",
            share: "Share",
            task: "Task",
            upload: "Upload",
            download: "Download",
            rssTask: "Fetch Records",
            rssMenu: "RSS",
            rss: "My Subscriptions"
        },
        curd:{
            addTitle:"Add Item",
            changeTitle:"Change Item",
            addBtn: "Add",
            changeBtn: "Change",
            removeBtn: "Remove",
            refreshBtn: "Refresh",
            submitBtn: "Submit",
            cancelBtn: "Cancel"
        },
        user:{
            login: "Login",
            register: "Register",
            username: "Username",
            password: "Password",
            againPassword: "Confirm Password",
            saveSession: "Remember Me",
            address: "Phone Number",
            sendCodeBtn: "Send",
            code: "Verification Code"
        },
        loginRules:{
            name: "Please enter username",
            pwd: "Please enter password"
        },
        registerRules:{
            name: "Please enter username",
            pwd: "Please enter password",
            checkPwd: "Please enter password again",
            checkPwdNotSame: "Passwords do not match",
            address: "Please enter phone number",
            addressNotPhone: "Please enter a valid phone number",
            code: "Please enter verification code",
            cooldown:"Cooldown period in progress.",
        },
        userSetting:{
            title:"User Settings",
            avatarTitle:"Avatar",
            avatarDes:"Click to re-upload avatar",
            pwdTitle:"Password",
            pwdDes:"Regularly change password to ensure security",
            pwdBtn:"Change",
            logout:"Logout"
        },
        changePwdBox:{
            title: "Change Password",
            oldPwd: "Old Password",
            newPwd: "New Password",
            submit: "Submit"
        },
        localSetting:{
            title:"Local Settings",
            darkMode:{
                title:"Dark Mode",
                description:"Go dark.",
            },
            languageSwitch: {
                title: "Language",
                description: "Some content may require refreshing to take effect"
            },
        },
        storeSetting:{
            title: "Storage Settings",
            device:{
                title: "Devices",
                description: "Go to storage device management"
            },
            strategy:{
                title: "Strategies",
                description: "Go to storage strategy management"
            }
        },
        explorerMenu:{
            open: "Open",
            delete: "Delete",
            download: "Download",
            share: "Share",
            rename: "Rename",
            copyAddress: "Copy Link",
            copy: "Copy",
            move: "Move",
            newDir: "New Folder"
        },
        explorerSort:{
            asc: "Ascending",
            desc: "Descending",
            sortBySize: "Sort by Size",
            sortByName: "Sort by Name",
            sortByTime: "Sort by Time"
        },
        explorerDetail:{
            name:"Name",
            size:"Size",
            type:"Type",
            version:"Version",
            created:"Created",
            modified:"Modified",
            downloadBtn:"Download"
        },
        taskUpload:{
            title: "File Upload",
            doing: "In Progress",
            done: "Done",
        },
        taskDownload:{
            title: "Offline Download",
            doing: "In Progress",
            done: "Done",
            addTask: "Add Task",
            select: "Select",
            selectBox: "Select Download Directory",
            downloadPosition: "Storage Location",
            placeholder: "Click to choose download location",
            downloadUrl: "Download URL",
            taskName: "Task Name",
            selectDownloader: "Select Downloader",
            state:{
                "0": "Waiting",
                "1": "Downloading",
                "2": "Error",
                "3": "Completed",
            },
        },
        confirmBtn:{
            ok: "OK",
            cancel: "Cancel"
        },
        form:{
            name: "Name",
            shareCode: "Access Code",
            expiry: "Expiration Time"
        },
        userManageSetting: {
            title: "User Management",
            canRegister: {
                title: "Allow Registration",
                description: "Enabling this allows registration of new users"
            },
            curdUser: {
                title: "Modify User Data",
                description: "Hopefully unnecessary; not user-friendly"
            }
        },
        systemFunctionSetting: {
            title: "System Functions",
            proxyBilibiliDanma: {
                title: "Bilibili Danmaku Proxy",
                description: "When enabled, backend will allow Bilibili danmaku requests to be sent from the backend"
            }
        },
        notifySetting: {
            title:"Notify",
            gocqUrl: {
                title: "GoCq URL",
                description: "GoCq notification URL"
            }
        },
        video: {
            autoGo:"Automatically jump to the last viewed position",
            restart: 'Restart',
            rewind: 'Rewind {seektime}s',
            play: 'Play',
            pause: 'Pause',
            fastForward: 'Forward {seektime}s',
            seek: 'Seek',
            seekLabel: '{currentTime} of {duration}',
            played: 'Played',
            buffered: 'Buffered',
            currentTime: 'Current time',
            duration: 'Duration',
            volume: 'Volume',
            mute: 'Mute',
            unmute: 'Unmute',
            enableCaptions: 'Enable captions',
            disableCaptions: 'Disable captions',
            download: 'Download',
            enterFullscreen: 'Enter fullscreen',
            exitFullscreen: 'Exit fullscreen',
            frameTitle: 'Player for {title}',
            captions: 'Captions',
            settings: 'Settings',
            pip: 'PIP',
            menuBack: 'Go back to previous menu',
            speed: 'Speed',
            normal: 'Normal',
            quality: 'Quality',
            loop: 'Loop',
            start: 'Start',
            end: 'End',
            all: 'All',
            reset: 'Reset',
            disabled: 'Disabled',
            enabled: 'Enabled',
            advertisement: 'Ad',
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


export default enLangData;