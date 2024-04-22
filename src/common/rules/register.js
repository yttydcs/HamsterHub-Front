import curLang from "@/common/lang";

let registerRules={
    name: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.registerRules.name
            }
        }
    ],
    pwd: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.registerRules.pwd
            }
        }
    ],
    checkPwd: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.registerRules.checkPwd
            }
        },{
                validator:null, // 由使用者传入
                trigger: 'blur',
                renderMessage: () => {
                return curLang.lang.registerRules.checkPwdNotSame
            }
        },
    ],
    address: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.registerRules.address
            }
        },{
            validator:(rule,value) => { // 验证手机号
                if(!value){
                    return true;
                }
                const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                return phoneRegex.test(value);
            },
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.registerRules.addressNotPhone
            }
        },
    ],
    code: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.registerRules.code
            }
        }
    ],

};
export default registerRules;