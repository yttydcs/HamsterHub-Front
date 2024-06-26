<template>
  <div>
    <n-list-item>
      <n-thing :title="title" :description="description" />
      <template #suffix>
        <n-switch
            :round="false"
            :loading="loading"
            @update:value="handle"
            v-model:value="data"

        />
      </template>
    </n-list-item>
  </div>


</template>

<script setup>
import {
  NListItem,
  NThing, NSwitch,
} from "naive-ui";
import {onMounted, reactive, ref} from "vue";
import config from "@/service/config";
const props = defineProps({
  title:String,
  description:String,
  configKey:String,
  updateFunc:Function
})

const data = ref(false);
const loading = ref(false);

async function handle(value){
  let valueStr = value.toString();
  loading.value = true
  try {
    await config.set(props.configKey, valueStr);
  }catch (e) {

  }
  loading.value = false
}
function setData(value){
  data.value = value === "true";
}

onMounted(async ()=>{
  let configObj = await config.getObj()
  setData(configObj[props.configKey].value)
})

</script>

<style scoped>



</style>
