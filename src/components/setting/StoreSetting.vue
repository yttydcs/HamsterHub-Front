<template>
  <div class="settingBox">
    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.storeSetting.title" />
      </template>
      <n-list-item >
        <n-thing
            :title="curLang.lang.storeSetting.device.title"
            :description="curLang.lang.storeSetting.device.description"
        />
        <template #suffix>
          <n-button  @click="curdHandle(curLang.lang.storeSetting.device.title,deviceConfig.model,deviceConfig.fun)">
            {{ curLang.lang.settingBtn }}
          </n-button>
        </template>
      </n-list-item>
      <n-list-item >
        <n-thing
            :title="curLang.lang.storeSetting.strategy.title"
            :description="curLang.lang.storeSetting.strategy.description"
        />
        <template #suffix>
          <n-button  @click="curdHandle(curLang.lang.storeSetting.strategy.title,strategyConfig.model,strategyConfig.fun)">
            {{ curLang.lang.settingBtn }}
          </n-button>
        </template>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import {NButton, NListItem, NList, NThing,} from "naive-ui";
import curLang from "../../common/lang";
import {deviceConfig} from "@/common/curd/option/deviceConfig";
import {strategyConfig} from "@/common/curd/option/strategyConfig";
defineProps({curdHandle:Function})
</script>

<style scoped>

</style>
