<template>
  <div class="input-Box">

    <n-form :model="tempData" v-for="(item,index) in template" :key="index">
      <n-form-item-row :label="item.text.title" :path="item.key" >
        <n-input v-model:value="tempData[item.key]" :placeholder="curLang.lang.plsInput"/>
      </n-form-item-row>
    </n-form>

    <n-space align="stretch" justify="end">
      <n-button class="sendBtn" type="primary" block secondary strong @click="modify" >
        {{ curLang.lang.curd.submitBtn }}
      </n-button>
      <n-button class="sendBtn" type="primary" block secondary strong @click="cancel">
        {{ curLang.lang.curd.cancelBtn }}
      </n-button>
    </n-space>

  </div>
</template>

<script setup>
import { reactive, onMounted} from "vue";
import {NButton, NSpace, NInput, NForm, NFormItemRow,} from "naive-ui";
import curLang from "@/common/lang";

const props = defineProps({
  template:Object,
  oldValue:String,
  modifyHandle: Function,
  cancelHandle: Function,
})
const tempData = reactive({});

function modify(){
  props.modifyHandle(tempData);
  tempData.value={};
}

function cancel(){
  props.cancelHandle();
  tempData.value={};
}

function setOldValue(data){
  try {
    let temp = JSON.parse(data)
    for (let key in temp){
      tempData[key] = temp[key];
    }
  }catch(err){
    tempData.value = {};
  }
}

onMounted(()=>{
  setOldValue(props.oldValue)
})
</script>


<style>



</style>

