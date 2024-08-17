<template>
  <div>
    <n-list-item>
      <n-thing :title="title" :description="description" />
      <template #suffix>
        <n-button @click="handleEdit">
          {{ curLang.lang.settingBtn }}
        </n-button>
      </template>
    </n-list-item>

    <n-modal
        v-model:show="settingBoxShow"
        class="alertBox"
        preset="card"
        :title="curLang.lang.editBox"
        size="medium"
        :bordered="false"
    >
      <n-input v-model:value="data" :placeholder="curLang.lang.plsInput"/>
      <n-space align="stretch" justify="end" style="margin-top: 10px">
        <n-button class="sendBtn" type="primary" block secondary strong @click="confirmEdit" :loading="loading" >
          {{ curLang.lang.curd.submitBtn }}
        </n-button>
        <n-button class="sendBtn" type="primary" block secondary strong @click="settingBoxShow = false">
          {{ curLang.lang.curd.cancelBtn }}
        </n-button>
      </n-space>
    </n-modal>

  </div>
</template>

<script setup>
import {
  NListItem, NModal,
  NThing, NButton, NInput, NSpace
} from "naive-ui";
import { ref } from "vue";
import curLang from "@/common/lang";
import config from "@/service/config";
const props = defineProps({
  title:String,
  description:String,
  configKey:String,
  updateFunc:Function,
  isAdmin:Boolean,// 如果是admin则使用admin的获取方法
})

const data = ref("");
const loading = ref(false);
const settingBoxShow = ref(false);

async function handleEdit(){
  settingBoxShow.value = true;
  await getData();
}

async function confirmEdit(){
  let valueStr = data.value;
  loading.value = true;
  try {
    await config.set(props.configKey, valueStr);
  }catch (e) {

  }
  loading.value = false;
  settingBoxShow.value = false
}

function setData(value){
  data.value = value;
}

async function getData(){
  if(props.isAdmin){
    let configObj = await config.get(props.configKey);
    setData(configObj.value)
  }else{
    let configObj = await config.getObj()
    setData(configObj[props.configKey].value)
  }
}

</script>

<style scoped>


</style>
