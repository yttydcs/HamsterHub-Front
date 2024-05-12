<template>
  <div class="settingParent">

    <div class="settingBox" v-for="(group,index) in optionList" :key="index">
      <n-list hoverable bordered>
        <template #header>
          <n-thing :title="group.text.title" />
        </template>

        <n-list-item v-for="(item,itemIndex) in group.list" :key="itemIndex">
          <n-thing :title="item.text.title" :description="item.text.description" />
          <template #suffix>
            <n-switch :round="false"
                      v-if="item.valueType === 'boolean'"
                      @update:value="item.handle"
                      v-model:value="item.data"

            />
            <!--                      -->
            <n-button v-if="item.type === 'group' ">
              {{ curLang.lang.settingBtn }}
            </n-button>

            <n-button v-if="item.valueType === 'curd' " @click="curdHandle(item.text.title,item.value.model,item.value.fun)">
              {{ curLang.lang.settingBtn }}
            </n-button>

            <n-button v-if="item.valueType === 'input' ">
              {{ curLang.lang.settingBtn }}
            </n-button>

          </template>
        </n-list-item>

      </n-list>
    </div>

    <UserManageSetting />

    <StoreSetting :curd-handle="curdHandle" />

    <UserSetting />

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
  NModal,
  NInput
} from "naive-ui";

import curLang from "@/common/lang";
import {optionList} from "@/common/setting/option";
import device from "@/api/device";
import {reactive, ref, watch} from "vue";
import CommonCURD from "@/components/common/curd/CommonCURD.vue";
import {deviceConfig} from "@/common/curd/option/deviceConfig";
import UserSetting from "@/components/setting/UserSetting.vue";
import UserManageSetting from "@/components/setting/UserManageSetting.vue";
import StoreSetting from "@/components/setting/StoreSetting.vue";

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
    UserSetting,
    UserManageSetting,
    StoreSetting,
    NList, NButton, NListItem, NThing, NSwitch
  },
  mounted() {

  },


  setup() {
    return {
      curLang,
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
