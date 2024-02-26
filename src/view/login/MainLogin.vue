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
          <n-tab-pane name="signIn" tab="登录">
            <n-form :model="formData">
              <n-form-item-row label="用户名">
                <n-input v-model:value="formData.name"/>
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input v-model:value="formData.pwd"/>
              </n-form-item-row>
              <n-checkbox v-model:checked="formData.lasting" style="margin-bottom: 10px">
                保留登录状态
              </n-checkbox>
              <br>
            </n-form>
            <n-button type="primary" block secondary strong @click="userLogin">
              登录
            </n-button>
          </n-tab-pane>
          <n-tab-pane name="signUp" tab="注册">
            <n-form :model="formData">
              <n-form-item-row label="用户名">
                <n-input v-model:value="formData.name"/>
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input v-model:value="formData.pwd"/>
              </n-form-item-row>
              <n-form-item-row label="重复密码">
                <n-input v-model:value="formData.checkPwd"/>
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block secondary strong @click="userRegister">
              注册
            </n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script>
import {NCard, NTabs, NTabPane, NFormItemRow, NInput, NButton, NForm, NCheckbox} from "naive-ui";
import login from "@/api/login";
import {ref} from "vue";

import hamster from "@/common/adapter/hamster";
import alist from "@/common/adapter/alist";
const _adapters = [hamster, alist];

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
      console.log("userRegister")
      const loginOption = 0
      const that = this
      login.register(this.formData.name, this.formData.pwd, loginOption)
          .then(function (response) {
            if (that.adapters[loginOption].judgeLoginCode(response.code)) {
              that.adapters[loginOption].setLoginDate(that.formData.name, response)
              that.$router.push("/")
            }
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
      lasting:false
    })


    return {
      formData: loginData,
      adapters: _adapters
    }
  }
}
</script>

<style>
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
  height: 400px;

  /* 居中
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);*/
}

/* 细微调整，防止太小遮挡 input 选中特效 */
.card-tabs {
  padding-left: 4px;
}
</style>
