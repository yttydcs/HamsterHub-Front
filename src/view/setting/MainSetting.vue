<template>
  <div class="settingParent">

    <div class="settingBox" v-for="(group,index) in optionList" :key="index">
      <n-list hoverable bordered>
        <template #header>
          <n-thing :title="group.title" />
        </template>

        <n-list-item v-for="(item,itemIndex) in group.list" :key="itemIndex">
          <n-thing :title="item.title" :description="item.description" />
          <template #suffix>
            <n-switch :round="false" v-if="item.valueType === 'boolean' " />

            <n-button v-if="item.type === 'group' ">
              Setting
            </n-button>

            <n-button v-if="item.valueType === 'curd' " @click="curdHandle(item.title,item.value.model,item.value.fun)">
              Setting
            </n-button>

            <n-button v-if="item.valueType === 'input' ">
              Setting
            </n-button>

          </template>
        </n-list-item>

      </n-list>
    </div>

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

<script>
import {
  NList,
  NButton,
  NListItem,
  NThing,
  NSwitch,
  NGridItem,
  NFormItemRow,
  NSelect,
  NForm,
  NModal,
  NInput
} from "naive-ui";

import curLang from "@/common/lang";
import {optionList} from "@/common/setting/option";
import device from "@/api/device";
import {reactive, ref} from "vue";
import CommonCURD from "@/components/common/CommonCURD.vue";
import {deviceConfig} from "@/common/curd/deviceConfig";


export default {
  name: 'mainSetting',
  methods: {
    curdHandle(title,model,fun){
      this.curdData.title = title
      this.curdData.model = model
      this.curdData.fun = fun
      this.curdData.show = true
    }
  },
  components: {
    CommonCURD,
    // NInput,
    NModal,

    NList, NButton, NListItem, NThing, NSwitch
  },
  mounted() {

  },

  setup() {
    return {
      optionList,
      curdData:reactive({
        title: "",
        show: ref(false),
        model: deviceConfig.model,
        fun: deviceConfig.fun
      }),
    }
  }
}
</script>

<style>

.settingParent{

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

// 优化小窗口的体验
@media only screen and (max-width: 900px){
  .CURDBox{
    width: 100%;
  }
}

// 优化小窗口的体验
@media only screen and (max-height: 500px){
  .CURDBox{
    width: 100%;
  }
}

</style>
