<template>
  <div class="settingParent">

    <localSetting />

    <UserManageSetting :curd-handle="curdHandle" v-if="hasPermission('0')"/>

    <SystemFunctionSetting />

    <StoreSetting :curd-handle="curdHandle" v-if="hasPermission('0')"/>

    <UserSetting v-if="loginData.loginState"/>

    <!--    todo: use route    -->
    <n-modal
        v-model:show="curdData.show"
        class="CURDBox"
        preset="card"
        :title="curdData.title"
        size="medium"
        :bordered="false"
    >
      <CommonCURD :form-model="curdData.model" :form-fun="curdData.fun"></CommonCURD>
    </n-modal>
  </div>

</template>

<script setup>
import { NModal } from "naive-ui";
import {reactive, ref, watch} from "vue";
import CommonCURD from "@/components/common/curd/CommonCURD.vue";
import {deviceConfig} from "@/common/curd/option/deviceConfig";
import UserSetting from "@/components/setting/UserSetting.vue";
import UserManageSetting from "@/components/setting/UserManageSetting.vue";
import StoreSetting from "@/components/setting/StoreSetting.vue";
import localSetting from "@/components/setting/LocalSetting.vue";
import SystemFunctionSetting from "@/components/setting/SystemFunctionSetting.vue";
import loginData, {hasPermission} from "@/common/loginData";

const curdData = reactive({
  title: "",
  show: false,
  model: deviceConfig.model,
  fun: deviceConfig.fun
});

function curdHandle(title,model,fun){
  curdData.title = title
  curdData.model = model
  curdData.fun = fun
  curdData.show = true
}

</script>

<style>

.settingParent{
  padding: 0 10px;
}

.settingBox{
  max-width: 900px;
  margin: 10px auto;
  text-align: left;
}

.CURDBox{
  width: 900px;
  height: 500px;
}

@media only screen and (max-width: 900px){
  .CURDBox{
    width: 100%;
  }
}

@media only screen and (max-height: 500px){
  .CURDBox{
    width: 100%;
  }
}

</style>
