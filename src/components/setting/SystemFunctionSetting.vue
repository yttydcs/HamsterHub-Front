<template>
  <div class="settingBox">
    <n-list hoverable bordered>
      <template #header>
        <n-thing :title="curLang.lang.systemFunctionSetting.title" />
      </template>
      <KVBool
          :title="curLang.lang.systemFunctionSetting.proxyBilibiliDanma.title"
          :description="curLang.lang.systemFunctionSetting.proxyBilibiliDanma.description"
          configKey="proxy.bilibili.danma"
      />

    </n-list>
  </div>
</template>

<script setup>
import { NList, NThing, } from "naive-ui";
import curLang from "../../common/lang";
import KVBool from "@/components/setting/KV/KVBool.vue";
</script>

<style scoped>

.settingBox{
  max-width: 900px;
  margin: 10px auto;
  text-align: left;
}

</style>
