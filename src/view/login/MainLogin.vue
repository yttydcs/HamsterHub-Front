<template>
  <div class="mainLogin">
    <div class="loginPanel">
      <n-card>
        <n-tabs
            class="card-tabs"
            default-value="signIn"
            size="large"
            animated
            justify-content="space-evenly"
            pane-wrapper-style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        >
          <n-tab-pane name="signIn" :tab="curLang.lang.user.login">
            <n-form :model="formData">
              <n-form-item-row :label="curLang.lang.user.username">
                <n-input v-model:value="formData.name" :placeholder="curLang.lang.plsInput"/>
              </n-form-item-row>
              <n-form-item-row :label="curLang.lang.user.password">
                <n-input
                    show-password-on="click"
                    v-model:value="formData.pwd"
                    type="password"
                    :placeholder="curLang.lang.plsInput"
                />
              </n-form-item-row>
              <n-checkbox v-model:checked="formData.lasting" style="margin-bottom: 10px">
                {{ curLang.lang.user.saveSession }}
              </n-checkbox>
              <br>
            </n-form>
            <n-button type="primary" block secondary strong @click="userLogin">
              {{curLang.lang.user.login}}
            </n-button>
          </n-tab-pane>
          <n-tab-pane name="signUp" :tab="curLang.lang.user.register">
            <n-form :model="formData">
              <n-form-item-row :label="curLang.lang.user.username">
                <n-input v-model:value="formData.name" :placeholder="curLang.lang.plsInput"/>
              </n-form-item-row>
              <n-form-item-row :label="curLang.lang.user.password">
                <n-input
                    show-password-on="click"
                    v-model:value="formData.pwd"
                    type="password"
                    :placeholder="curLang.lang.plsInput"
                />
              </n-form-item-row>
              <n-form-item-row :label="curLang.lang.user.againPassword">
                <n-input
                    show-password-on="click"
                    v-model:value="formData.checkPwd"
                    type="password"
                    :placeholder="curLang.lang.plsInput"
                />
              </n-form-item-row>

              <n-form-item-row :label="curLang.lang.user.address">
                <n-input v-model:value="formData.address" :placeholder="curLang.lang.plsInput"/>
              </n-form-item-row>

              <n-form-item-row :label="curLang.lang.user.code">
                <n-input v-model:value="formData.code" :placeholder="curLang.lang.plsInput"/>
                <n-button strong style="width: 70px;margin-left: 3px" v-if="sendCodeTime<=0" @click="sendCode" >
                  {{curLang.lang.user.sendCodeBtn }}
                </n-button>

                <n-button strong style="width: 70px;margin-left: 3px" disabled v-else >
                  {{ sendCodeTime }}
                </n-button>
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block secondary strong @click="userRegister">
              {{curLang.lang.user.register}}
            </n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script>
import {NCard, NTabs, NTabPane, NFormItemRow, NInput, NButton, NForm, NCheckbox, useThemeVars} from "naive-ui";
import login from "@/api/login";
import {computed, ref} from "vue";

import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";
const _adapters = [hamster, alist];
import curLang from "@/common/lang";



function isPhoneNumber(phoneNumber) { // 验证手机号
  const phoneRegex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return phoneRegex.test(phoneNumber);
}

export default {
  name: 'mainLogin',
  methods: {
    userLogin() {
      const loginOption = 0
      const that = this
      login.login(this.formData.name, this.formData.pwd,this.formData.lasting, loginOption)
          .then(function (response) {
            if (that.adapters[loginOption].judgeLoginCode(response.code)) {
              that.adapters[loginOption].setLoginDate(that.formData.name, response)
              that.$router.push("/")
            }
          })
    },
    userRegister() {
      const loginOption = 0
      const that = this
      login.register(this.formData.name, this.formData.pwd,this.formData.address,this.formData.code, loginOption)
          .then(function (response) {
            if (that.adapters[loginOption].judgeLoginCode(response.code)) {
              that.adapters[loginOption].setLoginDate(that.formData.name, response)
              that.$router.push("/")
            }
          })
    },
    sendCode() {
      const loginOption = 0
      const waitTime = 60
      const that = this

      if(!isPhoneNumber(this.formData.address)){
        window.$message.error("请填写正确的手机号");
        return;
      }else if (this.sendCodeTime !==0){
        window.$message.error("处于冷却时间");
        return;
      }

      if(this.waiting){
        window.$message.error("正在处理请稍后");
        return;
      }else{
        this.waiting = true
      }

      let timerHandle = 0;

      function timer(){
        that.sendCodeTime--;
        if(that.sendCodeTime<=0){
          that.sendCodeTime = 0;
          clearInterval(timerHandle);
        }
      }

      login.sendCode(this.formData.address, loginOption).then(()=>{
        that.sendCodeTime = waitTime;
        timerHandle = setInterval(timer, 1000);
        that.waiting = false
      }).catch(err=>{
        that.waiting = false
      })

    }
  },
  components: {
    NCard, NTabs, NTabPane, NFormItemRow, NInput, NButton, NForm, NCheckbox
  },
  setup() {
    // 初始化登录变量
    let loginData = ref({
      name: "",
      pwd: "",
      checkPwd: "",
      code:"",
      address:"",
      lasting:false
    })

    let theme = useThemeVars();
    return {
      boxShadow : computed(() => theme.value.boxShadow3),
      formData: loginData,
      adapters: _adapters,
      curLang,
      waiting:ref(false),
      sendCodeTime:ref(0)
    }
  }
}
</script>

<style scoped>
.mainLogin {
  width: 100%;
  height: calc(100vh - 65px);
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
}

.loginPanel {
  text-align: left;
  width: 500px;
  box-shadow: v-bind(boxShadow);
  margin-top: -60px;
}

/* 细微调整，防止太小遮挡 input 选中特效 */
.card-tabs {
  padding-left: 4px;
}
</style>
