import curLang from "@/common/lang";

let loginRules={
    name: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.loginRules.name
            }
        }
    ],
    pwd: [
        {
            required: true,
            trigger: 'blur',
            renderMessage: () => {
                return curLang.lang.loginRules.pwd
            }
        }
    ],
};
export default loginRules;