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
            <n-button v-if="item.type === 'group' ">Setting</n-button>
            <n-button v-if="item.valueType === 'curd' ">Setting</n-button>
            <n-button v-if="item.valueType === 'input' ">Setting</n-button>

          </template>
        </n-list-item>

      </n-list>
    </div>


  </div>

</template>

<script>
import {NList, NButton, NListItem, NThing, NSwitch, NGridItem} from "naive-ui";

import curLang from "@/common/lang";
import {optionList} from "@/common/setting/option";
import device from "@/api/device";

export default {
  name: 'mainSetting',
  methods: {
  },
  components: {
    NList, NButton, NListItem, NThing, NSwitch
  },
  mounted() {
    device.getDeviceType().then(response => {
      console.log(response)
    })

    device.query().then(response => {
      console.log(response)
    })

  },
  setup() {
    return {
      optionList
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

</style>
