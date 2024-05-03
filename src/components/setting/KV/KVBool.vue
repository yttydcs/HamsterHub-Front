<template>
  <div>
    <n-list-item>
      <n-thing :title="title" :description="description" />
      <template #suffix>
        <n-switch :round="false"
                  @update:value="handle"
                  v-model:value="data"

        />
      </template>
    </n-list-item>
  </div>


</template>

<script>
import {
  NButton,
  useThemeVars,
  NListItem,
  NList,
  NThing,
  NFormItemRow, NModal, NForm, NInput, NSwitch,
} from "naive-ui";
import {reactive, ref} from "vue";
import config from "@/service/config";

export default {
  name: 'KVBool',
  components: {
    NSwitch,
    NThing, NListItem,
  },
  props:{
    title:String,
    description:String,
    configKey:String,
    updateFunc:Function
  },
  methods:{
    async handle(value){
      let valueStr = value.toString();
      await config.set(this.configKey, valueStr);
    },
    setData(value){
      this.data = value === "true";
    }
  },
  async mounted() {
    let configObj = await config.getObj()
    this.setData(configObj[this.configKey].value)
  },

  setup() {

    return {
      data: ref(false),
    }
  }
}
</script>

<style scoped>



</style>
