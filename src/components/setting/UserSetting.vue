<template>
  <div class="userSettingBox settingBox">

    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.userSetting.title" />
      </template>

      <n-list-item>
        <input type="file" style="display:none" ref="uploadInput" accept="image/*" @change="handleFileUpload"/>
        <n-thing :title="curLang.lang.userSetting.avatarTitle" :description="curLang.lang.userSetting.avatarDes" />
        <template #suffix>

          <n-avatar
              round
              :size="36"
              :src="loginData.user.avatarSrc"
              :bordered="true"
              @click="changeAvatar"
          />

        </template>
      </n-list-item>

      <n-list-item>
        <n-thing :title="curLang.lang.userSetting.pwdTitle" :description="curLang.lang.userSetting.pwdDes" />
        <template #suffix>

          <n-button @click="()=>{changePwdShow = true}">
            {{ curLang.lang.userSetting.pwdBtn }}
          </n-button>

        </template>
      </n-list-item>

      <n-list-item>
        <n-button class="logoutBtn" strong secondary type="error" @click="logout">
          {{ curLang.lang.userSetting.logout }}
        </n-button>
      </n-list-item>

    </n-list>
    <!--  修改密码  -->
    <n-modal
        v-model:show="changePwdShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.changePwdBox.title"
        size="medium"
    >
      <n-form :model="formData">
        <n-form-item-row :label="curLang.lang.changePwdBox.oldPwd">
          <n-input v-model:value="formData.oldPwd" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>
        <n-form-item-row :label="curLang.lang.changePwdBox.newPwd">
          <n-input v-model:value="formData.newPwd" :placeholder="curLang.lang.plsInput"/>
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong @click="confirmChangePwd">
        {{ curLang.lang.changePwdBox.submit }}
      </n-button>
    </n-modal>
  </div>


</template>

<script setup>
import {NButton, NListItem, NList, NThing, NAvatar, NFormItemRow, NModal, NForm, NInput,} from "naive-ui";
import { reactive, ref } from "vue";
import loginData, {removeLoginData} from "@/common/loginData";
import login from "@/api/login";
import curLang from "../../common/lang";

const changePwdShow = ref(false);
const formData = reactive({newPwd:"",oldPwd:""});
const uploadInput = ref(null);

function changeAvatar(){
  uploadInput.value.click()
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  login.changeUserAvatar(file).then(res=>{
    window.$message.success("上传成功，刷新后生效");
  })
}

async function confirmChangePwd(){
  let res = await login.changePwd(formData.oldPwd,formData.newPwd)
  if(res.code === 0){
    removeLoginData();
    changePwdShow.value = false;
  }
}

function logout(){
  login.logout()
}
</script>

<style scoped>
.logoutBtn{
  width: 100%;
  height: 40px;
}


</style>
